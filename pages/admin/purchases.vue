<template>
  <div class="overflow-x-auto">
    <h1 class="text-2xl font-semibold mb-4">Purchases Management</h1>

    <!-- Filtros -->
    <div class="mb-4 flex flex-col sm:flex-row sm:space-x-4">
      <input v-model="filters.firstName" type="text" placeholder="First Name" class="p-2 border border-gray-300 rounded mb-2 sm:mb-0"/>
      <input v-model="filters.lastName" type="text" placeholder="Last Name" class="p-2 border border-gray-300 rounded mb-2 sm:mb-0"/>
      <input v-model="filters.email" type="text" placeholder="Email" class="p-2 border border-gray-300 rounded mb-2 sm:mb-0"/>
      <input v-model="filters.fromDate" type="date" placeholder="From Date" class="p-2 border border-gray-300 rounded mb-2 sm:mb-0"/>
      <input v-model="filters.toDate" type="date" placeholder="To Date" class="p-2 border border-gray-300 rounded"/>
    </div>

    <table class="min-w-full bg-white rounded-lg shadow text-sm">
      <thead>
        <tr class="bg-gray-100 border-b">
          <th class="text-left p-2">ID</th>
          <th class="text-left p-2">Customer ID</th>
          <th class="text-left p-2">First Name</th>
          <th class="text-left p-2">Last Name</th>
          <th class="text-left p-2">Email</th>
          <th class="text-left p-2">Mobile Phone</th>
          <th class="text-left p-2">Country</th>
          <th class="text-left p-2">State/Province</th>
          <th class="text-left p-2">Postal Code</th>
          <th class="text-left p-2">Shipping Address</th>
          <th class="text-left p-2">Purchase Date</th>
          <th class="text-left p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="purchase in filteredAndPaginatedPurchases" :key="purchase.id" class="border-b">
          <td class="p-2">{{ purchase.id }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.id : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.first_name : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.last_name : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.email : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.mobile_phone : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.country : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.state_province : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.postal_code : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.customer ? purchase.customer.shipping_address : 'Loading...' }}</td>
          <td class="p-2">{{ purchase.purchase_date }}</td>
          <td class="p-2">
            <button @click="viewPurchasePdf(purchase.pdf_id)" class="text-green-500 hover:text-green-700 text-xs">View PDF</button>
            <button @click="deletePurchaseById(purchase.id)" class="ml-2 text-red-500 hover:text-red-700 text-xs">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="flex items-center justify-center mt-4 space-x-2">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-600">
        <span>&laquo;</span>
      </button>
      <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-4 py-2 text-white bg-blue-500 rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-600">
        <span>&raquo;</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getPurchases, deletePurchase, getPdfByPurchase } from '~/api/purchases';
import { findCustomerById } from '~/api/customers';
import downloadBook from '~/api/download';
import { getPdfById } from '~/api/pdfs';

const purchases = ref([]);
const filters = ref({
  firstName: '',
  lastName: '',
  email: '',
  fromDate: '',
  toDate: ''
});
const currentPage = ref(1);
const pageSize = 10; // Number of items per page

// Load purchases from API
const loadPurchases = async () => {
  try {
    purchases.value = await getPurchases();
    await loadCustomerDetails();
  } catch (error) {
    console.error('Failed to load purchases:', error);
  }
};

// Load customer details for cada compra
const loadCustomerDetails = async () => {
  for (let purchase of purchases.value) {
    if (!purchase.customer) {
      try {
        const data = await findCustomerById(purchase.customer_id);
        purchase.customer = data.customer[0];
      } catch (error) {
        console.error('Failed to load customer details:', error);
      }
    }
  }
};

const deletePurchaseById = async (id) => {
  try {
    await deletePurchase(id);
    purchases.value = purchases.value.filter(purchase => purchase.id !== id);
  } catch (error) {
    console.error('Failed to delete purchase:', error);
  }
};

// View the PDF of a purchase
const viewPurchasePdf = async (pdfId) => {
  try {
    const bookid = await getPdfById(pdfId);
    console.log(bookid.title);
    downloadBook(bookid.title);
  } catch (error) {
    console.error('Failed to load PDF:', error);
  }
};

// Filter and paginate purchases
const filteredPurchases = computed(() => {
  const fromDate = filters.value.fromDate ? new Date(filters.value.fromDate) : null;
  const toDate = filters.value.toDate ? new Date(filters.value.toDate) : null;

  return purchases.value.filter(purchase => {
    const matchesFirstName = purchase.customer ? purchase.customer.first_name.toLowerCase().includes(filters.value.firstName.toLowerCase()) : true;
    const matchesLastName = purchase.customer ? purchase.customer.last_name.toLowerCase().includes(filters.value.lastName.toLowerCase()) : true;
    const matchesEmail = purchase.customer ? purchase.customer.email.toLowerCase().includes(filters.value.email.toLowerCase()) : true;
    
    const purchaseDate = new Date(purchase.purchase_date);
    const matchesDateRange = (!fromDate || purchaseDate >= fromDate) && (!toDate || purchaseDate <= toDate);

    return matchesFirstName && matchesLastName && matchesEmail && matchesDateRange;
  });
});

const filteredAndPaginatedPurchases = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredPurchases.value.slice(start, start + pageSize);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPurchases.value.length / pageSize);
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
  loadPurchases();
});

definePageMeta({
  layout: 'admin', // Define the admin layout
});
</script>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
