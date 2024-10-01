import axios from '~/api/axios'; // Asegúrate de que la ruta sea correcta

// Crear una nueva compra
export const createPurchase = async (purchaseData) => {
    try {
        const response = await axios.post('/api/purchases', purchaseData);
        return response.data;
    } catch (e) {
        console.error('Error creating purchase:', e);
        throw e;
    }
};

// Obtener todas las compras 
export const getPurchases = async () => {
    try {
        const response = await axios.get(`/api/purchases`);
        return response.data;
    } catch (e) {
        console.error('Error fetching purchases:', e);
        throw e;
    }
};


// Obtener todas las compras de un cliente
export const getPurchasesByCustomer = async (customerId) => {
    try {
        const response = await axios.get(`/api/purchases/customer/${customerId}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching purchases:', e);
        throw e;
    }
};

//  todas las compras de un cliente
export const getPurchasesById = async (purchaseId) => {
    try {
        const response = await axios.get(`/api/purchases/${purchaseId}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching purchases:', e);
        throw e;
    }
};

// Obtener un PDF asociado a una compra
export const getPdfByPurchase = async (pdf_id) => {
    try {
        const response = await axios.get(`/book/download-book/${pdf_id}`, {
            responseType: 'blob' // Asegúrate de que el servidor responda con tipo 'blob' para archivos
        });
        return response.data;
    } catch (e) {
        console.error('Error fetching PDF:', e);
        throw e;
    }
};

// Actualizar una compra
export const updatePurchase = async (id, purchaseData) => {
    try {
        const response = await axios.put(`/api/purchases/${id}`, purchaseData);
        return response.data;
    } catch (e) {
        console.error('Error updating purchase:', e);
        throw e;
    }
};

// Eliminar una compra
export const deletePurchase = async (id) => {
    try {
        await axios.delete(`/api/purchases/${id}`);
    } catch (e) {
        console.error('Error deleting purchase:', e);
        throw e;
    }
};
