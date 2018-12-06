const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const gameRoutes = require('./src/routes/game.routes')
const ApiError = require('./src/models/apierror.model')
const authController = require('./src/controllers/authentication.controller')
const auth_routes = require('./src/routes/auth.routes')

var app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

app.use('/api', auth_routes)

app.all('*', authController.validateToken)

// reguliere routing
app.use('/api', gameRoutes)

// handler voor niet-bestaande routes
app.use('*', (req, res, next) => {
	next(new ApiError('Non-existing endpoint', 404))
})

// handler voor errors
app.use('*', (err, req, res, next) => {
	// hier heb ik de error
	//console.dir(err)
	// -> return response naar caller
	res.status(err.code || 404).json({error: err}).end()
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// for testing purpose
module.exports = app
