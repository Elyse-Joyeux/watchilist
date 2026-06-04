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


    // handle mongodb unique constraint violations


    // hanndle record not found
    if(err.code === "P2025")
        err.statusCode = 404
        err.message = "Record not found"


    // handle mongodb foreign key constraint violations



    // send error response
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
    })

}