const getConnection = require('../db/mysql')

class CarreraService{
    async CrearCarrera(nuevaCarrera){
        const connection = await getConnection()
        const {nombre} = nuevaCarrera
        const insert = `insert into carreras (nombre) values(?)`
        const valuesInsert = [nombre]
        const result = await connection.query(insert, valuesInsert)
        const nuevoId = result.insertId; 
        return { nuevoId, ...nuevaCarrera}
    }

    async GetCarreras(){
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre from carreras`) 
        return data
    }

    async GetCarreraPorId(id){
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre from carreras where id = ?`, [id]) 
        return data[0]
    }

    async EditarCarrera(id, nombre){
        const connection = await getConnection()
        const query = `update carreras set nombre = ? where id = ?`
        const result = await connection.query(query, [nombre, id]) 
        return result
    }

    async EliminarCarrera(id){
        const connection = await getConnection()
        const query = `delete from carreras where id = ?`
        const result = await connection.query(query, [id]) 
        return result
    }
}

module.exports = CarreraService