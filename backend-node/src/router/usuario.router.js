const express = require('express')
const{ login, crearUsuario } = require('../controllers/usuario.controller')
const usuarioRouter = express.Router()
usuarioRouter.use(express.json())

usuarioRouter.post('/login', login)
usuarioRouter.post('/', crearUsuario)

module.exports = usuarioRouter
