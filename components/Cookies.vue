<template>
    <div v-if="showBanner" class="fixed bottom-8 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div class="text-center">
        <p class="text-sm md:text-base text-gray-800 mb-4">
          {{ $t('cookiesBanner.message') }} 
          <a href="/privacity" class="underline text-primary hover:text-primary_hovered">{{ $t('cookiesBanner.moreInfo') }}</a>
        </p>
        <button @click="acceptCookies" class="bg-primary hover:bg-primary_hovered text-white font-semibold py-2 px-6 rounded-full">
          {{ $t('cookiesBanner.accept') }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Mostrar u ocultar el banner
  const showBanner = ref(false);
  
  // Función para aceptar cookies
  const acceptCookies = () => {
    showBanner.value = false;
    localStorage.setItem('cookiesAccepted', 'true');
  };
  
  // Comprobar si el usuario ya aceptó las cookies
  onMounted(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      showBanner.value = true;
    }
  });
  </script>
  