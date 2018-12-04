const User = require('../models/user.model');
const ApiError = require('../models/apierror.model');
const pool = require('../config/db');

module.exports = {
    createUser(req, res, next) {
        //create an user in the database
        const username = req.body.username;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname =  req.body.lastname;

        const query = 'INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`) VALUES (?, ?, ?, ?);';

        pool.query(query, [firstname, lastname, username, password], (err, results) => {
            res.status(200).json({message: "user added", result: results}).end();
        })

    },

    authenticateUser(req, res, next) {
        //check credentials for existing user
        const username = req.body.username;
        const password = req.body.password;

        const query = 'SELECT `ID`, `firstname`, `lastname` FROM users WHERE `email` = ? AND password = ?;';

        pool.query(query, [username, password], (err, results) => {
            if(err) {
                next(new ApiError(err.sqlMessage, 401));
            }

            res.status(200).json({login: "success", user: results}).end();
        });
    },

    updateUser(req, res, next) {
        //update the user
    },

    deleteUser(req, res, next) {
        //delete the user
    }
}