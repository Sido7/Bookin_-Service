const {StatusCodes} = require('http-status-codes')

class ServiceError extends Error{
    constructor(
        message = "something went wrong",
        explanation = "Service Layer Error",
        statuscode = StatusCodes.INTERNAL_SERVER_ERROR){
        super()
        this.name = "ServiceError"
        this.message = ""
        this.explanation = explanation,
        this.statuscode = statuscode
    }
}

module.exports = ServiceError