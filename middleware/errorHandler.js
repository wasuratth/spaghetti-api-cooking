module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success : false, 
        error: {
            code: statusCode,
            message: err.message,
            validation: err.validation
        }
    });
}