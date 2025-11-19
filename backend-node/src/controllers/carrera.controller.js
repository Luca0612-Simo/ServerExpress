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

async function GetCarreras(req, res, next) {
    try {
        const result = await service.GetCarreras()
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function GetCarreraPorId(req, res, next) {
    try {
        const { id } = req.params
        const result = await service.GetCarreraPorId(id)
        if (!result) return res.status(404).json({ mensaje: 'Carrera no encontrada' })
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function EditarCarrera(req, res, next) {
    try {
        const { id } = req.params
        const { nombre } = req.body
        const result = await service.EditarCarrera(id, nombre)
        res.send({ mensaje: 'Carrera actualizada', result })
    } catch (error) {
        next(error)
    }
}

async function EliminarCarrera(req, res, next) {
    try {
        const { id } = req.params
        await service.EliminarCarrera(id)
        res.send({ mensaje: 'Carrera eliminada correctamente' })
    } catch (error) {
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            error.message = 'No se puede eliminar la carrera porque tiene materias asociadas.'
            error.status = 400
        }
        next(error)
    }
}

module.exports = {
    CrearCarrera,
    GetCarreras,
    GetCarreraPorId,
    EditarCarrera,
    EliminarCarrera
}