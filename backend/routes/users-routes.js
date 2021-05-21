const express = require('express')
const validator = require('express-validator')
const fileUpload = require('../middleware/file-upload')

const router = express.Router()

const usersCtrl = require('../controllers/users-controller')

router.get('/', usersCtrl.getAllUsers)
router.post(
	'/signup',
	fileUpload.single('image'),
	[
		validator.check('name').notEmpty(),
		validator.check('email').isEmail(),
		validator.check('password').isLength({ min: 6 }),
	],
	usersCtrl.signUp
)
router.post('/login', usersCtrl.login)

module.exports = router
