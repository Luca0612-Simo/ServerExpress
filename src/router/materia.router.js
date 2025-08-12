const express = require('express')
const checkRoles = require('../middleware/secure')

const { CrearMateria,
    GetMaterias,
    GetMateriasPorId,
    EditarMateria,
    EliminarMateria } = require('../controllers/materia.controller')

const { postMateriaSchema, putMateriaSchema } = require('../schemas/materia.schema')
const { validatorHandler } = require('../middleware/validator.handler')

const materiaRouter = express.Router()
materiaRouter.use(express.json())

materiaRouter.post('/',
    checkRoles(1),
    validatorHandler(postMateriaSchema, 'body'),
    CrearMateria)

materiaRouter.get('/', GetMaterias)
materiaRouter.get('/:id', GetMateriasPorId)

materiaRouter.put('/:id', 
    checkRoles(1),
    validatorHandler(putMateriaSchema, 'body'),
    EditarMateria)

materiaRouter.delete('/:id',
    checkRoles(1),
    EliminarMateria
)


module.exports = materiaRouter