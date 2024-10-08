<template>
  <Header/>
  <main class="container">
    <slot></slot>
    <Cookies/>
      </main>
  
    <Footer/>
    
  </template>
  
  <script setup>
import Cookies from '~/components/Cookies.vue';

  </script>