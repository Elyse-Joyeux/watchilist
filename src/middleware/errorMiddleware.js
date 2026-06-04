import mongoose from 'mongoose'

export const notFound = (req, res, next) =>{
    const error = new Error(`Route ${req.originalUrl} not found`)
    error.statusCode = 404
    next(error)
}

/*
* global error handler middleware
*handles all errors in the application and send appropriate
* provides detailed error information in develpment
*/
export const errorHandler = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"

    // handle mongodb validation errors
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((value) => value.message)
        err.statusCode = 400
        err.message = messages.join(', ')
    }

    // handle mongodb unique constraint violations
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0]
        err.statusCode = 400
        err.message = `Duplicate value for ${field}. Please use another ${field}.`
    }

    // handle record not found
    if (err.code === 'P2025') {
        err.statusCode = 404
        err.message = 'Record not found'
    }

    // handle mongodb foreign key constraint violations
    if (err.code === 'P2003') {
        err.statusCode = 400
        err.message = 'Referenced record does not exist'
    }

    // handle mongodb unique constraint violations
    if (err.code === 'P2002') {
        err.statusCode = 409
        err.message = 'A record with this value already exists'
    }

    // send error response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    })

}