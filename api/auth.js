import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

// Función para iniciar sesión como administrador
export const loginAdmin = async (email, password) => {
    console.log("resr");

    try {
        console.log("email", email);
        console.log("passweord", password);
        
        const response = await axios.post('/auth/login', { email, password });
        console.log("response", response.data);

        return response.data.token; // Devuelve el token JWT
    } catch (error) {
        console.error('Error en la autenticación:', error.response ? error.response.data : error.message);
        throw new Error('Error en la autenticación');
    }
};

// Verifica si el usuario está autenticado
export function isAuthenticated() {
    console.log("AUTHHHH");
    
    if (import.meta.client) {
        const token = localStorage.getItem('token');
        console.log("Token en isAuthenticated:", token);
        return !!token;  // Verifica si el token existe
    }
    console.log("FAILED");
    
    return false;
}





export default { loginAdmin, isAuthenticated }; // Asegúrate de que la exportación por defecto esté aquí
