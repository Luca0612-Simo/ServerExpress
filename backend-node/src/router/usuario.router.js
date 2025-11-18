const express = require('express')
const{ login, crearUsuario,validateToken } = require('../controllers/usuario.controller')
const checkRoles = require('../middleware/secure')
const usuarioRouter = express.Router()

usuarioRouter.post('/login', login)
usuarioRouter.post('/', crearUsuario)
usuarioRouter.get('/validate', checkRoles(), validateToken) 

module.exports = usuarioRouter
