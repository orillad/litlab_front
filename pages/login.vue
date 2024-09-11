<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl text-black font-bold mb-6 text-center">{{ $t("login.title") }}</h1>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">{{ $t("login.email") }}</label>
          <input type="email" id="email" v-model="email"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">{{ $t("login.password") }}</label>
          <input type="password" id="password" v-model="password"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <button type="submit"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hovered focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            {{ $t("login.submit") }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { loginAdmin } from '~/api/auth';


const email = ref('');
const password = ref('');
const errors = ref({ email: '', password: '' });
const loginError = ref('');

const handleSubmit = async () => {
  errors.value = { email: '', password: '' }; // Resetear errores
  loginError.value = ''; // Resetear error de login

  if (!email.value) {
    errors.value.email = 'Email es requerido';
  }

  if (!password.value) {
    errors.value.password = 'Contraseña es requerida';
  }

  if (!errors.value.email && !errors.value.password) {
    try {
      console.log("test");
      
      const token = await loginAdmin(email.value, password.value);
      console.log("token: ", token);
      

      // Guarda el token en localStorage o sessionStorage
      localStorage.setItem('token', token);

      // Redirige a la página de administración
      window.location.href = '/admin';

    } catch (error) {
      loginError.value = 'Credenciales incorrectas';
    }
  }
};
</script>
