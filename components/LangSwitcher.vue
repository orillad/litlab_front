<template>
  <div class="relative inline-block text-left">
    <button @click="toggleDropdown" type="button" class="inline-flex items-center text-sm font-medium  hover:text-secondary focus:outline-none" id="options-menu" aria-haspopup="true" aria-expanded="true">
      {{ currentLangName }}
      <svg class="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-show="dropdownOpen" class="text-center origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-secondary ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        <div class="py-1" role="none">
          <a
            v-for="lang in languages"
            :key="lang.code"
            @click="switchLanguage(lang.code)"
            :class="{
              'bg-secondary text-black': currentLang === lang.code,
              'text-black': currentLang !== lang.code
            }"
            class="block px-4 py-2 text-sm cursor-pointer hover:bg-secondary_active"
            role="menuitem"
          >
            {{ lang.name }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, setLocale } = useI18n();

const languages = [
    { code: 'ca', name: 'Català' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

const currentLang = ref(locale.value);
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const switchLanguage = (lang) => {
  currentLang.value = lang;
  locale.value = lang;
  dropdownOpen.value = false;
  setLocale(lang);

};

const currentLangName = computed(() => {
  return languages.find(lang => lang.code === currentLang.value)?.name;
});
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
