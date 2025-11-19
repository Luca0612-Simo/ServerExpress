const express = require('express')
const checkRoles = require('../middleware/secure')
const { CrearCarrera, GetCarreras } = require('../controllers/carrera.controller')
const carreraRouter = express.Router()

carreraRouter.post('/', checkRoles(1),
    CrearCarrera)
carreraRouter.get('/', GetCarreras)

module.exports = carreraRouter