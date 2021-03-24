const express = require('express')
const router = express.Router()

const placesCtrl = require('../controllers/places-controller')

router.get('/:pid', placesCtrl.getPlaceById)
router.get('/users/:uid', placesCtrl.getPlaceByUserId)
router.post('/', placesCtrl.createPlace)

module.exports = router