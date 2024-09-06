// ~/api/payment.js

import axios from '~/api/axios'; // Asegúrate de que esta ruta sea correcta

const processPayment = async (bookId, customerInfo) => {
    try {
        const response = await axios.post('/book/process-payment', {
            bookId,
            customerInfo,
        });
        console.log("respone:", response.data);
        
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};


export default processPayment; // Asegúrate de que `default` esté aquí
