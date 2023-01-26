const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error{
    constructor(error){
        var explanation = []
        error.errors.forEach(err => {
            explanation.push(err.message)
        });

        super()
        this.name = "Validation Error",
        this.message = "not able to validate data sent in the request"
        this.explanation = explanation,
        this.statuscode = StatusCodes.BAD_REQUEST

    }
}

module.exports = ValidationError