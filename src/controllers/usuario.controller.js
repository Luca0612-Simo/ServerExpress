const UsuarioService = require('../services/usuario.service')
const service = new UsuarioService()

async function login(req,res,next){
    try{
        const data = req.body
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

module.exports = {
    login,
    crearUsuario,
}