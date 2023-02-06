const express = require('express')
const BookingController = require('../../controllers/booking-controllers')

const bookingController = new BookingController()

const router = express.Router()

router.post('/booking',bookingController.createBooking)

router.post('/publish',bookingController.publish)

module.exports = router