import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import useAuthStore from './store/useAuthStore';
import apiClient from './components/SharedApi';
import LoginComponent from './components/Login';
import MateriasComponent from './components/Materias';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';

const AppContent = () => {
    const { token, isAuthenticated, setLoading, initializeAuth, logout } = useAuthStore();
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

        validateTokenAndInitialize(storedToken);
    }, [initializeAuth, logout, navigate]); 

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);


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
                            <Route path="*" element={<Dashboard />} />
                        </>
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