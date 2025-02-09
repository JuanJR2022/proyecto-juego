import axios from 'axios';
import Environment from "../../../shared/Environment";

// Función para obtener el token, por ejemplo desde localStorage o contexto
const getToken = () => {
  return localStorage.getItem('authToken'); // Ajusta esto según dónde almacenes el token
};

const apiClient = axios.create({
  baseURL: `${Environment.getDomainAdminInventory()}/api`, // Cambia esto a la URL base de tu servidor
});

// Interceptor para agregar el token a los headers de cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;