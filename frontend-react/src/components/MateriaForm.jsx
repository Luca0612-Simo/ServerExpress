import React, { useState, useEffect } from 'react';
import { BookOpen, Save, XCircle } from 'lucide-react';
import apiClient from './SharedApi';
import Boton from './Boton';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const MateriaFormComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthStore();
    const [carreras, setCarreras] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '', carrera_id: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isEditing = !!id; 

    const titulo = isEditing ? 'Editar Materia' : 'Crear Nueva Materia';


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const carrResponse = await apiClient.get('/carrera/');
                const carreraList = carrResponse.data;
                setCarreras(carreraList);
                
                if (isEditing) {
                    const matResponse = await apiClient.get(`/materia/${id}`);
                    const materia = matResponse.data;
                    setFormData({
                        nombre: materia.nombre,
                        carrera_id: materia.carrera_id 
                    });
                } else if (carreraList.length > 0) {
                    setFormData(prev => ({ ...prev, carrera_id: carreraList[0].id }));
                }

            } catch (err) {
                console.error('Error al cargar datos iniciales:', err);
                setError('Error al cargar datos iniciales. Verifica la conexión con Carreras.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
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
            const endpoint = isEditing ? `/materia/${id}` : '/materia'; 
            const method = isEditing ? 'put' : 'post';
            
            const auditField = isEditing ? { usuario_modificacion: user.usuario } : { usuario_alta: user.usuario };

            const dataToSend = { 
                ...formData, 
                carrera_id: parseInt(formData.carrera_id),
                ...auditField 
            };

            const response = await apiClient[method](endpoint, dataToSend);

            alert(response.data.mensaje);
            navigate('/gestion-materias'); 

        } catch (err) {
            console.error("Error al guardar:", err.response?.data);
            setError(err.response?.data?.mensaje || 'Error desconocido al guardar los datos.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-indigo-500">Cargando formulario...</div>;
    
    return (
        <div className="flex items-start justify-center pt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-xl p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-indigo-600 flex items-center">
                    <BookOpen className="w-6 h-6 mr-3" />
                    {titulo}
                </h2>
                
                {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded-md flex items-center"><XCircle className="w-4 h-4 mr-2" />{error}</p>}
              
                {}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Nombre de la Materia</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md" />
                </div>
                
                {}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Carrera</label>
                    <select 
                        name="carrera_id" 
                        value={formData.carrera_id} 
                        onChange={handleChange} 
                        required 
                        className="w-full px-4 py-2 border rounded-md"
                    >
                        {carreras.map(carrera => (
                            <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
                        ))}
                    </select>
                </div>
                
                <Boton
                    label={isEditing ? 'Actualizar Materia' : 'Crear Materia'}
                    onClick={handleSubmit}
                    disabled={isLoading || carreras.length === 0}
                    className="w-full justify-center mt-4 flex items-center"
                >
                    <Save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Actualizar' : 'Crear'} Materia
                </Boton>
            </form>
        </div>
    );
}

export default MateriaFormComponent;