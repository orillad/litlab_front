import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

const dalle = async (prompt) => {
    try {
        const response = await axios.post('/gpt/dalle', { prompt }, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (e) {
        console.log("ERROR:");
        console.log(e);
        return e;
    }
};

export default dalle; // Asegúrate de que `default` export esté aquí
