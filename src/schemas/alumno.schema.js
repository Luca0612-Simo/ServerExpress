const Joi = require('joi')

const id = Joi.number().min(1).required().messages({
    'any.required': 'El id es obligatorio',
    'number.min': 'El id debe ser mayor a {#limit}',
    'number.base' : 'El id no debe ser un string'})


const nombre = Joi.string().min(3).max(50).required().messages({
    'any.required': 'El nombre es obligatorio',
    'number.min':'El nombre debe tener un minimo de {#limit}',
    'number.max':'El nombre debe tener un maximo de {#limit}'
})

const mail = Joi.string().min(10).max(50).email().required().messages({
    'any.required': 'El mail es obligatorio',
    'number.min':'El mail debe tener un minimo de {#limit}',
    'number.max':'El mail debe tener un maximo de {#limit}',
    'string.email':'El formato no es correcto'
})

const usuario = Joi.string().min(3).max(50).required().messages({
    'any.required': 'El username es obligatorio',
    'number.min':'El username debe tener un minimo de {#limit}',
    'number.max':'El username debe tener un maximo de {#limit}'
})

const contrasena = Joi.string().min(3).max(50).required().messages({
    'any.required': 'La contraseña es obligatorio',
    'number.min':'La contraseña debe tener un minimo de {#limit}',
    'number.max':'La contraseña debe tener un maximo de {#limit}'
})

const rol_id = Joi.number().min(1).max(3).required().messages({
    'any.required': 'El rol_id es obligatorio',
    'number.min': 'El id debe ser mayor a {#limit}',
    'number.base' : 'El id no debe ser un string'})

const usuario_alta = Joi.string().required()

const usuario_modificacion = Joi.string().required()

const postAlumnoSchema = Joi.object({
    nombre : nombre.required(),
    mail : mail.required(),
    usuario : usuario.required(),
    contrasena : contrasena.required(),
    rol_id : rol_id.required(),
    usuario_alta : usuario_alta.required()
})

const putAlumnoSchema = Joi.object({
    nombre : nombre.required(),
    mail : mail.required(),
    usuario : usuario.required(),
    contrasena : contrasena.required(),
    usuario_modificacion : usuario_modificacion.required()
})


module.exports = {postAlumnoSchema, putAlumnoSchema}