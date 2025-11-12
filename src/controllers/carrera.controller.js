const CarreraService = require('../services/carrera.service')
const service = new CarreraService()

async function CrearCarrera(req,res,next) {
    try{
        const carrera = req.body
        const result = await service.CrearCarrera(carrera)
        res.send({mensaje: 'La carrera fue creada correctamente', result})
    }catch(error){
        next(error)
    }
}

module.exports = {
    CrearCarrera,
}