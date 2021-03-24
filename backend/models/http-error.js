class HttpError extends Error {
    constructor(message, errorCode){
        super(message) // Add Message property
        this.code = errorCode
    }
}

module.exports = HttpError