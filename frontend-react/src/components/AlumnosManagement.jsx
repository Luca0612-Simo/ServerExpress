import React, { useState, useEffect } from 'react';
import { User, Users, Edit, Trash2, Plus } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const AlumnosManagementComponent = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuthStore();
    
    const canView = user?.rol_id === 1 || user?.rol_id === 2;

    const navigate = useNavigate();

    const fetchAlumnos = async () => {
        if (!canView) {
            setError('Privilegios insuficientes para ver esta sección.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiClient.get('/alumno/'); 
            setAlumnos(response.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener alumnos:", err.response?.status, err.message);
            setError(err.response?.data?.mensaje || 'Error al cargar la lista de alumnos.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBaja = async (alumnoId, alumnoNombre) => {
        if (user?.rol_id !== 1) { 
            alert("Acción denegada: Solo el Administrador puede dar de baja usuarios.");
            return;
        }

        if (!window.confirm(`¿Estás seguro de dar de baja al alumno: ${alumnoNombre}?`)) {
            return;
        }
        
        try {
            await apiClient.delete(`/alumno/${alumnoId}`);
            alert(`Baja lógica exitosa para: ${alumnoNombre}`);
            fetchAlumnos(); 

        } catch (err) {
            console.error("Error al dar de baja:", err.response?.status, err.message);
            setError(err.response?.data?.mensaje || 'Error al procesar la baja.');
        }
    };
    
    const handleAction = (type, alumno = null) => {
        if (type === 'Crear') {
            navigate('/alumnos/crear');
        } else if (type === 'Editar' && alumno) {
            navigate(`/alumnos/editar/${alumno.id}`);
        }
    };


    useEffect(() => {
        if (token) {
            fetchAlumnos();
        } else {
             setIsLoading(false);
        }
    }, [token, user?.rol_id]);


    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando usuarios...</div>;
    if (error) return <div className="p-8 text-center text-red-600 border-red-300 border rounded-lg bg-red-50">{error}</div>;
    
    const isAdministrador = user?.rol_id === 1;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
                    <Users className="w-6 h-6 mr-3" />
                    Gestión de Alumnos
                </h2>
                {isAdministrador && (
                    <button
                        onClick={() => handleAction('Crear')}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition duration-150 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Crear Alumno
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {alumnos.map((alumno) => (
                    <div key={alumno.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center transition duration-150 hover:shadow-lg">
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{alumno.nombre} ({alumno.usuario})</p>
                            <p className="text-sm text-gray-500">Mail: {alumno.mail} | ID: {alumno.id}</p>
                        </div>
                        <div className="flex space-x-2">
                            {isAdministrador && (
                                <button 
                                    onClick={() => handleAction('Editar', alumno)}
                                    className="p-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition duration-150"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            )}
                            {isAdministrador && (
                                <button 
                                    onClick={() => handleBaja(alumno.id, alumno.nombre)}
                                    className="p-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition duration-150"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {alumnos.length === 0 && !isLoading && (
                <p className="text-gray-500 mt-4">No se encontraron alumnos activos.</p>
            )}
        </div>
    );
};

export default AlumnosManagementComponent;