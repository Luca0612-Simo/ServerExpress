import React, { useState, useEffect } from 'react';
import { BookOpen, Edit, Trash2, Plus, CornerDownLeft } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const MateriasManagementComponent = () => {
    const [materias, setMaterias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuthStore();
    const navigate = useNavigate();
    
    const isAdministrador = user?.rol_id === 1; 

    const fetchMaterias = async () => {
        try {
            const response = await apiClient.get('/materia/'); 
            setMaterias(response.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener materias:", err.response?.status, err.message);
            setError(err.response?.data?.mensaje || 'Error al cargar la lista de materias.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBaja = async (materiaId, materiaNombre) => {
        if (!isAdministrador) return;

        if (!window.confirm(`¿Estás seguro de dar de baja lógicamente la materia: ${materiaNombre}? Esta acción es irreversible.`)) {
            return;
        }
        
        try {
            await apiClient.delete(`/materia/${materiaId}`);
            alert(`Baja lógica exitosa para: ${materiaNombre}`);
            fetchMaterias(); 

        } catch (err) {
            console.error("Error al dar de baja:", err.response?.status, err.message);
            setError(err.response?.data?.mensaje || 'Error al procesar la baja.');
        }
    };
    
    const handleAction = (type, materia = null) => {
        if (!isAdministrador) return;

        if (type === 'Crear') {
            navigate('/gestion-materias/crear');
        } else if (type === 'Editar' && materia) {
            navigate(`/gestion-materias/editar/${materia.id}`);
        }
    };


    useEffect(() => {
        if (token) {
            fetchMaterias();
        } else {
             setIsLoading(false);
        }
    }, [token, user?.rol_id]);


    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando datos...</div>;
    if (error) return <div className="p-8 text-center text-red-600 border-red-300 border rounded-lg bg-red-50">{error}</div>;
    
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" />
                    Gestión de Materias y Carreras
                </h2>
                {isAdministrador && (
                    <button
                        onClick={() => handleAction('Crear')}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition duration-150 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Crear Materia
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {materias.map((materia) => (
                    <div key={materia.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center transition duration-150 hover:shadow-lg">
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{materia.nombre}</p>
                            <p className="text-sm text-gray-500">Carrera ID: {materia.carrera_id} | ID: {materia.id}</p>
                        </div>
                        <div className="flex space-x-2">
                            {isAdministrador && (
                                <button 
                                    onClick={() => handleAction('Editar', materia)}
                                    className="p-2 bg-yellow-500 text-white text-sm font-medium rounded-md hover:bg-yellow-600 transition duration-150"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                            )}
                            {isAdministrador && (
                                <button 
                                    onClick={() => handleBaja(materia.id, materia.nombre)}
                                    className="p-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition duration-150"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {materias.length === 0 && !isLoading && (
                <p className="text-gray-500 mt-4">No se encontraron materias activas.</p>
            )}
        </div>
    );
};

export default MateriasManagementComponent;