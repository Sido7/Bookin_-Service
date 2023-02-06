const amqp  = require('amqplib')
const {Exchange_Name,Message_Broker_Url,Binding_Key} = require('../config/serverConfig')

async function createChannel(){
    try{
        const connection  = await amqp.connect(Message_Broker_Url)
        const channel = await connection.createChannel()
        await channel.assertExchange(Exchange_Name,'direct',false)
        return channel
    }catch(error){
        console.log(error)
        throw error
    }
}

async function subscribeMessages(channel,service,binding_key){
    try{
        const applicationQueue =  await channel.assertQueue('Queue_Name')
    await channel.bindQueue(applicationQueue.queue,Exchange_Name,binding_key)
    await channel.consume(applicationQueue.queue,(msg)=>{
        console.log("recieved message")
        console.log(msg.content.toString())
        channel.ack(msg)
    })
    }catch(error){
        throw error
    }

}

async function publishMessages(channel,binding_key,message){
    try{
        await channel.assertQueue('Queue_Name')
        await channel.publish(Exchange_Name,binding_key,Buffer.from(message))
    }catch(error){
        throw error
    }
}

module.exports = {
    createChannel,
    subscribeMessages,
    publishMessages
}