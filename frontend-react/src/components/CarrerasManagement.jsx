import React, { useState, useEffect } from 'react';
import { GraduationCap, Edit, Trash2, Plus } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const CarrerasManagementComponent = () => {
    const [carreras, setCarreras] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user, token } = useAuthStore();
    const navigate = useNavigate();
    
    const isAdministrador = user?.rol_id === 1;

    const fetchCarreras = async () => {
        try {
            const response = await apiClient.get('/carrera/'); 
            setCarreras(response.data);
        } catch (err) {
            console.error("Error:", err);
            alert('Error al cargar carreras.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBaja = async (id, nombre) => {
        if (!isAdministrador) return;
        if (!window.confirm(`¿Eliminar carrera: ${nombre}? Si tiene materias, esto fallará.`)) return;
        
        try {
            await apiClient.delete(`/carrera/${id}`);
            alert(`Carrera eliminada: ${nombre}`);
            fetchCarreras(); 
        } catch (err) {
            alert(err.response?.data?.mensaje || 'No se pudo eliminar la carrera (probablemente tenga materias).');
        }
    };
    
    const handleAction = (type, carrera = null) => {
        if (!isAdministrador) return;
        if (type === 'Crear') navigate('/gestion-carreras/crear');
        else navigate(`/gestion-carreras/editar/${carrera.id}`);
    };

    useEffect(() => { if (token) fetchCarreras(); }, [token]);

    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3" />
                    Gestión de Carreras
                </h2>
                {isAdministrador && (
                    <button onClick={() => handleAction('Crear')} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center">
                        <Plus className="w-4 h-4 mr-2" /> Nueva Carrera
                    </button>
                )}
            </div>
            <div className="space-y-4">
                {carreras.map((c) => (
                    <div key={c.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                        <p className="text-xl font-semibold text-gray-800">{c.nombre}</p>
                        <div className="flex space-x-2">
                            <button onClick={() => handleAction('Editar', c)} className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"><Edit className="w-4 h-4" /></button>
                            <button onClick={() => handleBaja(c.id, c.nombre)} className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarrerasManagementComponent;