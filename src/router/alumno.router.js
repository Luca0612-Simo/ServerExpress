const express = require('express')
const checkRoles = require('../middleware/secure')


const { CrearAlumno,
    GetAlumnos,
    GetAlumnosPorId,
    EditarAlummno,
    EliminarAlumno } = require('../controllers/alumno.controller')

const { postAlumnoSchema, putAlumnoSchema } = require('../schemas/alumno.schema')

const { validatorHandler } = require('../middleware/validator.handler')

const alumnoRouter = express.Router()
alumnoRouter.use(express.json())

alumnoRouter.post('/',
    checkRoles(1),
    validatorHandler(postAlumnoSchema, 'body'),
    CrearAlumno)

alumnoRouter.get('/',
    checkRoles(1,2),
    GetAlumnos)
alumnoRouter.get('/:id', GetAlumnosPorId)

alumnoRouter.put('/:id',
    checkRoles(1,3),
    validatorHandler(putAlumnoSchema, 'body'),
    EditarAlummno)

alumnoRouter.delete('/:id',
    checkRoles(1),
    EliminarAlumno)


module.exports = alumnoRouter