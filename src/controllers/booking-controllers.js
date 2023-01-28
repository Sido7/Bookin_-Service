const {StatusCodes} = require('http-status-codes')
const {BookingService} = require('../service/index')

const bookingService = new BookingService()

const createBooking = async (req,res)=>{
    try{
        console.log("controller hit",req.body)
        const booking = await bookingService.createBooking(req.body)
        return res.status(200).json({
            data:booking,
            message: "successfully created the booking",
            error: {}
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            data:{},
            err: "something going wrong",
            message: "kk"
        })
    }

}

module.exports = {
    createBooking
}