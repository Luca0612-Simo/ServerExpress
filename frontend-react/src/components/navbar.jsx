import React from 'react';
import { LogOut, BookOpen, LogIn, Home, ListTodo } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const NavLink = ({ to, label, icon: Icon, currentPath }) => {
    const isActive = currentPath === to;
    const baseClasses = "px-3 py-1.5 text-sm font-medium rounded-lg transition duration-150 flex items-center";
    const activeClasses = "bg-indigo-100 text-indigo-700 font-semibold";
    const inactiveClasses = "text-gray-600 hover:bg-gray-100";

    return (
        <Link
            to={to}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            <Icon className="w-4 h-4 mr-1" />
            {label}
        </Link>
    );
};

function Navbar() {
    const { user, isAuthenticated, logout } = useAuthStore();
    const isAlumno = user?.rol_id === 3; 
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="w-full bg-white shadow-md sticky top-0 z-10">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Link to="/" className="text-2xl font-extrabold text-indigo-600">
                    TP Integrador
                </Link>
                <div className="flex items-center space-x-4">
                    {isAuthenticated ? (
                        <>
                            <NavLink 
                                icon={Home}
                                label="Dashboard"
                                currentPath={currentPath}
                                to="/"
                            />
                            {}
                            {isAlumno && (
                                <NavLink 
                                    icon={ListTodo} 
                                    label="Mis Materias" 
                                    currentPath={currentPath} 
                                    to="/mis-materias" 
                                />
                            )}
                            <NavLink 
                                icon={BookOpen} 
                                label="Materias" 
                                currentPath={currentPath} 
                                to="/materias" 
                            />
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-150 flex items-center"
                            >
                                <LogOut className="w-4 h-4 mr-1" /> 
                                Salir ({user?.usuario || 'Cargando...'})
                            </button>
                        </>
                    ) : (
                        <NavLink 
                            icon={LogIn} 
                            label="Login" 
                            currentPath={currentPath} 
                            to="/login" 
                        />
                    )}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;