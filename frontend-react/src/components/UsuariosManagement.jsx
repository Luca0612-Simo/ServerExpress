import React, { useState, useEffect } from 'react';
import { Shield, UserCog, Edit, Trash2, Plus } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const UsuariosManagementComponent = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuthStore();
    const navigate = useNavigate();
    
    const isAdministrador = user?.rol_id === 1;

    const fetchPersonal = async () => {
        if (!isAdministrador) {
            setError('Solo el Administrador puede ver esta sección.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiClient.get('/usuario/personal'); 
            setUsuarios(response.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener personal:", err);
            setError('Error al cargar la lista de personal.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBaja = async (id, nombre) => {
        if (id === user.id) {
            alert("No puedes darte de baja a ti mismo.");
            return;
        }
        if (!window.confirm(`¿Estás seguro de dar de baja al usuario: ${nombre}?`)) {
            return;
        }
        
        try {
            await apiClient.delete(`/usuario/${id}`);
            alert(`Baja lógica exitosa para: ${nombre}`);
            fetchPersonal(); 

        } catch (err) {
            console.error("Error al dar de baja:", err);
            setError('Error al procesar la baja.');
        }
    };
    
    const handleAction = (type, usuarioData = null) => {
        if (type === 'Crear') {
            navigate('/alumnos/crear'); 
        } else if (type === 'Editar' && usuarioData) {
            navigate(`/alumnos/editar/${usuarioData.id}`); 
        }
    };

    useEffect(() => {
        if (token) fetchPersonal();
    }, [token]);

    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando personal...</div>;
    if (error) return <div className="p-8 text-center text-red-600 border-red-300 border rounded-lg bg-red-50">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
                    <Shield className="w-6 h-6 mr-3" />
                    Gestión de Personal (Admins/Coords)
                </h2>
                <button
                    onClick={() => handleAction('Crear')}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition duration-150 flex items-center"
                >
                    <Plus className="w-4 h-4 mr-2" /> Nuevo Usuario
                </button>
            </div>

            <div className="space-y-4">
                {usuarios.map((u) => (
                    <div key={u.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center transition duration-150 hover:shadow-lg">
                        <div>
                            <p className="text-xl font-semibold text-gray-800 flex items-center">
                                {u.rol_id === 1 ? <Shield className="w-4 h-4 mr-2 text-red-500"/> : <UserCog className="w-4 h-4 mr-2 text-blue-500"/>}
                                {u.nombre} ({u.usuario})
                            </p>
                            <p className="text-sm text-gray-500">
                                Mail: {u.mail} | Rol: {u.rol_id === 1 ? 'Administrador' : 'Coordinador'}
                            </p>
                        </div>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => handleAction('Editar', u)}
                                className="p-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition duration-150"
                            >
                                <Edit className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={() => handleBaja(u.id, u.nombre)}
                                className="p-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition duration-150"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {usuarios.length === 0 && (
                <p className="text-gray-500 mt-4">No se encontró personal activo.</p>
            )}
        </div>
    );
};

export default UsuariosManagementComponent;