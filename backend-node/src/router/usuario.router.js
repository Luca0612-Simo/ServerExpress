const express = require('express')
const{ login, crearUsuario,validateToken, GetPersonal, EliminarUsuario } = require('../controllers/usuario.controller')
const checkRoles = require('../middleware/secure')
const usuarioRouter = express.Router()

usuarioRouter.post('/login', login)
usuarioRouter.post('/', crearUsuario)
usuarioRouter.get('/validate', checkRoles(), validateToken) 

usuarioRouter.get('/personal', checkRoles(1), GetPersonal)
usuarioRouter.delete('/:id', checkRoles(1), EliminarUsuario)

module.exports = usuarioRouter
