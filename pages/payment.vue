<!-- payment -->
<template>
  <div v-if="isValidAcces">
    <div class="container">
      <div class="mx-auto flex flex-col md:flex-row items-center md:items-start justify-center py-8 px-4">
        <div class="text-center md:text-left md:w-1/2 md:pr-12">
          <h1 class="text-5xl font-bold mb-4">{{ $t('payment.title') }}</h1>
        </div>
      </div>

      <div class="mx-auto flex flex-col md:flex-row items-start justify-center py-8 px-4">
        <div class="md:w-1/2 md:pr-12">
          <form id="payment-form" @submit.prevent="handleSubmit">
            <h2 class="text-2xl font-bold mb-4">{{ $t('payment.shippingAddress') }}</h2>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-white">{{ $t('payment.firstName') }}</label>
                <input type="text" id="firstName" required v-model="firstName" placeholder="Juan"
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-white">{{ $t('payment.lastName') }}</label>
                <input type="text" id="lastName" required v-model="lastName" placeholder="Martin Lopez"
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-white">{{ $t('payment.email') }}</label>
                <input type="email" id="email" v-model="email" required placeholder="example@gmail.com"
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-white">{{ $t('payment.phone') }}</label>
                <input type="tel" id="phone" v-model="phone" required placeholder="+34 xxx xxx xxx"
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="country" class="block text-sm font-medium text-white">{{ $t('payment.country') }}</label>
                <input type="text" id="country" v-model="country" required
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="state" class="block text-sm font-medium text-white">{{ $t('payment.state') }}</label>
                <input type="text" id="state" v-model="state" required
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="postalCode" class="block text-sm font-medium text-white">{{ $t('payment.postalCode') }}</label>
                <input type="text" id="postalCode" v-model="postalCode" required
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
              <div>
                <label for="address" class="block text-sm font-medium text-white">{{ $t('payment.address') }}</label>
                <input type="text" id="address" v-model="address" required
                  class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
              </div>
            </div>
            <button type="submit" class="bg-secondary text-black rounded p-2 w-full">{{ $t('payment.submitButton') }}</button>
            <div id="card-errors" role="alert" class="text-red-500 mt-2"></div>
          </form>
        </div>

        <div class="md:w-1/2 md:pl-12">
          <div class="border p-4 rounded-lg mb-4">
            <h2 class="text-xl font-bold mb-2">{{ $t('payment.paymentSummary') }}</h2>
            <p><strong>{{ $t('payment.product') }}</strong> Libro 15 P</p>
            <p><strong>{{ $t('payment.total') }}</strong> 25,00€</p>
          </div>
          <img src="~/assets/images/logo_1.svg" alt="Imagen de muestra" class="mx-auto rounded-lg">
        </div>
      </div>
    </div>
  </div>
  
  <div v-else>
    <div class="flex items-center justify-center h-screen">
      <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <p class="text-white ml-4">{{ $t('validatingAccess') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import processBook from '~/api/process-book.js';
import downloadBook from '~/api/download.js'; 
import axios from '~/api/axios';
import validatePaymentAccess from '~/api/validatePaymentAccess';
import checkout from '~/api/checkout';
import { getPurchasesById } from '~/api/purchases';

const route = useRoute();
const bookName = route.query.bookName; // Extrae el bookId de la URL
const currentUrl = route.fullPath;

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const country = ref('');
const state = ref('');
const postalCode = ref('');
const address = ref('');

const price = 10;
const isValidAcces = ref(false);
const isLoading = ref(true); // Nuevo estado para controlar la carga

const validateAccess = async () => {
  const token = localStorage.getItem('jwt');

  if (!bookName || !token) {
    window.location.href = '/form'; // Redirige a una página de error
    return;
  }

  try {
    const isValid = await validatePaymentAccess(bookName, token);
    if (isValid) {
      isValidAcces.value = true;
    } else {
      window.location.href = '/error'; // Redirige si no es válido
    }
  } catch (error) {
    console.error('Error validating payment access:', error);
    window.location.href = '/error'; // Redirige en caso de error
  } finally {
    isLoading.value = false; // Ocultar spinner después de la validación
  }
};

onMounted(async () => {
  if (route.query.payment === 'true' && checkPayment(route.query.purchaseId)) {
    await downloadBook(bookName); 
    localStorage.removeItem('jwt'); 
    window.location.href = '/';
  }
  validateAccess();
});

const checkPayment = async (purchaseId) => {
  const result = await getPurchasesById(purchaseId);
  return result.payment_state == 'payment_done';
}

const handleSubmit = async () => {
  try {
    const customerInfo = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      mobile_phone: phone.value,
      country: country.value,
      state_province: state.value,
      postal_code: postalCode.value,
      shipping_address: address.value,
    };

    console.log("Processing payment...");
    const result = await processBook(bookName, customerInfo);

    if (result.success) {
      const payment = await checkout(price, currentUrl, result.purchaseId);
    } else {
      console.error(result.message);
      document.getElementById('card-errors').innerText = result.message;
    }

    document.getElementById('card-errors').innerText = 'El pago no se completó correctamente.';
  } catch (error) {
    console.error('Error processing payment:', error);
    document.getElementById('card-errors').innerText = 'Ocurrió un error durante el procesamiento del pago.';
  }
};

</script>

<style scoped>
/* Agrega estilos para el spinner si es necesario */
</style>
