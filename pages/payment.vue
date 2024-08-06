<template class="container">
    <div class="mx-auto flex flex-col md:flex-row items-center md:items-start justify-center py-8 px-4">
        <div class="text-center md:text-left md:w-1/2 md:pr-12">
            <h1 class="text-5xl font-bold mb-4">¡Ya casi tienes el libro de tus sueños!</h1>
        </div>
    </div>

    <div class="mx-auto flex flex-col md:flex-row items-start justify-center py-8 px-4">
        <div class="md:w-1/2 md:pr-12">
            <form id="payment-form" @submit.prevent="handleSubmit">
                <h2 class="text-2xl font-bold mb-4">Dirección de envío</h2>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label for="firstName" class="block text-sm font-medium text-white">Nombre</label>
                        <input type="text" id="firstName" required v-model="firstName" placeholder="Juan" class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
                    </div>
                    <div>
                        <label for="lastName" class="block text-sm font-medium text-white">Apellidos</label>
                        <input type="text" id="lastName" required v-model="lastName" placeholder="Martin Lopez" class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary" />
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-white">Correo Electrónico</label>
                        <input type="email" id="email" v-model="email" required placeholder="example@gmail.com" class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary"/>
                    </div>
                    <div>
                        <label for="phone" class="block text-sm font-medium text-white">Teléfono móvil</label>
                        <input type="tel" id="phone" v-model="phone" required  placeholder="+34 xxx xxx xxx" class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary"/>
                    </div>
                    <div>
                        <label for="country" class="block text-sm font-medium text-white">País</label>
                        <input type="text" id="country" v-model="country" required class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary"/>
                    </div>
                    <div>
                        <label for="state" class="block text-sm font-medium text-white">Provincia</label>
                        <input type="text" id="state" v-model="state" required class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary"/>
                    </div>
                    <div>
                        <label for="postalCode" class="block text-sm font-medium text-white">CP</label>
                        <input type="text" id="postalCode" v-model="postalCode" required class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary"/>
                    </div>
                    <div>
                        <label for="address" class="block text-sm font-medium text-white">Dirección de envío</label>
                        <input type="text" id="address" v-model="address" required class="mt-1 block w-full p-2 border rounded-full bg-primary_button border-secondary"/>
                    </div>
                </div>
                <div id="card-element" class="my-4">
                    <!-- A Stripe Element will be inserted here. -->
                </div>
                <button type="submit" class="bg-secondary text-black rounded p-2 w-full">Paga tu libro</button>
                <div id="card-errors" role="alert" class="text-red-500 mt-2"></div>
            </form>
        </div>

        <div class="md:w-1/2 md:pl-12">
            <div class="border p-4 rounded-lg mb-4">
                <h2 class="text-xl font-bold mb-2">Resumen del pago</h2>
                <p><strong>Producto:</strong> Libro 15 P</p>
                <p><strong>Total:</strong> 25,00€</p>
            </div>
            <img src="~/assets/images/logo_1.svg" alt="Imagen de muestra" class="mx-auto rounded-lg">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PiI7KGVwZDUA61vva29yqBjosfBoQDEOrdJJE4Ug6yLQVy0qxiyAEPsscMgS7BZOocB00blfgHPZwJroynB2Eo500RSp8pPod');

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const phone = ref('');
const country = ref('');
const state = ref('');
const postalCode = ref('');
const address = ref('');

const handleSubmit = async (event) => {
    const stripe = await stripePromise;
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
            name: `${firstName.value} ${lastName.value}`,
            email: email.value,
            phone: phone.value,
            address: {
                country: country.value,
                state: state.value,
                postal_code: postalCode.value,
                line1: address.value,
            },
        },
    });

    if (error) {
        console.error(error);
    } else {
        console.log(paymentMethod);
    }
};

onMounted(() => {
    const stripe = stripePromise;
    stripe.then((stripe) => {
        const elements = stripe.elements();
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');
    });
});
</script>

<style scoped>
/* Añadir estilos aquí si es necesario */
</style>
