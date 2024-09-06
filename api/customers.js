// litlab_front/api/customers.js

import axios from '~/api/axios'; // Asegúrate de que la ruta sea correcta

// Obtener todos los clientes
export const getAllCustomers = async () => {
    try {
        const response = await axios.get('/api/customers');
        return response.data;
    } catch (e) {
        console.error('Error fetching customers:', e);
        throw e;
    }
};

// Obtener todos los clientes
export const findCustomerById = async (id) => {
    try {
        const response = await axios.get(`/api/customers/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error fetching customers by id:', e);
        throw e;
    }
};

// Agregar un nuevo cliente
export const addCustomer = async (customerData) => {
    try {
        const response = await axios.post('/api/customers', customerData);
        return response.data;
    } catch (e) {
        console.error('Error adding customer:', e);
        throw e;
    }
};



// Actualizar un cliente existente
export const updateCustomer = async (id, customerData) => {
    try {
        const response = await axios.put(`/api/customers/${id}`, customerData);
        return response.data;
    } catch (e) {
        console.error('Error updating customer:', e);
        throw e;
    }
};

// Eliminar un cliente
export const deleteCustomer = async (id) => {
    try {
        const response = await axios.delete(`/api/customers/${id}`);
        return response.data;
    } catch (e) {
        console.error('Error deleting customer:', e);
        throw e;
    }
};
