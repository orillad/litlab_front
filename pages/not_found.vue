<template>
    <div class="container mx-auto flex flex-col items-center justify-center py-8 px-4">
      <div class="text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          {{ $t("notFound.title") }}
        </h1>
        <p class="text-base md:text-lg mb-8">{{ $t("notFound.message") }}</p>
        
        <div class="flex flex-col md:flex-row items-center justify-center">
          <button
            class="bg-secondary hover:bg-secondary_hovered/95 text-black active:bg-secondary_active px-6 py-3 rounded-full font-semibold mb-4 md:mb-0 md:mr-4 inline-flex items-center justify-center w-full md:w-auto"
            @click="goHome"
          >
            <span>{{ $t("notFound.goHome") }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  function goHome() {
    window.location.href = '/';
  }
  
  definePageMeta({
    layout: 'default',
  });
  </script>
  
  <style scoped>
  .container {
    background-color: #113A3A;
  }
  </style>
  