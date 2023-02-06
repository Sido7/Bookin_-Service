const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    Port: process.env.PORT,
    DB_SYNC: process.env.DB_SYNC,
    HOST: process.env.HOST,
    Message_Broker_Url: process.env.Message_Broker_Url,
    Exchange_Name: process.env.Exchange_Name,
    Binding_Key: process.env.Binding_Key
}