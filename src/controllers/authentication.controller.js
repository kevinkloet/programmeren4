const auth = require('../util/auth/authentication');
const ApiError = require('../models/apierror.model');
const User = require('../models/user.model');
const pool = require('../config/db');

module.exports = {
    createUser(req, res, next) {
        try {
        //create an user in the database
        const username = req.body.email;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname =  req.body.lastname;

        const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?);';

        pool.query(query, [firstname, lastname, username, password], (err, results) => {
            if(err) {
                return next(new ApiError(err.sqlMessage, 401));
            }

            const query = 'SELECT `ID` FROM users WHERE `email` = ? AND password = ?;';

            pool.query(query, [username, password], (err, rows, fields) => {
                if(err) {
                    return next(new ApiError(err.sqlMessage, 401));
                }

                if(rows.length === 1 && password === rows[0].password) {
                    const token = auth.encodeToken(rows[0].ID);

                    console.dir(token);

                    res.status(200).json({
                        message: "user added",
                        token: token
                    }).end();
                }

            });
        }) } catch(err) {
            const error = new ApiError(err.message, 500);
            return next(err);
        }

    },

    authenticateUser(req, res, next) {
        //check credentials for existing user
        const username = req.body.email;
        const password = req.body.password;

        const query = 'SELECT `ID`, `firstname`, `lastname` FROM users WHERE `email` = ? AND password = ?;';

        pool.query(query, [username, password], (err, rows, fields) => {
            if(err) {
                return next(new ApiError(err.sqlMessage, 401));
            }

            if(rows.length === 1 && password === rows[0].password) {
                auth.encodeToken(rows[0].ID);
            }

            res.status(200).json({login: "successsful login for user " + username}).end();
        });
    },

    validateToken(req, res, next) {
        const token = req.header('x-access-token') || '';

        if(!token) {
            const error = new ApiError('Not logged in', 401);
            return next(error);
        }

        auth.decodeToken(token, (err, payload) => {
            if(err) {
                const error = new ApiError(err.message, 401)
                return next(error);
            }

            console.dir(payload);

            req.user = {
                id: payload.id
            };
            next();
        })
    }

};

