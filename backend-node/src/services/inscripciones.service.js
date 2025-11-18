const getConnection = require('../db/mysql')

class InscripcionesService {
    async InscribirAlumno(nuevaInscripcion) {
        const connection = await getConnection()

        const { alumno_id, materia_id, usuario_alta } = nuevaInscripcion

        const checkQuery = `
            SELECT id FROM inscripciones 
            WHERE alumno_id = ? AND materia_id = ? AND fecha_baja IS NULL
        `;
        const existing = await connection.query(checkQuery, [alumno_id, materia_id]);

        if (existing.length > 0) {
            const error = new Error('El alumno ya está inscrito en esta materia.');
            error.status = 400; 
            throw error;
        }

        const insert = `insert into inscripciones (alumno_id, materia_id, fecha_alta, usuario_alta) values
        (?, ?, now(), ?)`

        const valuesInsert = [alumno_id, materia_id, usuario_alta]
        const result = await connection.query(insert, valuesInsert)
        const nuevoId = result.insertId;
        return { nuevoId, ...nuevaInscripcion }
    }

    async GetMateriasPorAlumno(alumnoId) {
        const connection = await getConnection()
        const query = `
            SELECT 
                i.id AS inscripcionId, 
                m.nombre AS materias,
                m.id AS materia_id 
            FROM inscripciones i
            INNER JOIN materias m ON m.id = i.materia_id 
            WHERE i.alumno_id = ? AND i.fecha_baja IS NULL
        `;
        
        const result = await connection.query(query, [alumnoId]);
        return result;
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
        const query = `UPDATE inscripciones SET 
        fecha_baja = NOW(),
        usuario_baja = ? WHERE id = ?`

        const values = [usuario_baja, id]
        const result = await connection.query(query, values)
        return result
    }



}

module.exports = InscripcionesService