import axios from '~/api/axios'; // Ensure this path is correct

// Add imagePath as a parameter
const edit = async (prompt, imagePath) => {
    try {
        const response = await axios.post('/gpt/dalle/edit', { prompt, imagePath }, { responseType: 'blob' });
        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (e) {
        console.log("ERROR:");
        console.log(e);
        return e;
    }
};

export default edit; // Ensure `default` export is here
