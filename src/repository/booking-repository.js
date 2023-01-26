const {Booking} = require('../models/index')
const {StatusCodes} = require('http-status-codes')
const {AppError,ValidationError} = require('../utils/index')


class BookingRepository{
    async create(data){
        try{
            const booking  = await Booking.create(data);
            return data
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