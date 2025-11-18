const express = require('express')
const checkRoles = require('../middleware/secure')



const { InscribirAlumno,
    GetMateriasPorAlumno,
    GetAlumnosPorMateria,
    EliminarInscripcion, } = require('../controllers/inscripciones.controller')

const { postInscripcionSchema } = require('../schemas/inscripciones.schema')
const { validatorHandler } = require('../middleware/validator.handler')

const inscripcionesRouter = express.Router()

inscripcionesRouter.post('/',
    checkRoles(1,3),
    validatorHandler(postInscripcionSchema, 'body'),
    InscribirAlumno
)

inscripcionesRouter.get('/', 
    checkRoles(1, 3), 
    GetMateriasPorAlumno
)
inscripcionesRouter.get('/materia/:id',
    checkRoles(1,2),
    GetAlumnosPorMateria)

inscripcionesRouter.delete('/:id', 
    checkRoles(1,3),
    EliminarInscripcion)

module.exports = inscripcionesRouter