const globalErrorHandler = (err, _req, res, _next) => {

    res.status(err.status || 500).send({
        messsage: err.message,
        errors: err.errors,
    })
}

module.exports = globalErrorHandler;