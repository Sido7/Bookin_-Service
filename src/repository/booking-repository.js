const {Booking} = require('../models/index')
const {StatusCodes} = require('http-status-codes')
const {AppError,ValidationError} = require('../utils/index')


class BookingRepository{
    async create(data){
        try{
            const bookingData  = await Booking.create(data)
            return bookingData
        }catch(error){
            if(error.name = "SequelizeValidationError"){
                throw new ValidationError(error)
            }
            throw new AppError("RepositoryError",
            "Can not Create Booking",
            "There is some issue while creating the booking,pls try later",
            StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }

    async update(flightId){
        try{

            const booking = await Booking.findByPk(flightId)
            booking.status = 'Booked'
            booking.save()
            return booking
        }catch(error){
            if(error.name = "SequelizeValidationError"){
                throw new ValidationError(error)
            }
            throw new AppError("RepositoryError",
            "Can not Create Booking",
            "There is some issue while creating the booking,pls try later",
            StatusCodes.INTERNAL_SERVER_ERROR)
        }
    }
}

module.exports = BookingRepository