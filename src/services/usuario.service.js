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
                        return { login: true, ...token} 
                    }else{
                        const error = new Error('datos de login incorrectos, verifique los datos')
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
}

module.exports = UsuarioService