import React, { useState, useEffect } from 'react';
import { GraduationCap, Save } from 'lucide-react';
import apiClient from './SharedApi';
import Boton from './Boton';
import { useNavigate, useParams } from 'react-router-dom';

const CarreraFormComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const isEditing = !!id;

    useEffect(() => {
        if (isEditing) {
            apiClient.get(`/carrera/${id}`)
                .then(res => setNombre(res.data.nombre))
                .catch(() => alert('Error al cargar carrera'));
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) await apiClient.put(`/carrera/${id}`, { nombre });
            else await apiClient.post('/carrera', { nombre });
            
            alert(isEditing ? 'Carrera actualizada' : 'Carrera creada');
            navigate('/gestion-carreras');
        } catch (err) {
            alert('Error al guardar');
        }
    };

    return (
        <div className="flex justify-center pt-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-indigo-600 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3" /> {isEditing ? 'Editar' : 'Crear'} Carrera
                </h2>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Nombre</label>
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full px-4 py-2 border rounded-md" />
                </div>
                <Boton label="Guardar" className="w-full justify-center flex items-center"><Save className="w-4 h-4 mr-2" /> Guardar</Boton>
            </form>
        </div>
    );
}
export default CarreraFormComponent;