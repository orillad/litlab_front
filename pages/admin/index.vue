<template>
    <div>
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
  import { ref, onMounted } from 'vue';
  import { getAllCustomers } from '~/api/customers';
  import { getPurchases } from '~/api/purchases';
  
  // State variables
  const customers = ref([]);
  const purchases = ref([]);
  
  // Load customers and purchases on page mount
  const loadData = async () => {
    try {
      customers.value = await getAllCustomers();
      purchases.value = await getPurchases();
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };
  
  onMounted(() => {
    loadData();
  });
  
  definePageMeta({
    layout: 'admin', // Define the admin layout
  });
  </script>
  
  <style scoped>
  /* Optional styles */
  </style>
  