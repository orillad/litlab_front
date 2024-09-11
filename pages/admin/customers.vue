<template>
  <div>
    <h1 class="text-3xl font-semibold mb-6">Customers Management</h1>
    <table class="min-w-full bg-white rounded-lg shadow">
      <thead>
        <tr class="w-full bg-gray-100 border-b">
          <th class="text-left p-4">ID</th>
          <th class="text-left p-4">First Name</th>
          <th class="text-left p-4">Last Name</th>
          <th class="text-left p-4">Email</th>
          <th class="text-left p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in paginatedCustomers" :key="customer.id" class="border-b">
          <td class="p-4">{{ customer.id }}</td>
          <td class="p-4">{{ customer.first_name }}</td>
          <td class="p-4">{{ customer.last_name }}</td>
          <td class="p-4">{{ customer.email }}</td>
          <td class="p-4">
            <button @click="editCustomer(customer)" class="text-blue-500 hover:text-blue-700">Edit</button>
            <button @click="deleteCustomerById(customer.id)" class="ml-4 text-red-500 hover:text-red-700">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex items-center justify-center mt-4 space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1"
        class="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-600">
        <span>&laquo;</span>
      </button>
      <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-600">
        <span>&raquo;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAllCustomers, deleteCustomer } from '~/api/customers';

const customers = ref([]);
const currentPage = ref(1);
const pageSize = 10; // Number of items per page

// Load customers from API
const loadCustomers = async () => {
  try {
    customers.value = await getAllCustomers();
  } catch (error) {
    console.error('Failed to load customers:', error);
  }
};

// Delete a customer by ID
const deleteCustomerById = async (id) => {
  try {
    await deleteCustomer(id);
    customers.value = customers.value.filter(customer => customer.id !== id);
  } catch (error) {
    console.error('Failed to delete customer:', error);
  }
};

// Edit a customer (Placeholder function)
const editCustomer = (customer) => {
  console.log('Edit customer:', customer);
};

const paginatedCustomers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return customers.value.slice(start, start + pageSize);
});

const totalPages = computed(() => {
  return Math.ceil(customers.value.length / pageSize);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

onMounted(() => {
  loadCustomers();
});

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
});
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
