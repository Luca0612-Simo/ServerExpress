const getConnection = require('../db/mysql')
const { sign } = require('../utils/jwt')
const bcrypt = require('bcrypt')

class UsuarioService{
    async login(data){
        const connection = await getConnection()
        const query = `select * from usuarios where mail = ?`
        const usuarios = await connection.query(query, [data.mail])

        if(usuarios[0]){
            const{id, nombre, usuario, contrasena, rol_id} = usuarios[0]
            return bcrypt.compare(data.contrasena, contrasena)
                .then(sonIguales => {
                    if(sonIguales){
                        const token = { token: sign ({id, nombre, usuario, rol_id})}
                        return { 
                            login: true, 
                            id,
                            nombre,
                            usuario,
                            rol_id,
                            ...token
                        } 
                    }else{
                        const error = new Error('datos de login incorrectos')
                        error.status = 401
                        throw error
                    }
                })
        }else{
            const error = new Error('usuario no encontrado')
            error.status = 401
            throw error
        }
    }

    async crearUsuario(usuarioNuevo){
        const connection = await getConnection()

        const { nombre, mail, usuario, contrasena, rol_id, usuario_alta } = usuarioNuevo;
        const hash = await bcrypt.hash(contrasena, 10)

        const insert=
            `insert into usuarios (nombre, mail, usuario, contrasena, rol_id, usuario_alta)
            values(?, ?, ?, ?, ?, ?)`
            
        const valuesInsert = [nombre, mail, usuario, hash, rol_id, usuario_alta]
        const result=await connection.query(insert, valuesInsert)
        const nuevoId = result.insertId;
        return { nuevoId, ...usuarioNuevo }
    }

    async GetPersonal() {
        const connection = await getConnection()
        const data = await connection.query(`select id, nombre, mail, usuario, rol_id 
            from usuarios where rol_id IN (1, 2) and fecha_baja is null`)
        return data
    }

    async EliminarUsuario(id, usuario_baja) {
        const connection = await getConnection()
        const query = `update usuarios set 
        fecha_baja = now(),
        usuario_baja = ? where id = ?` 

        const values = [usuario_baja, id]
        const result = await connection.query(query, values)
        return result
    }
}

module.exports = UsuarioService