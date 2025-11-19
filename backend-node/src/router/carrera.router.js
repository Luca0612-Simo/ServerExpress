const express = require('express')
const checkRoles = require('../middleware/secure')
const { CrearCarrera, GetCarreras, GetCarreraPorId, EditarCarrera, EliminarCarrera } = require('../controllers/carrera.controller')
const carreraRouter = express.Router()

carreraRouter.get('/', GetCarreras)

carreraRouter.get('/:id', checkRoles(1), GetCarreraPorId)
carreraRouter.post('/', checkRoles(1), CrearCarrera)
carreraRouter.put('/:id', checkRoles(1), EditarCarrera)
carreraRouter.delete('/:id', checkRoles(1), EliminarCarrera)

module.exports = carreraRouter