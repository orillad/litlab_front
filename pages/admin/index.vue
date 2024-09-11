<template>
  <div v-if="isLoading" class="flex justify-center items-center h-screen">
    <p class="text-lg">Loading...</p>
  </div>
  <div v-else>
    <h1 class="text-3xl font-semibold mb-6">Admin Dashboard</h1>
    <div class="grid grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold">Total Customers</h2>
        <p class="mt-4 text-gray-600">{{ customers.length }} customers</p>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-bold">Total Purchases</h2>
        <p class="mt-4 text-gray-600">{{ purchases.length }} purchases</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { getAllCustomers } from '~/api/customers';
import { getPurchases } from '~/api/purchases';
import { isAuthenticated } from '~/api/auth'; // Importa la función de autenticación

// State variables
const customers = ref([]);
const purchases = ref([]);
const isLoading = ref(true); // Estado de carga

// Verifica la autenticación y carga los datos si el usuario está autenticado
const checkAuthAndLoadData = async () => {

    try {
      customers.value = await getAllCustomers();
      purchases.value = await getPurchases();
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      isLoading.value = false; // Finaliza el estado de carga
    
  }
};

onBeforeMount(() => {
  checkAuthAndLoadData();
});

definePageMeta({
  layout: 'admin', // Define el layout de administración
  middleware: 'admin' // Aplica el middleware de autenticación
});
</script>

<style scoped>
/* Optional styles */
</style>
