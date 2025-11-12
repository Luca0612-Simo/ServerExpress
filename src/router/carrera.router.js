const express = require('express')
const checkRoles = require('../middleware/secure')
const { CrearCarrera } = require('../controllers/carrera.controller')
const carreraRouter = express.Router()
carreraRouter.use(express.json())

carreraRouter.post('/', checkRoles(1),
    CrearCarrera)

module.exports = carreraRouter