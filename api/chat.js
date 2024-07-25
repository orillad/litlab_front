// litlabfront/api/chatgpt.js

import axios from '~/api/axios'; // Ensure this path is correct

const chatgpt = async (prompt) => {
    try {
        const response = await axios.post('/gpt/chat', { prompt });
        if (response.data) {
            let cleanTitle = response.data.response;
            cleanTitle = cleanTitle.replace(/^"|"$/g, '');
            cleanTitle = cleanTitle.replace(/\\"/g, '"');
            return cleanTitle;
        }
    } catch (e) {
        console.log(e);
        return e;
    }
};

export default chatgpt; // Ensure `default` export is here
