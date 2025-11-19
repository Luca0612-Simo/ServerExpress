const getConnection = require('../db/mysql')

class CarreraService{
    async CrearCarrera(nuevaCarrera){
        const connection = await getConnection()

        const {nombre} = nuevaCarrera

        const insert = `insert into carreras (nombre) values(?)`
        const valuesInsert = [nombre]
        const result = await connection.query(insert, valuesInsert)
        const nuevoId = result.inserId;
        return { nuevoId, ...nuevaCarrera}
    }

    async GetCarreras(){
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre from carreras`) 
        return data
    }
}

module.exports = CarreraService