import React, { useState, useEffect } from 'react';
import { FileText, Search, Users, UserMinus, UserCheck } from 'lucide-react';
import apiClient from './SharedApi';
import useAuthStore from '../store/useAuthStore';

const ReporteInscripciones = () => {
    const [materias, setMaterias] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { token } = useAuthStore();

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await apiClient.get('/materia/');
                setMaterias(response.data);
            } catch (err) {
                console.error("Error cargando materias:", err);
                setError("No se pudo cargar la lista de materias.");
            }
        };
        if (token) fetchMaterias();
    }, [token]);

    const handleMateriaChange = async (e) => {
        const materiaId = e.target.value;
        setMateriaSeleccionada(materiaId);
        setAlumnos([]); 
        setError(null);

        if (!materiaId) return;

        setIsLoading(true);
        try {
            const response = await apiClient.get(`/inscripciones/materia/${materiaId}`);
            setAlumnos(response.data);
        } catch (err) {
            console.error("Error obteniendo alumnos:", err);
            setError("Error al obtener el listado de alumnos.");
        } finally {
            setIsLoading(false);
        }
    };

    const alumnosActivos = alumnos.filter(a => !a.fecha_baja);
    const alumnosBaja = alumnos.filter(a => a.fecha_baja);

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
                    <FileText className="w-6 h-6 mr-3" />
                    Reporte de Inscripciones
                </h2>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Selecciona una Materia:
                </label>
                <select
                    value={materiaSeleccionada}
                    onChange={handleMateriaChange}
                    className="block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                >
                    <option value="">-- Seleccionar Materia --</option>
                    {materias.map((materia) => (
                        <option key={materia.id} value={materia.id}>
                            {materia.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {isLoading && <p className="text-center text-indigo-500">Cargando...</p>}
            {error && <p className="text-red-600 bg-red-50 p-3 rounded">{error}</p>}

            {!isLoading && materiaSeleccionada && alumnos.length === 0 && !error && (
                <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">No hay registros para esta materia.</p>
                </div>
            )}

            {!isLoading && alumnosActivos.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center">
                        <UserCheck className="w-5 h-5 mr-2" /> Alumnos Cursando ({alumnosActivos.length})
                    </h3>
                    <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-green-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-green-800 uppercase tracking-wider">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {alumnosActivos.map((alumno, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{alumno.nombre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">Activo</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {!isLoading && alumnosBaja.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center">
                        <UserMinus className="w-5 h-5 mr-2" /> Historial de Bajas ({alumnosBaja.length})
                    </h3>
                    <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg opacity-75">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-red-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">Nombre</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-red-800 uppercase tracking-wider">Fecha de Baja</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {alumnosBaja.map((alumno, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 line-through">{alumno.nombre}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500">
                                            {new Date(alumno.fecha_baja).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReporteInscripciones;