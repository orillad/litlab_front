<template>
  <header class='flex py-4 px-4 sm:px-10 bg-primary min-h-[80px] tracking-wide relative z-50'>
    <div class='flex flex-wrap items-center gap-5 w-full'>
      <a href="/"><img src="~/assets/images/logo.svg" alt="logo" class='w-40 max-lg:mr-5' /></a>

      <div id="collapseMenu"
        class='max-lg:hidden lg:!flex lg:ml-auto max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>

        <ul
          :class="`lg:flex gap-4 max-lg:space-y-3 max-lg:fixed max-lg:text-center max-lg:rounded-lg max-lg:bg-secondary max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 max-lg:left-1/2 max-lg:translate-x-[-50%] max-lg:top-1/2 max-lg:translate-y-[-50%] ${isOpen ? 'text-primary' : 'text-white'}`">

          <li class='max-lg:py-3 px-3 text-center'>
            <LangSwitcher class=" max-lg:text-primary text-white font-light block text-[15px]" />
          </li>
          <li class='mb-6 hidden max-lg:block text-center'>
            <!-- Contenido opcional -->
          </li>
          <li class='max-lg:py-3 px-3 text-center'>
            <a href='/'
              class='hover:text-secondary max-lg:hover:text-primary max-lg:hover:font-bold text-white max-lg:text-primary font-light block text-[15px] '>{{
                $t('header.home') }}</a>
          </li>
          <li class='max-lg:py-3 px-3 text-center'>
            <a href='javascript:void(0)'
              class='hover:text-secondary text-white max-lg:hover:text-primary max-lg:hover:font-bold max-lg:text-primary font-light block text-[15px]'>{{
                $t('header.products') }}</a>
          </li>
          <li class='max-lg:py-3 px-3 text-center'>
            <a href='about'
              class='hover:text-secondary text-white max-lg:hover:text-primary max-lg:hover:font-bold max-lg:text-primary font-light block text-[15px]'>{{
                $t('header.us') }}</a>
          </li>
          <li v-if="isOpen" class='max-lg:py-3 px-3 text-center'>
            <a href='privacity'
              class='hover:text-secondary text-white max-lg:hover:text-primary max-lg:hover:font-bold max-lg:text-primary font-light block text-[15px]'>{{
                $t('privacyPolicy.title') }}</a>
          </li>
          <li v-if="isOpen" class='mb-6  max-lg:block text-center'>
            <img src="~/assets/images/llibre_maquina1.png" class="w-full" alt="">
          </li>
          <li v-if="isOpen" class="mb-6 max-lg:block text-center">
            <img src="~/assets/images/logo_green.svg" class="w-32 mx-auto" alt="">
          </li>



        </ul>
      </div>

      <div class='flex items-center max-lg:ml-auto space-x-6'>
        <button id="toggleMenu" class='lg:hidden z-[100] rounded-full p-3'>
          <img src="~/assets/images/dropdown.svg" class="w-7" alt="">
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LangSwitcher from './LangSwitcher.vue';

const isOpen = ref(false);

onMounted(() => {
  const toggleMenu = document.getElementById('toggleMenu');
  const collapseMenu = document.getElementById('collapseMenu');

  function handleClick() {
    isOpen.value = !isOpen.value;
    collapseMenu.style.display = isOpen.value ? 'block' : 'none';
  }

  toggleMenu.addEventListener('click', handleClick);
})
</script>

<style scoped>
.svg-fill path {
  fill: black;
}
</style>
