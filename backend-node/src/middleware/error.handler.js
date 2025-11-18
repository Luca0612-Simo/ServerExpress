function errorHandler(err, req, res, next) {
    if (err.status) {
        res.status(err.status).json({
            mensaje: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    } else {
        res.status(500).json({
            mensaje: 'Error interno del servidor. Contacte al administrador.',
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
    }
}

module.exports = errorHandler;