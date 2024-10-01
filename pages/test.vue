<template>
  <div>
    <draggable v-model="test">
      <template #item="{element: num}">
        <ul>
          <li class="text-white">{{ num }}</li>
        </ul>
      </template>
    </draggable>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

const test = ref([
  'one',
  'two',
  'three',
  'four'
]);
</script>

<style scoped>
</style>
