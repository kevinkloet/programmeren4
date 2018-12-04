const router = require('express').Router()
const gameController = require('../controllers/game.controller')
const userController = require('../controllers/user.controller')


router.get('/games', gameController.getAll)
router.get('/games/:gameId', gameController.getById)
router.post('/games', gameController.addNewGame)

router.post('/register', userController.createUser)
router.post('/login', userController.authenticateUser)

module.exports = router