import axios from "./axios";

/**
 * Verifica el acceso al pago.
 * @param {string} token - El token JWT para la autorización.
 * @param {object} data - Los datos que se enviarán en la solicitud.
 * @returns {Promise} - La promesa de la solicitud axios.
 */
export const validateAccess = async (token, data) => {
    try {
        const response = await axios.post(
            `/auth/verify`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error en la solicitud');
    }
};
