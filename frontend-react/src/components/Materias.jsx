import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';

const MateriasComponent = () => {
    const [materias, setMaterias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthStore();

    useEffect(() => {
        if (!token) {
            setError('No autenticado.');
            setIsLoading(false);
            return;
        }

        const fetchMaterias = async () => {
            try {
                const response = await apiClient.get('/materia'); 
                setMaterias(response.data);
            } catch (err) {
                console.error("Error al obtener materias:", err.response?.status, err.message);
                if (err.response?.status === 401) {
                    setError('Sesión expirada o privilegios insuficientes.');
                } else {
                    setError('Error al cargar las materias. Verifique el backend.');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchMaterias();
    }, [token]);

    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando materias...</div>;
    if (error) return <div className="p-8 text-center text-red-600 border-red-300 border rounded-lg bg-red-50">{error}</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6 text-indigo-600 border-b pb-2 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Materias Disponibles
            </h2>
            
            <div className="space-y-4">
                {materias.map((materia) => (
                    <div key={materia.id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center transition duration-150 hover:shadow-lg">
                        <div>
                            <p className="text-xl font-semibold text-gray-800">{materia.nombre}</p>
                            <p className="text-sm text-gray-500">Carrera ID: {materia.carrera_id}</p>
                        </div>
                        <button className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition duration-150">
                            Inscribirse
                        </button>
                    </div>
                ))}
            </div>
            {materias.length === 0 && (
                <p className="text-gray-500 mt-4">No se encontraron materias.</p>
            )}
        </div>
    );
};

export default MateriasComponent;