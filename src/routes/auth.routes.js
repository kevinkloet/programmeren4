const router = require('express').Router();
const AuthController = require('../controllers/authentication.controller');

router.post('/register', AuthController.createUser)
router.post('/login', AuthController.authenticateUser)

module.exports = router;