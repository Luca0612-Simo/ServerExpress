const InscripcionesService = require('../services/inscripciones.service')
const service = new InscripcionesService()

async function InscribirAlumno(req, res, next) {
    try {
        const inscripcion = req.body
        inscripcion.usuario_alta = req.user.usuario


        const result = await service.InscribirAlumno(inscripcion)
        res.send({ mensaje: 'Inscripcion exitosa', result })
    } catch (error) {
        next(error)
    }
}

async function GetMateriasPorAlumno(req, res, next) {
    try {
        const result = await service.GetMateriasPorAlumno()
        res.send(result)
    } catch (error) {
        next(error)
    }

}

async function GetAlumnosPorMateria(req, res, next) {
    try {
        const id = req.params.id
        const data = await service.GetAlumnosPorMateria(id)
        res.json(data)
    } catch (error) {
        next(error)
    }

}

async function EliminarInscripcion(req, res, next) {
    try {
        const id = req.params.id
        const usuario_baja = req.user.usuario
        const result = await service.EliminarInscripcion(id, usuario_baja)

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'La inscripcion no existe' });
        }

        res.send({ mensaje: 'La inscripcion fue dada de baja', result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    InscribirAlumno,
    GetMateriasPorAlumno,
    GetAlumnosPorMateria,
    EliminarInscripcion,
}
