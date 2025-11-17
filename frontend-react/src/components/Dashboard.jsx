import React from 'react';
import { Home } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

function Dashboard() {
    const { isAuthenticated, user } = useAuthStore();
    
    return (
        <div className="pt-10 text-center">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                Bienvenido al Sistema de Gestión
            </h1>
            <p className="text-xl text-indigo-600 mb-8">TP Integrador</p>
            
            {isAuthenticated ? (
                <div className="p-8 bg-indigo-50 border border-indigo-200 rounded-xl max-w-lg mx-auto shadow-md">
                    <p className="text-lg font-medium text-indigo-800">
                        ¡Hola, {user?.usuario || 'Usuario'}! Estás autenticado.
                    </p>
                    <p className="text-sm text-indigo-600 mt-2">
                        Podes navegar a la sección de Materias o Alumnos usando la barra superior.
                    </p>
                </div>
            ) : (
                <div className="p-8 bg-white border border-gray-300 rounded-xl max-w-lg mx-auto shadow-md">
                    <p className="text-lg text-gray-600 flex items-center justify-center">
                        <Home className="w-5 h-5 mr-2" />
                        Por favor, inicia sesión para acceder a las funcionalidades del sistema.
                    </p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;