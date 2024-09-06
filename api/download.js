// ~/api/download.js

import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

const downloadBook = async (bookId) => {
    try {
        // Realiza una solicitud GET para descargar el libro
        const response = await axios.get(`/book/download-book/${bookId}`, {
            responseType: 'blob', // Esto es importante para manejar archivos
        });

        // Crea un enlace para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${bookId}.pdf`); // Nombre del archivo descargado

        // Simula un clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Limpia el enlace y el objeto URL
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading book:', error);
        throw error;
    }
};

export default downloadBook; 
