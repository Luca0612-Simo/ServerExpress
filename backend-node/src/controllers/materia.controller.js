const MateriaService = require('../services/materia.service')
const service = new MateriaService()

async function CrearMateria(req, res, next) {
    try {
        const materia = req.body
        materia.usuario_alta = req.user.usuario


        const result = await service.CrearMateria(materia)
        res.send({ mensaje: 'La materia fue creada correctamente', result })
    } catch (error) {
        next(error)
    }
}

async function GetMaterias(req, res, next) {
    try {
        const result = await service.GetMaterias()
        res.send(result)
    } catch (error) {
        next(error)
    }

}

async function GetMateriasPorId(req, res, next) {
    try {
        const id = req.params.id
        const result = await service.GetMateriasPorId(id)
        res.send(result)
    } catch (error) {
        next(error)
    }
}

async function EditarMateria(req, res, next) {
    try {
        const id = req.params.id
        const datos = req.body
        const result = await service.EditarMateria(id, datos)

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Materia no encontrada' });
        }

        res.send({ mensaje: 'La materia fue actualizado correctamente', result })
    } catch (error) {
        next(error)
    }

}

async function EliminarMateria(req, res, next) {
    try {
        const id = req.params.id
        const usuario_baja = req.user.usuario
        const result = await service.EliminarMateria(id, usuario_baja)

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Materia no encontrada' });
        }

        res.send({ mensaje: 'La materia fue dado de baja', result })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    CrearMateria,
    GetMaterias,
    GetMateriasPorId,
    EditarMateria,
    EliminarMateria,

}