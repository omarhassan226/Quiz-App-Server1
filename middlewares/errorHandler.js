// middlewares/errorHandler.js
const AppError = require('../error/error'); 

const errorHandler = (err, req, res, next) => {

    if (err instanceof AppError) {
        // Handle AppError and send custom error response
        return res.status(err.statusCode).json({
            status: 'error',
            error: err.message,
        });
    }

    res.status(500).json({
        status: 'error',
        error: 'An unexpected error occurred',
    });
};

module.exports = errorHandler;
