import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import apiClient from './SharedApi';
import Boton from './Boton';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuthStore();
    if (isAuthenticated) {
        navigate('/materias');
    }

    const [mail, setMail] = useState(''); 
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await apiClient.post('/usuario/login', { mail, contrasena });
            
            const newToken = response.data.result.token;
            const userData = {
                id: response.data.result.id,
                nombre: response.data.result.nombre,
                usuario: response.data.result.usuario,
                rol_id: response.data.result.rol_id,
            };

            login(newToken, userData); 
            navigate('/materias');

        } catch (error) {
            console.error('Error de Login:', error.response?.data?.mensaje || error.message);
            setError(error.response?.data?.mensaje || 'Error al iniciar sesión. Verifica credenciales.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center pt-20 bg-gray-50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 bg-white shadow-xl rounded-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Iniciar Sesión</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Correo Electrónico</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        required
                        placeholder="mail@ejemplo.com"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Contraseña</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        required
                        placeholder="********"
                    />
                </div>
                
                {error && <p className="text-red-600 text-sm mb-4 bg-red-100 p-2 rounded-md">{error}</p>}

                <Boton
                    label={isLoading ? 'Conectando...' : 'Entrar'}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full justify-center"
                />
            </form>
        </div>
    );
}

export default LoginComponent;