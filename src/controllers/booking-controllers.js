const {StatusCodes} = require('http-status-codes')
const {BookingService} = require('../service/index')
const {createChannel,publishMessages} = require('../utils/messageQueue')
const {Binding_Key} = require('../config/serverConfig')

const bookingService = new BookingService()

class BookingController{

    async publish(req,res) {
        const channel = await createChannel()
        const payload = {
            data:{
                subject: "This is just to check queue",
                content: "Rabbit MQ message Queue is working or not",
                recepientEmail: "siddharth1850@gmail.com",
                notificationTime: "2023-02-07 19:12:00"
            },service:"Create_Ticket"}
        await  publishMessages(channel,Binding_Key,JSON.stringify(payload))
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
