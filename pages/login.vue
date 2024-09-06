<template>
    <div class="flex items-center justify-center min-h-screen">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl text-black font-bold mb-6 text-center">{{ $t("login.title") }}</h1>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">{{ $t("login.email") }}</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">{{ $t("login.password") }}</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          </div>
  
          <div>
            <button
              type="submit"
              class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary_hovered focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {{ $t("login.submit") }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  const errors = ref({ email: '', password: '' });
  
  const handleSubmit = () => {
    errors.value = { email: '', password: '' }; // Reset errors
    
    if (!email.value) {
      errors.value.email = 'Email is required';
    }
    
    if (!password.value) {
      errors.value.password = 'Password is required';
    }
    
    if (!errors.value.email && !errors.value.password) {
      // Implement the login logic here
      console.log('Email:', email.value);
      console.log('Password:', password.value);
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  