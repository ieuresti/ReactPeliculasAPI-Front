import axios from 'axios';
import { obtenerToken } from '../features/seguridad/utilidades/ManejadorJWT';

const clienteAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para agregar el token de autenticación a cada solicitud
clienteAPI.interceptors.request.use((config) => {
    const token = obtenerToken();

    if (token) {
        // Si el token existe, agregarlo al encabezado Authorization de la solicitud
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default clienteAPI;