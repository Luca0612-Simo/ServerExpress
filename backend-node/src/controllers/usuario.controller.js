const UsuarioService = require('../services/usuario.service')
const service = new UsuarioService()

async function login(req,res,next){
    try{
        const data = req.body
        console.log('Datos recibidos en el login:', data);
        const result = await service.login(data)
        res.send({mensaje: 'Login exitoso', result})
    }catch(error){
        next(error)
    }

}

async function crearUsuario(req,res,next) {
    try{
        const data = req.body
        const result = await service.crearUsuario(data)
        res.send({mensaje: 'El usuario fue creado correctamente', result})
    }catch(error){
        next(error)
    }
}

async function validateToken(req, res, next) {
    try {
        res.send({ user: req.user, mensaje: 'Token válido' });
    } catch (error) {
        next(error);
    }
}

async function GetPersonal(req, res, next) {
    try {
        const result = await service.GetPersonal()
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function EliminarUsuario(req, res, next) {
    try {
        const id = req.params.id
        const usuario_baja = req.user.usuario
        const result = await service.EliminarUsuario(id, usuario_baja)

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.send({ mensaje: 'Usuario dado de baja correctamente', result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    crearUsuario,
    validateToken,
    GetPersonal,
    EliminarUsuario,
}