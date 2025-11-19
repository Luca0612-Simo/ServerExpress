import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import apiClient from './components/SharedApi';
import LoginComponent from './components/Login';
import MateriasComponent from './components/Materias';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';
import MisMateriasComponent from './components/MisMaterias';
import AlumnosManagementComponent from './components/AlumnosManagement';
import AlumnoFormComponent from './components/AlumnoForm';
import MateriasManagementComponent from './components/MateriasManagement';
import MateriaFormComponent from './components/MateriaForm';
import ReporteInscripciones from './components/ReporteInscripciones';
import UsuariosManagementComponent from './components/UsuariosManagement';

const AppContent = () => {
    const { token, isAuthenticated, setLoading, initializeAuth, logout, user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        const storedToken = localStorage.getItem('token');

        const validateTokenAndInitialize = async (tkn) => {
            if (!tkn) {
                logout();
                setLoading(false);
                navigate('/login');
                return;
            }

            apiClient.defaults.headers.common['Authorization'] = `Bearer ${tkn}`;

            try {
                const response = await apiClient.get('/usuario/validate');

                const userData = response.data.user;
                initializeAuth(userData, tkn);

            } catch (error) {
                console.error("Token no válido", error.response?.status);
                logout();
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };
        if (isAuthenticated) {
            setLoading(false);
            return;
        }

        validateTokenAndInitialize(storedToken);
    }, [initializeAuth, logout, navigate, isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const canViewReports = user?.rol_id === 1 || user?.rol_id === 2;
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginComponent />} />
                    {isAuthenticated && (
                        <>
                            <Route path="/materias" element={<MateriasComponent />} />
                            <Route path="/mis-materias" element={<MisMateriasComponent />} />
                            <Route path="/alumnos" element={<AlumnosManagementComponent />} />
                            <Route path="/alumnos/crear" element={<AlumnoFormComponent />} />
                            <Route path="/alumnos/editar/:id" element={<AlumnoFormComponent />} />
                            <Route path="/gestion-materias" element={<MateriasManagementComponent />} />
                            <Route path="/gestion-materias/crear" element={<MateriaFormComponent />} />
                            <Route path="/gestion-materias/editar/:id" element={<MateriaFormComponent />} />
                            <Route path="*" element={<Dashboard />} />
                        </>
                    )}
                    {user?.rol_id === 1 && (
                        <Route path="/personal" element={<UsuariosManagementComponent />} />
                    )}
                    {canViewReports && (
                        <Route path="/reportes" element={<ReporteInscripciones />} />
                    )}
                    <Route path="*" element={<Dashboard />} />
                </Routes>
            </main>
        </div>
    );
};

const RootApp = () => (
    <Router>
        <AppContent />
    </Router>
);

export default RootApp;