import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';

const MateriasComponent = () => {
    const [materias, setMaterias] = useState([]);
    const [inscritasIds, setInscritasIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, token } = useAuthStore();

    const isAlumno = user?.rol_id === 3;
    const isCoordinadorAdmin = user?.rol_id === 1 || user?.rol_id === 2;

    const fetchInscritas = async () => {
        if (!user || user.rol_id !== 3) return;

        try {
            const response = await apiClient.get('/inscripciones/');
            setInscritasIds(response.data);
        } catch (err) {
            console.error("Error al obtener inscripciones:", err);
        }
    };

    const fetchMaterias = async () => {
        try {
            const response = await apiClient.get('/materia/');
            setMaterias(response.data);

            if (isAlumno) {
                await fetchInscritas();
            }
        } catch (err) {
            console.error("Error al obtener materias:", err.response?.status, err.message);
            if (err.response?.status === 401) {
                setError('Privilegios insuficientes.');
            } else {
                setError('Error al cargar las materias.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (!token) {
            setError('No autenticado.');
            setIsLoading(false);
            return;
        }

        if (!isAlumno && !isCoordinadorAdmin) {
            setError('Acceso denegado. Rol no reconocido.');
            setIsLoading(false);
            return;
        }

        fetchMaterias();
    }, [token, user?.rol_id]);

    const handleInscripcion = async (materiaId, materiaNombre) => {
        if (!isAlumno) return;
        setError(null);
        try {
            await apiClient.post('/inscripciones/', { materia_id: materiaId });
            alert(`Inscripción exitosa a: ${materiaNombre}!`);

            await fetchInscritas();

        } catch (err) {
            console.error("Error al inscribirse:", err.response?.status, err.message);
            const errorMessage = err.response?.data?.mensaje || 'Error al inscribirse en la materia.'; 
            setError(errorMessage);
        }
    };


    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando materias...</div>;
    if (error) return <div className="p-8 text-center text-red-600 border-red-300 border rounded-lg bg-red-50">{error}</div>;

    const renderInscripcionButton = (materia) => {
        const isMateriaInscrita = inscritasIds.includes(materia.id);

        if (!isAlumno) {
            return (
                <button
                    className="px-4 py-2 bg-gray-400 text-white text-sm font-medium rounded-md cursor-not-allowed"
                    disabled
                >
                    Rol sin inscripción
                </button>
            );
        }

        if (isMateriaInscrita) {
            return (
                <button
                    className="px-4 py-2 bg-indigo-500 text-white text-sm font-medium rounded-md cursor-not-allowed"
                    disabled
                >
                    Inscrito ✅
                </button>
            );
        }

        return (
            <button
                onClick={() => handleInscripcion(materia.id, materia.nombre)}
                className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition duration-150"
            >
                Inscribirse
            </button>
        );
    };

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
                        {renderInscripcionButton(materia)}
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