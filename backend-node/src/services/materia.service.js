const getConnection = require('../db/mysql')

class MateriaService{
    
    async CrearMateria(nuevaMateria){
        const connection = await getConnection()

        const { nombre, carrera_id, usuario_alta } = nuevaMateria
        const insert = `insert into materias (nombre, carrera_id, fecha_alta, usuario_alta) values
        (?, ?, now(), ?)`

        const valuesInsert = [nombre, carrera_id, usuario_alta]
        const result = await connection.query(insert, valuesInsert)
        const nuevoId = result.insertId;
        return { nuevoId, ...nuevaMateria }
    } 

    async GetMaterias() {
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre, carrera_id 
            from materias where fecha_baja is null`)
        return data
    }

    async GetMateriasPorId(id) {
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre, carrera_id 
            from materias where id = ?`, [id])
        return data[0]
    }

    async EditarMateria(id, datosActualizados) {
        const { nombre, usuario_modificacion } = datosActualizados
        const connection = await getConnection()

        const query = `update materias set 
            nombre = ?,
            fecha_modificacion = now(),
            usuario_modificacion = ? where id = ? `

        const values = [nombre, usuario_modificacion, id]

        const result = await connection.query(query, values)
        return result
    }

    async EliminarMateria(id, usuario_baja) {
        const connection = await getConnection()
        const query = `update materias set 
        fecha_baja = now(),
        usuario_baja = ? where id = ?`

        const values = [usuario_baja, id]
        const result = await connection.query(query, values)
        return result
    }
}

module.exports = MateriaService