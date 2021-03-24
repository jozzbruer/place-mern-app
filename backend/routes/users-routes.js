const express = require('express')
const router = express.Router()

const usersCtrl = require('../controllers/users-controller')

router.get('/:uid', usersCtrl.oneUser)

module.exports = router