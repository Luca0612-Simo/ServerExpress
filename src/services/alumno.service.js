const getConnection = require('../db/mysql')
const bcrypt = require('bcrypt')

class AlumnoService {

    async CrearAlumno(alumnoNuevo) {
        const connection = await getConnection()

        const { nombre, mail, usuario, contrasena, rol_id, usuario_alta } = alumnoNuevo;
        const hash = await bcrypt.hash(contrasena, 10)

        const insert =
            `insert into usuarios (nombre, mail, usuario, contrasena, rol_id, usuario_alta)
            values(?, ?, ?, ?, ?, ?)`

        const valuesInsert = [nombre, mail, usuario, hash, rol_id, usuario_alta]
        const result = await connection.query(insert, valuesInsert)
        const nuevoId = result.insertId;
        return { nuevoId, ...alumnoNuevo }
    }

    async GetAlumnos() {
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre, mail, usuario, contrasena 
            from usuarios where rol_id = 3 and fecha_baja is null`)
        return data
    }

    async GetAlumnosPorId(id) {
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre, mail, usuario, contrasena 
            from usuarios where id = ?`, [id])
        return data[0]
    }

    async EditarAlumno(id, datosActualizados) {
        const { nombre, mail, usuario, contrasena, usuario_modificacion } = datosActualizados
        const connection = await getConnection()
        const hash = await bcrypt.hash(contrasena, 10)

        const query = `update usuarios set 
            nombre = ?,
            mail = ?,
            usuario = ?,
            contrasena = ?,
            fecha_modificacion = now(),
            usuario_modificacion = ? where id = ? `

        const values = [nombre, mail, usuario, hash, usuario_modificacion, id]

        const result = await connection.query(query, values)
        return result
    }

    async EliminarAlumno(id, usuario_baja) {
        const connection = await getConnection()
        const query = `update usuarios set 
        fecha_baja = now(),
        usuario_baja = ? where id = ? and rol_id = 3`

        const values = [usuario_baja, id]
        const result = await connection.query(query, values)
        return result
    }

}

module.exports = AlumnoService