const Joi = require('joi')

const alumno_id = Joi.number().min(1).required().messages({
    'any.required': 'El alumno_id es obligatorio',
    'number.min': 'El alumno_id debe ser mayor a {#limit}'
})

const materia_id = Joi.number().min(1).required().messages({
    'any.required': 'La materia_id es obligatorio',
    'number.min': 'La materia_id debe ser mayor a {#limit}'
})

const usuario_alta = Joi.string().required()

const postInscripcionSchema = Joi.object({
    alumno_id : alumno_id.required(),
    materia_id : materia_id.required(),
    usuario_alta : usuario_alta.required()
})

module.exports = {postInscripcionSchema}