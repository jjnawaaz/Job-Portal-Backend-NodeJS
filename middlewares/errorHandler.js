//Errror Handler Next function
const errorHandler = (err, req, res, next) => {
    console.log(err)
    const Error = {
        statuscode: 500,
        message: err
    }

    //Missing field error 
    if (err.name === 'ValidationError') {
        Error.statuscode = 400
        Error.message = Object.values(err.errors).map(item => item.message).join(',')
    }
    // Same Email Errors
    if (err.code && err.code === 11000) {
        Error.statuscode = 400
        Error.message = `${Object.keys(err.keyValue)} field has to be unique`
    }
    res.status(Error.statuscode).json({ message: Error.message })
}

export default errorHandler;