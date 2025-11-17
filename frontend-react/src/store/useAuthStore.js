import { create } from 'zustand';
import apiClient from '../components/SharedApi'; 

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: true,
};

const useAuthStore = create((set) => ({
    ...initialState,
    login: (newToken, userData) => {
        localStorage.setItem('token', newToken);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;

        set({
            user: userData,
            token: newToken,
            isAuthenticated: true,
            loading: false,
        });
    },

    logout: () => {
        localStorage.removeItem('token');
        delete apiClient.defaults.headers.common['Authorization'];
        set(initialState);
    },

    setLoading: (isLoading) => set({ loading: isLoading }),
    initializeAuth: (user, token) => {
        if (token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        set({ user: user, token: token, isAuthenticated: !!token, loading: false });
    }
}));

export default useAuthStore;