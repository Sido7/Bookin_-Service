const {StatusCodes} = require('http-status-codes')
const {BookingRepository} = require('../repository/index')
const {AppError,ServiceError,ValidationError} = require('../utils/index')
const axios = require('axios')
const { HOST } = require('../config/serverConfig')

const api = "/api/v1/flights/"
const urp = `${HOST}${api}`


class BookingService{
    constructor(){
        this.BookingRepository = new BookingRepository()
    }

    async createBooking(data){
        try{
            console.log("service hit",data)
            const url = `${HOST}${api}${data.flightId}`
            const flightData = await axios.get(url)
            const flightInfo = flightData.data.data 
            if(flightInfo.totalSeats < data.noOfSeats){
                throw new ServiceError()
            }
            const totalCost = data.noOfSeats*flightInfo.price
             data = {...data,totalCost:totalCost}
            const response = await this.BookingRepository.create(data)
            const totalSeats = flightInfo.totalSeats - data.noOfSeats
            const updatedFlightInfo = await axios.patch(url,{totalSeats:totalSeats})
            const finalresponse = this.BookingRepository.update(response.id)
            return finalresponse
        }catch(error){
            console.log(error)
            if(error.name == "SequelizeValidationError")
            {
                throw error
            }
            throw new ServiceError()
        }
    }
}

module.exports = BookingService
// flightId,   //get from req
// userId,     // get from req
// noOfSeats,  // get from req
// totalCost   // get price from call to flight service and multiply it with no of seats provided in req