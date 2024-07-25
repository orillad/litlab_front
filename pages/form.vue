<template>
  <!-- <img src="~/assets/images/maquina.svg" alt="typewriter" class="mt-28 w-1/4 float-left"> -->

  <div class="max-w-2xl mx-auto p-4 text-center">

    <form @submit.prevent="submitForm">

      <h1 class="text-5xl font-bold mb-8">1.</h1>
      <h1 class="text-5xl font-bold mb-8">¿De que tematica es tu libro?</h1>


      <label class="block mb-6">¿És un libro infantil?</label>
      <div class="flex justify-center items-center space-x-40 mb-16">
        <label class="flex items-center space-x-4">
          <span>Si</span>
          <input type="radio" class="form-checkbox" value="yes" v-model="isChildrensBook">
        </label>
        <label class="flex items-center space-x-4">
          <span>No</span>
          <input type="radio" class="form-checkbox" value="no" v-model="isChildrensBook">
        </label>
      </div>

      <div class="flex flex-col items-center space-y-4 mb-16">
        <label class="block mb-6">¿Cuántas unidades quieres?</label>
        <select id="units" class="bg-secondary border text-center text-black text-sm rounded-full block w-32 p-2.5"
          v-model="selectedUnits">
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <img class="pt-10" src="~/assets/images/down_arrow.svg" alt="">
      </div>

      <h1 class="text-5xl font-bold mb-8">2.</h1>
      <h1 class="text-5xl mb-8">Todo libro requiere <b class="text-secondary">su protagonista. </b></h1>

      <div class="flex flex-col items-center space-y-4 mb-16">
        <label class="block mb-6 text-center">Añade los nombres de los protagonistas de tu historia.</label>
        <div v-for="(protagonist, index) in protagonists" :key="index" class="flex items-center space-x-4 mb-4 w-80">
          <input type="text"
            class="form-input text-white text-center border bg-primary_button border-secondary rounded-full flex-1 px-4 py-2"
            v-model="protagonists[index]" placeholder="Nombre del protagonista" />
          <button type="button" @click="removeProtagonist(index)" class="flex-shrink-0">
            <img src="~/assets/images/trash.svg" alt="Eliminar" class="h-5 w-5">
          </button>
        </div>
        <button type="button" @click="addProtagonist"
          class="bg-secondary font-bold text-black px-4 py-2 rounded-full w-80 mt-4">
          Añadir Personaje
        </button>
        <img class="pt-10" src="~/assets/images/down_arrow.svg" alt="">
      </div>

      <h1 class="text-5xl font-bold mb-8">3.</h1>
      <h1 class="text-5xl mb-8">Resumenos <b class="text-secondary">Tu historia en un màximo de </b> <b>300
          palabras.</b></h1>

      <div class="flex flex-col items-center space-y-4 mb-16">
        <!-- Área de resumen -->
        <textarea v-model="summary" @input="countWords" placeholder="Escribe aquí tu resumen..." rows="6"
          class="w-full max-w-2xl p-4 border rounded-lg bg-primary_button"></textarea>

        <div class="text-right text-sm text-gray-500 mb-4">
          {{ wordCount }} / 300 palabras
        </div>

        <div class="flex items-center space-x-4 w-full max-w-2xl">
          <input type="text" v-model="title" placeholder="Escribe el título aquí"
            class="flex-auto p-2 border rounded-full bg-primary_button" />
          <button type="button" @click="generateTitle"
            class="bg-secondary text-black flex-auto  px-4 py-2 rounded-full flex-shrink-0">
            Generar Título Automático
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <button type="submit" class="bg-secondary text-black px-6 py-3 rounded-full flex items-center space-x-2">
          <span>GENERAR LIBRO</span>
          <img src="~/assets/images/book.svg" alt="" class="h-6 w-6">
        </button>
      </div>
      <!-- Sección para mostrar la imagen generada -->
      <!-- <div v-if="generatedImageUrl" class="mt-8">
        <h2 class="text-4xl font-bold mb-4">Imagen Generada para el Capítulo:</h2>
        <img :src="generatedImageUrl" alt="Imagen Generada" class="max-w-full rounded-lg shadow-md">
      </div> -->
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import chatGpt from "~/api/chat.js"
import dalle from '~/api/dalle'
import { useI18n } from 'vue-i18n'
import jsPDF from 'jspdf';

const { locale } = useI18n()

const isChildrensBook = ref('no')
const selectedUnits = ref(5)
const protagonists = ref([''])
const summary = ref('')
const title = ref('')
const wordCount = ref(0)

const addProtagonist = () => {
  protagonists.value.push('')
}

const removeProtagonist = (index) => {
  if (protagonists.value.length > 1) {
    protagonists.value.splice(index, 1)
  }
}

const generateTitle = async () => {
  if (summary.value) {
    let combinedSummary = summary.value + "\n Dame un solo titulo para esta historia infantil.";
    console.log(combinedSummary);
    const text = await chatGpt(combinedSummary);
    title.value = text;
  } else {
    console.error('Summary is not defined or has no value');
  }
};

const countWords = () => {
  wordCount.value = summary.value.trim().split(/\s+/).length
  if (wordCount.value > 300) {
    wordCount.value = 300
  }
}

const generatePrompt = () => {
  // Define prompts en función del idioma
  const prompts = {
    en: 'Create a story in English with 10 extensive chapters based on the following details:',
    es: 'Crea un cuento en español con 10 capítulos largos basado en los siguientes detalles:',
    ca: 'Crea un conte en català amb 10 capítols extensos basat en els següents detalls:'
  }

  // Obtén el idioma actual
  const currentLanguage = locale.value

  // Elige el prompt correspondiente
  const languagePrompt = prompts[currentLanguage] || prompts['en']

  return `${languagePrompt}
  - Is it a children's book: ${isChildrensBook.value}
  - Protagonists: ${protagonists.value.join(', ')}
  - Summary: ${summary.value}
  - Suggested title: ${title.value ? title.value : 'No title has been generated yet'}`
}
const generatePDF = (story) =>{
  const doc = new jsPDF();

  doc.text(story, 10, 10);

  doc.save(title.value + '.pdf')
}

const submitForm = async () => {
  const formData = {
    isChildrensBook: isChildrensBook.value,
    selectedUnits: selectedUnits.value,
    protagonists: protagonists.value,
    summary: summary.value,
    title: title.value
  }

  console.log(formData);

  const prompt = generatePrompt();
  console.log('Generated Prompt:', prompt);

  // Call the ChatGPT API to generate the story
  try {
    const response = await chatGpt(prompt);
    console.log('Generated Story:', response);

    generatePDF(response);
    // Handle the generated story here, e.g., display it to the user or save it


    // Generar la imagen para el capítulo
    // const imagePrompt = `Create an image for the following chapter: ${summary.value}`;
    // const imageUrl = await dalle(imagePrompt);
    // console.log(imageUrl)
    // generatedImageUrl.value = imageUrl;

  } catch (error) {
    console.error('Error generating story or image:', error);
  }

}
</script>


<style scoped>
input[type="radio"] {
  @apply appearance-none h-6 w-6 border border-gray-300 rounded-full checked:bg-secondary focus:outline-none;
}

input[type="radio"]:hover {
  @apply bg-secondary_hovered
}

input[type="radio"]:active {
  @apply bg-secondary_active
}

/* Estilos para el estado de chequeo */
input[type="radio"]:checked {
  @apply bg-secondary border-transparent;
}
</style>