import React, { useState, useEffect } from 'react';
import { User, Save } from 'lucide-react';
import apiClient from './SharedApi';
import Boton from './Boton';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AlumnoFormComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        nombre: '', mail: '', usuario: '', contrasena: '', rol_id: 3
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const isEditing = !!id;
    const isCreatorAdmin = user?.rol_id === 1;
    const titulo = isEditing ? 'Editar Alumno' : 'Crear Nuevo Alumno';

    useEffect(() => {
        if (isEditing) {
            const fetchAlumno = async () => {
                try {
                    const response = await apiClient.get(`/alumno/${id}`);
                    const alumno = response.data;
                    setFormData({
                        nombre: alumno.nombre,
                        mail: alumno.mail,
                        usuario: alumno.usuario,
                        contrasena: '',
                        rol_id: alumno.rol_id
                    });
                } catch (err) {
                    setError('Error al cargar los datos del alumno.');
                }
            };
            fetchAlumno();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const endpoint = isEditing ? `/alumno/${id}` : '/usuario';
            const method = isEditing ? 'put' : 'post';

            const auditField = isEditing ? { usuario_modificacion: user.usuario } : { usuario_alta: user.usuario, rol_id: 3 };

            const dataToSend = isEditing ?
                { ...formData, ...auditField } :
                { ...formData, rol_id: 3, ...auditField };

            if (isEditing && dataToSend.contrasena === '') {
                delete dataToSend.contrasena;
            }

            const response = await apiClient[method](endpoint, dataToSend);

            alert(response.data.mensaje);
            navigate('/alumnos');

        } catch (err) {
            console.error("Error al guardar:", err.response?.data);
            setError(err.response?.data?.mensaje || 'Error desconocido al guardar los datos.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-start justify-center pt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center">
                    <User className="w-6 h-6 mr-3" />
                    {titulo}
                </h2>

                {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded-md">{error}</p>}

                { }

                { }
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Nombre</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>

                { }
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Correo</label>
                    <input type="email" name="mail" value={formData.mail} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>

                { }
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Usuario</label>
                    <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>

                { }
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Contraseña {isEditing && "(Dejar vacío para mantener la actual)"}</label>
                    <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} required={!isEditing} className="w-full px-4 py-2 border rounded-md" />
                </div>

                { }
                {!isEditing && (
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Rol</label>
                        <select
                            name="rol_id"
                            value={formData.rol_id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md"
                            disabled={!isCreatorAdmin && !isEditing}
                        >
                            <option value={1}>Administrador</option>
                            <option value={2}>Coordinador</option>
                            <option value={3}>Alumno</option>
                        </select>
                    </div>
                )}


                <Boton
                    label={isLoading ? 'Guardando...' : `${isEditing ? 'Actualizar' : 'Crear'} Alumno`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full justify-center mt-4 flex items-center"
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Actualizar' : 'Crear'}
                </Boton>
            </form>
        </div>
    );
}

export default AlumnoFormComponent;