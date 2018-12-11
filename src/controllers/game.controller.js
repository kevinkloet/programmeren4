const Game = require('../models/game.model')
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')
const Auth = require('../util/auth/authentication')

module.exports = {

	getAll(req, res, next) {
		const query = 'SELECT g.ID, g.title, p.name as producer, g.year, g.LaatstGewijzigdOp, u.firstname as creatorName, u.lastname as creatorLastname ' +
			'FROM games g LEFT JOIN producer p ON g.producer = p.ID LEFT JOIN users u ON g.userid = u.ID;';
        pool.query(query, function(err, rows, fields) {
        	if(err) {
        		return next(new ApiError(err, 500));
			}

            res.status(200).json({result: rows}).end()
        })

	},

	getById(req, res, next) {
		const id = req.params.gameId

		const query = 'SELECT g.ID, g.title, p.name as producer, g.year, g.LaatstGewijzigdOp, u.firstname as creatorName, u.lastname as creatorLastname ' +
			'FROM games g LEFT JOIN producer p ON g.producer = p.ID LEFT JOIN users u ON g.userid = u.ID WHERE g.ID = ?;';

		pool.query(query, [id], function(err, rows, fields) {
			if(err) {
                return next(new ApiError(err, 500));
			}

            res.status(200).json({result: rows}).end()
		});
	},

	addNewGame(req, res, next) {
		//console.dir(req.body)

		const query = 'INSERT INTO games (title, producer, year, type, userid) VALUES (?, ?, ?, ?, ?);';
		const token = req.header('x-access-token');
		let userid = -1;
		Auth.decodeToken(token, (err, decoded) => {
			if(err) {
				return next(new ApiError(err, 500));
			}

			console.dir(decoded.sub);
			userid = decoded.sub;
		});

		pool.query(query, [req.body.name, req.body.producer, req.body.year, req.body.type, userid], function(err, rows, fields) {
			if(err) {
                return next(new ApiError(err, 500));
			}

            res.status(200).json({
                message: req.body.name + ' succesvol toegevoegd'
            }).end()
		});


	}

}