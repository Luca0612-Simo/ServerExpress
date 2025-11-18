import React, { useState, useEffect } from 'react';
import { BookOpen, Trash2 } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';

const MisMateriasComponent = () => {
    const [inscripciones, setInscripciones] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuthStore();
    
    const fetchInscripciones = async () => {
        if (user?.rol_id !== 3) {
            setError('Solo los Alumnos pueden ver esta sección.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await apiClient.get('/inscripciones/'); 
            setInscripciones(response.data);

        } catch (err) {
            console.error("Error al obtener inscripciones detalladas:", err);
            setError(err.response?.data?.mensaje || 'Error al cargar la lista de materias inscritas.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBaja = async (inscripcionId, materiaNombre) => {
        if (!window.confirm(`¿Estás seguro de dar de baja la inscripción a ${materiaNombre}?`)) {
            return;
        }

        try {
            await apiClient.delete(`/inscripciones/${inscripcionId}`);
            alert(`Baja exitosa de: ${materiaNombre}`);
            fetchInscripciones(); 
        } catch (err) {
            console.error("Error al dar de baja:", err);
            setError(err.response?.data?.mensaje || 'Error al procesar la baja.');
        }
    };

    useEffect(() => {
        if (token && user?.rol_id === 3) {
            fetchInscripciones();
        } else {
            setIsLoading(false);
        }
    }, [token, user]);

    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando inscripciones...</div>;
    if (error) return <div className="p-8 text-center text-red-600 border-red-300 border rounded-lg bg-red-50">{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-indigo-600 border-b pb-2 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Mis Materias Inscritas
            </h2>
            
            <div className="space-y-4">
                {inscripciones.map((inscripcion) => (
                    <div key={inscripcion.inscripcionId} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center transition duration-150 hover:shadow-lg">
                        <div>
                            {}
                            <p className="text-xl font-semibold text-gray-800">{inscripcion.materias}</p> 
                            <p className="text-sm text-gray-500">ID Inscripción: {inscripcion.inscripcionId}</p>
                        </div>
                        <button 
                            onClick={() => handleBaja(inscripcion.inscripcionId, inscripcion.materias)}
                            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition duration-150 flex items-center"
                        >
                            <Trash2 className='w-4 h-4 mr-1' /> Dar de Baja
                        </button>
                    </div>
                ))}
            </div>
            {inscripciones.length === 0 && (
                <p className="text-gray-500 mt-4">No tienes materias inscritas.</p>
            )}
        </div>
    );
};

export default MisMateriasComponent;