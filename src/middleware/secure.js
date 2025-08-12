const { decode } = require('../utils/jwt')

function checkRoles(...rolesPermitidos) {
  return (req, res, next) => {
    try {
      if (req.headers.authorization) {
        const data = decode(req.headers.authorization);

        if (rolesPermitidos.includes(data.rol_id)) {
          req.user = data;
          return next();
        }
      }
      const error = new Error("Privilegios insuficientes");
      error.status = 401;
      throw error;
    } catch (err) {
      next(err);
    }
  };
}

module.exports = checkRoles