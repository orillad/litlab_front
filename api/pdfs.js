import axios from '~/api/axios'; // Asegúrate de que la ruta sea correcta


// Añadir un PDF
export const addPdf = async (bookId, pdfFile) => {
    try {
        // Crear un objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('bookId', bookId);

        // Enviar el archivo al servidor
        const response = await axios.post('/api/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (e) {
        console.error('Error adding PDF:', e);
        throw e;
    }
};

// Obtener todos los PDFs
export const getAllPdfs = async () => {
    try {
        const response = await axios.get('/api/pdfs');
        return response.data;
    } catch (e) {
        console.error('Error fetching PDFs:', e);
        throw e;
    }
};

// Obtener un PDF por ID
export const getPdfById = async (id) => {
    try {
        const response = await axios.get(`/api/pdfs/id/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching PDF:', e);
        throw e;
    }
};


