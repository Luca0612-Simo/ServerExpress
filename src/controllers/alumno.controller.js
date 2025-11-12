const AlumnoService = require('../services/alumno.service')
const service = new AlumnoService()

async function CrearAlumno(req, res, next) {
    try {
        const alumno = req.body
        alumno.usuario_alta = req.user.usuario


        const result = await service.CrearAlumno(alumno)
        res.send({ mensaje: 'El alumno fue creado correctamente', result })
    } catch (error) {
        next(error)
    }
}

async function GetAlumnos(req, res, next) {
    try {
        const result = await service.GetAlumnos()
        res.send(result)
    } catch (error) {
        next(error)
    }

}

async function GetAlumnosPorId(req, res, next) {
    try {
        const id = req.params.id
        const result = await service.GetAlumnosPorId(id)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function EditarAlummno(req, res, next) {
    try {
        const id = req.params.id
        const datos = req.body
        const result = await service.EditarAlumno(id, datos)

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }
        res.send({ mensaje: 'El alumno fue actualizado correctamente', result })
    } catch (error) {
        next(error)
    }

}

async function EliminarAlumno(req, res, next) {
    try {
        const id = req.params.id
        const usuario_baja = req.user.usuario
        const result = await service.EliminarAlumno(id, usuario_baja)

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }

        res.send({ mensaje: 'El alumno fue dado de baja', result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    CrearAlumno,
    GetAlumnos,
    GetAlumnosPorId,
    EditarAlummno,
    EliminarAlumno,
}