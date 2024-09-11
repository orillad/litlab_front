// litlab_front/api/generate.js
import axios from '~/api/axios'; // Ensure this path is correct

const generateBook = async (title, chapters, lang) => {
    try {
        console.log('Title:', title); // Verify title.value is correct

        const response = await axios.post('/book/generate-book', {
            title, // Ensure title is a string
            chapters,
            lang
        });

        if (response.data.success) {
            return response.data;
        } else {
            console.error('Server error:', response.data.message || 'Unknown error');
        }
    } catch (error) {
        console.error('An unexpected error occurred:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            console.error('Request made but no response received:', error.request);
        }
    }
};

export default generateBook;
