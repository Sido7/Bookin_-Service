const express = require('express')
const controller = require('../../controllers/booking-controllers')

const router = express.Router()

router.use('/booking',controller.createBooking)

module.exports = router