import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

const dalle = async (prompt) => {
    try {
        const response = await axios.post('/gpt/dalle', { prompt });
        if (response.data && response.data.imageUrl) {
            return response.data.imageUrl;
        }
    } catch (e) {
        console.log("ERRRORRRRR");
        console.log(e);
        return e;
    }
};

export default dalle; // Asegúrate de que `default` export esté aquí
