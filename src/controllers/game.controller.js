const Game = require('../models/game.model')
const ApiError = require('../models/apierror.model')
const pool = require('../config/db')

let games = [
	new Game('Battlefield 5', 'EA', 2018, 'FPS')
]

// Voorbeeld werken met arrays
games.forEach((item) => {
	// doe iets met item
})

module.exports = {

	getAll(req, res, next) {
		console.log('gameController.get called')
        pool.query("SELECT * FROM games", function(err, rows, fields) {
        	if(err) {
        		console.log(err);
        		return next(new ApiError(err, 500));
			}

            res.status(200).json({result: rows}).end()
        })

	},

	getById(req, res, next) {
		const id = req.params.gameId
		console.log('id = ' + id)

		const query = 'SELECT * FROM games WHERE ID = ?';

		pool.query(query, [id], function(err, rows, fields) {
			if(err) {
                console.log(err);
                return next(new ApiError(err, 500));
			}

			if(rows.size == []) {
				return next(new ApiError("no results found", 404))
			}

            res.status(200).json({result: rows}).end()
		});
	},

	addNewGame(req, res) {
		console.log('gameController.addNewGame called')
		console.dir(req.body)

		const query = 'INSERT INTO games (title, producer, year, type) VALUES (?, ?, ?, ?)';

		pool.query(query, [req.body.name, req.body.producer, req.body.year, req.body.type], function(err, rows, fields) {
			if(err) {
                return next(new ApiError(err, 500));
			}

            res.status(200).json({
                message: req.body.name + ' succesvol toegevoegd'
            }).end()
		});


	}

}