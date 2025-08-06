function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function obmErrorHandler(err, req, res, next) {
    // Mongoose: ID inválido
    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'ID inválido',
            message: err.message
        });
    }

    // Mongoose: Validación fallida
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));

        return res.status(400).json({
            error: 'Error de validación',
            details: errors
        });
    }

    next(err);
}


function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

module.exports = {
    logErrors,
    boomErrorHandler,
    obmErrorHandler,
    errorHandler
}
