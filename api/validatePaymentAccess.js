// litlab_front/api/validatePaymentAccess.js

import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

const validatePaymentAccess = async (bookId, token) => {
    try {
        const response = await axios.post('/api/validate-payment-access', { bookId, token });
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.error('Error validating payment accessssss:', error);
        throw new Error('Error validating payment access');
    }
};

export default validatePaymentAccess;
