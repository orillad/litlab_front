import axios from '~/api/axios'; // Asegúrate de que la ruta sea correcta


// Obtener un PDF por ID
export const getBookById = async (id) => {
    try {
        const response = await axios.get(`/api/books/id/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching PDF:', e);
        throw e;
    }
};


