const {StatusCodes} = require('http-status-codes')
const {BookingService} = require('../service/index')
const {createChannel,publishMessages} = require('../utils/messageQueue')
const {Binding_Key} = require('../config/serverConfig')

const bookingService = new BookingService()

class BookingController{

    async publish(req,res) {
        const channel = await createChannel()
        const data = {message:"Success"}
        await  publishMessages(channel,Binding_Key,JSON.stringify(data))
        return res.status(200).json({success:true})
    }

    async createBooking(req,res){
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
}

module.exports = BookingController
