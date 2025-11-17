const Joi = require('joi')

const nombre = Joi.string().min(3).max(50).messages({
    'any.required': 'El nombre de la materia es obligatorio',
    'number.min':'El nombre de la materia debe tener un minimo de {#limit}',
    'number.max':'El nombre de la materia debe tener un maximo de {#limit}'
})

const carrera_id = Joi.number().min(1).required().messages({
    'any.required': 'La carrera_id es obligatorio',
    'number.min':'La carrera_id debe tener un minimo de {#limit}'
})

const usuario_alta = Joi.string().required()
const usuario_modificacion = Joi.string().required()

const postMateriaSchema = Joi.object({
    nombre : nombre.required(),
    carrera_id : carrera_id.required(),
    usuario_alta : usuario_alta.required()
})

const putMateriaSchema = Joi.object({
    nombre : nombre.required(),
    usuario_modificacion : usuario_modificacion.required()

})
module.exports = {postMateriaSchema, putMateriaSchema}