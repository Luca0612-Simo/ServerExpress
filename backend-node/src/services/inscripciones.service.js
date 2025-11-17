const getConnection = require('../db/mysql')

class InscripcionesService {
    async InscribirAlumno(nuevaInscripcion) {
        const connection = await getConnection()

        const { alumno_id, materia_id, usuario_alta } = nuevaInscripcion
        const insert = `insert into inscripciones (alumno_id, materia_id, fecha_alta, usuario_alta) values
        (?, ?, now(), ?)`

        const valuesInsert = [alumno_id, materia_id, usuario_alta]
        const result = await connection.query(insert, valuesInsert)
        const nuevoId = result.insertId;
        return { nuevoId, ...nuevaInscripcion }
    }

    async GetMateriasPorAlumno(materiaId) {
        const connection = await getConnection()
        const query = `select inscripciones.id as inscripcionId, usuarios.nombre, materias.nombre as materias from 
            inscripciones inner join usuarios on alumno_id = usuarios.id inner join 
            materias on materias.id = materia_id where rol_id = 3 and inscripciones.fecha_baja is null`
        const result = await connection.query(query, [materiaId])
        return result
    }

    async GetAlumnosPorMateria(materiaId) {
        const connection = await getConnection()
        const query = `select usuarios.nombre, materias.nombre as materias from 
            inscripciones inner join usuarios on alumno_id = usuarios.id inner join 
            materias on materias.id = materia_id where rol_id = 3 and materias.id = ?`
        const result = await connection.query(query, [materiaId])
        return result
    }

    async EliminarInscripcion(id, usuario_baja) {
        const connection = await getConnection()
        const query = `update inscripciones set 
        fecha_baja = now(),
        usuario_baja = ? where id = ?`

        const values = [usuario_baja, id]
        const result = await connection.query(query, values)
        return result
    }



}

module.exports = InscripcionesService