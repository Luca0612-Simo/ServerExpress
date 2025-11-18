const express = require('express')
require('dotenv').config()
const usuarioRouter = require('./router/usuario.router')
const alumnoRouter = require('./router/alumno.router')
const carreraRouter = require('./router/carrera.router')
const materiaRouter = require('./router/materia.router')
const inscripcionesRouter = require('./router/inscripciones.router')
const cors=require('cors')
const errorHandler = require('./middleware/error.handler')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/usuario', usuarioRouter)
app.use('/api/alumno', alumnoRouter)
app.use('/api/carrera', carreraRouter)
app.use('/api/materia', materiaRouter)
app.use('/api/inscripciones', inscripcionesRouter)

app.get('/',(req,res)=>{
    res.send("tp integrador")
})

app.use(errorHandler);

const PUERTO = process.env.PUERTO || 3000

app.listen(PUERTO, ()=>{
    console.log(`servidor escuchando en el puerto ${PUERTO}`)
})