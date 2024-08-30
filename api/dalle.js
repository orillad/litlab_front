import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

const dalle = async (prompt) => {
    try {
        // Hacer la solicitud POST al endpoint con el prompt
        const response = await axios.post('/gpt/dalle', { prompt });

        // Extraer la URL de la imagen del objeto JSON recibido
        const { imageUrl } = response.data;

        // Retornar la URL de la imagen
        return imageUrl;
    } catch (e) {
        // Manejar errores y mostrar en la consola
        console.log("ERROR:");
        console.log(e);
        return e;
    }
};

export default dalle; // Asegúrate de que `default` export esté aquí
