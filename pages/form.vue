<!-- litlab_front/pages/form.vue -->
<template>
  <div class="relative">
    <img src="~/assets/images/maquina.png" alt="Màquina d'escriure"
      class="absolute left-0 transform w-1/3 sm:w-1/4 sm:top-96 top-96 md:w-1/3 md:top-96 lg:w-1/3 ">
    <img src="~/assets/images/llibre.png" alt="Otra Imagen"
      class="absolute right-0 transform w-1/4 sm:w-1/4 sm:top-[70rem] top-[70rem] md:w-1/4 md:top-[70rem] lg:w-1/4">
  </div>

  <div class="max-w-2xl mx-auto p-4 text-center relative ">


    <form @submit.prevent="submitForm">
      <h1 class="text-5xl font-bold mb-8">{{ $t('form.step1Title') }}</h1>
      <h1 class="text-5xl font-bold mb-8">{{ $t('form.question1') }}</h1>

      <label class="block mb-6">{{ $t('form.isChildrensBook') }}</label>
      <div class="flex justify-center items-center space-x-40 mb-16">
        <label class="flex items-center space-x-4">
          <span>{{ $t('form.yes') }}</span>
          <input type="radio" value="yes" v-model="isChildrensBook">
        </label>
        <label class="flex items-center space-x-4">
          <span>{{ $t('form.no') }}</span>
          <input type="radio" value="no" v-model="isChildrensBook">
        </label>
      </div>



      <div class="flex flex-col items-center space-y-4 mb-16">
        <label class="block text-center mb-6">{{ $t('form.langWant') }}</label>
        <div class="relative">
          <!-- Botón que abre el selector -->
          <button @click.prevent="toggleButton" :class="[
            'flex mx-auto w-64 font-bold bg-secondary text-primary py-2 px-4 leading-tight focus:outline-none focus:text-primary hover:bg-secondary_hovered items-center justify-center space-x-2',
            isPressed ? 'rounded-t-[21px]' : 'rounded-full'
          ]">
            <span>{{ selectedLanguage ? selectedLanguage : $t('form.lang') }}</span>
            <span class="inline-block">
              <img src="~/assets/images/world.svg" alt="world" class="inline-block" />
            </span>
          </button>

          <!-- Menú desplegable para seleccionar idioma -->
          <div v-show="isDropdownOpen" class="absolute w-full bg-white z-10 shadow-lg rounded-b-[21px]">
            <ul>
              <li v-for="(lang, index) in languages" :key="lang" :class="[
                'px-4 py-2 bg-secondary text-black hover:bg-gray-200 cursor-pointer',
                lang === Object.values(languages)[Object.values(languages).length - 1] ? 'rounded-b-[21px]' : 'rounded-none'
              ]" @click="selectLanguage(lang)">
                {{ lang }}
              </li>
            </ul>
          </div>
        </div>
      </div>





      <h1 class="text-5xl font-bold mb-8">{{ $t('form.step2Title') }}</h1>
      <h1 class="text-5xl mb-8">{{ $t('form.bookNeedsProtagonist') }}</h1>

      <div class="flex flex-col items-center space-y-4 mb-16">
        <label class="block mb-6 text-center">{{ $t('form.totalCharacters') }}</label>
        <!-- <div class="flex items-center space-x-4 mb-4 w-80">
          <input type="number"
            class="form-input text-white text-center border bg-primary_button border-secondary rounded-full flex-1 px-4 py-2"
            v-model="totalProtagonists" min="1" @change="updateProtagonists" />
        </div> -->
        <div class="custom-number-input h-10 w-32">

          <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
            <button data-action="decrement" @click.prevent="decrement"
              class="bg-secondary text-black hover:text-gray-700 hover:bg-secondary_hovered h-full w-20  rounded-l-full cursor-pointer outline-none">
              <span class="m-auto text-2xl font-thin">−</span>
            </button>
            <input type="number"
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none text-center w-full bg-secondary rounded-none font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
              name="custom-input-number" v-model="totalProtagonists" min="1" @input="updateProtagonists" />

            <button data-action="increment" @click.prevent="increment"
              class="bg-secondary text-black hover:text-gray-700 hover:bg-secondary_hovered h-full w-20  rounded-r-full cursor-pointer outline-none">
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>






        <label class="block mb-6 text-center">{{ $t('form.addNamesAndRoles') }}</label>
        <div class=" justify-center ">
          <draggable v-model="protagonists" class="space-y-8">
            <!-- Iteramos sobre los protagonistas dentro del draggable -->
            <template #item="{ element: protagonist, index }">
              <div class="flex flex-row items-center mb-8 mx-2" :key="index">
                <!-- Número de orden -->
                <span class="text-secondary font-bold mr-4">{{ index + 1 }}.</span>

                <!-- Imagen del protagonista (puedes descomentarla si la necesitas) -->
                <!--
          <div class="relative w-32 h-32 mb-4">
            <img :src="protagonist.image" alt="Protagonist Image" class="w-full h-full rounded-full object-cover"
              v-if="protagonist.image">
            <div class="w-full h-full rounded-full bg-secondary flex items-center justify-center" v-else>
              <span class="text-gray-500"> <img src="~/assets/images/image.svg" class="w-10" alt=""></span>
            </div>
            <input type="file" class="absolute inset-0 opacity-0" @change="onImageChange($event, index)" />
          </div>
          -->

                <!-- Campo para el nombre del protagonista -->
                <div class="relative flex items-center">
                  <input type="text"
                    class="form-input text-white text-center border bg-primary_button border-secondary rounded-full w-96 px-4 py-2"
                    v-model="protagonist.name" :placeholder="$t('form.writeName')" />
                  <!-- Ícono de tres barras horizontales para arrastrar, dentro del input -->
                  <span class="absolute left-3">
                    <img src="~/assets/images/drag.svg" alt="">
                  </span>

                </div>
              </div>
            </template>
          </draggable>
        </div>
        <img class="pt-10" src="~/assets/images/down_arrow.png" alt="">
      </div>

      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{{ $t('form.step3Title') }}</h1>
      <h1 class="text-3xl sm:text-4xl md:text-5xl mb-6">{{ $t('form.summarizeStory') }}</h1>

      <div class="flex flex-col items-center space-y-4 mb-8">
  <textarea v-model="summary" @input="countWords" :placeholder="$t('form.writeSummary')" rows="6"
    class="w-full max-w-2xl p-4 border rounded-lg bg-primary_button"></textarea>
  <div class="text-right text-sm text-gray-500 mb-4">
    {{ wordCount }} / 300 {{ $t('form.wordCount') }}
  </div>

  <div class="flex flex-col sm:flex-row items-center sm:space-x-4 w-full max-w-2xl">
    <input type="text" required v-model="title" :placeholder="$t('form.writeTitle')"
      class="flex-auto p-2 border rounded-full bg-primary_button" />
    <button type="button" @click="generateTitle"
      class="bg-secondary hover:bg-secondary_hovered active:bg-secondary_active text-black flex-auto px-4 py-2 rounded-full flex items-center justify-center"
      :disabled="isLoading">
      <span v-if="isLoading" class="loader"></span>
      <span v-else>{{ $t('form.generateTitle') }}</span>
    </button>
  </div>

  <!-- Mensaje de error -->
  <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
    {{ errorMessage }}
  </div>
</div>



      <div class="flex flex-col items-center space-y-4 mb-16">
        <label class="block mb-6">{{ $t('form.units') }}</label>
        <select id="units" class="bg-secondary border text-center text-black text-sm rounded-full block w-32 p-2.5"
          v-model="selectedUnits">
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>



      <div class="flex justify-center items-center mt-6">
        <button type="submit"
          class="bg-secondary hover:bg-secondary_hovered active:bg-secondary_active text-black px-6 py-3 rounded-full flex items-center space-x-2">
          <span>{{ $t('form.generateBook') }}</span>
          <img src="~/assets/images/book.svg" alt="" class="h-6 w-6">
        </button>

        <!-- Spinner -->
        <div v-if="loading" class="spinner-overlay">
          <div class="spinner-container">
            <Book />
            <p class="spinner-text">{{ $t('form.chapter') }} {{ chapterNumberSpin }}/10</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import Book from '~/components/Book.vue'
import { ref } from 'vue'
import axios from 'axios'
import chatGpt from "~/api/chat.js"
import dalle from "~/api/dalle.js"
import edit from "~/api/edit.js"
import { useI18n } from 'vue-i18n'
import jsPDF from 'jspdf';
import generateBook from '~/api/generate'
import { list } from 'postcss'
import draggable from 'vuedraggable'

// import sharp from 'sharp'
// var languages = require('language-list')();

// console.log(languages.getLanguageNames())
const isPressed = ref(false);
const isDropdownOpen = ref(false);
const { t } = useI18n()
const isChildrensBook = ref('no')
const totalProtagonists = ref(1)
const protagonists = ref([{ image: null, name: '' }])
const summary = ref('')
const title = ref('')
const wordCount = ref(0)
const loading = ref(false)
const chapterNumberSpin = ref(1)
const selectedLanguage = ref(null)
const selectedUnits = ref(5)
const isLoading = ref(false)



const toggleButton = () => {
  console.log(isPressed.value);

  isPressed.value = !isPressed.value;
  console.log(isPressed.value);

  toggleDropdown();
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const languages = {
  arabic: t('lang.Arabic'),
  catalan: t('lang.Catalan'),
  spanish: t('lang.Spanish'),
  french: t('lang.French'),
  galician: t('lang.Galician'),
  hindi: t('lang.Hindi'),
  english: t('lang.English'),
  italian: t('lang.Italian'),
  mandarin: t('lang.Mandarin'),
  portuguese: t('lang.Portuguese'),
  russian: t('lang.Russian'),
  basque: t('lang.Basque')
}


const selectLanguage = (key) => {
  selectedLanguage.value = key
  toggleButton();
}



const updateProtagonists = () => {
  // generateEditImage("mejora la imagen", outputPath)

  const newTotal = parseInt(totalProtagonists.value)
  if (newTotal > protagonists.value.length) {
    for (let i = protagonists.value.length; i < newTotal; i++) {
      protagonists.value.push({ image: null, name: '' })
    }
  } else if (newTotal < protagonists.value.length) {
    protagonists.value.splice(newTotal)
  }
}

const onImageChange = (event, index) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      protagonists.value[index].image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}
const errorMessage = ref(''); // Nuevo estado para el mensaje de error


const generateTitle = async () => {
  isLoading.value = true; // Cambia el estado a cargando
  errorMessage.value = ''; // Reinicia el mensaje de error

  if (summary.value) {
    let combinedSummary = summary.value + "\nPlease generate a creative and engaging title for this story in " + selectedLanguage.value + ". Make sure the title reflects the tone and theme of the story, and captures the reader's attention effectively.";

    try {
      const text = await chatGpt(combinedSummary);
      console.log(text);
      title.value = text.trim();
    } catch (error) {
      console.error('Error generating title:', error);
      errorMessage.value = t('error.titleGeneration'); // Mensaje de error traducido
    }
  } else {
    console.error('Summary is not defined or is empty');
    errorMessage.value = t('error.emptySummary'); // Mensaje de error si el resumen está vacío
  }

  isLoading.value = false; // Cambia el estado a no cargando
};





const countWords = () => {
  wordCount.value = summary.value.trim().split(/\s+/).length
  if (wordCount.value > 300) {
    wordCount.value = 300
  }
}
const generatePromptForChapter = (chapterNumber) => {
  const prompt = `Generate Chapter ${chapterNumber} of an extensive story in ${selectedLanguage.value} based on the following details:
  - Each chapter should be a minimum of 2000 words.
  - Include detailed character development, rich descriptions, and substantial dialogue.
  - Explore both internal and external conflicts.
  - Ensure a coherent narrative style and tone with a clear evolution of plot and characters.`;

  return `${prompt}
  - Is it a children's book: ${isChildrensBook.value}
  - Protagonists (in order of importance, from main protagonist to lesser roles): ${protagonists.value.map(p => `${p.name}`).join(', ')}
  - Summary: ${summary.value}
  - Suggested title: ${title.value ? title.value : 'No title has been generated yet'}`;
}


const summarizeChapterText = async (chapterText) => {
  const summaryPrompt = `Summarize the following text into a concise description suitable for generating an image: ${chapterText}`;
  const summaryResponse = await chatGpt(summaryPrompt);
  return summaryResponse;
}

const generateImageForChapter = async (chapterText, chapterNumber) => {
  const summarizedText = await summarizeChapterText(chapterText);
  const promptForImage = `Create a detailed image that visually represents the key themes and atmosphere of Chapter ${chapterNumber} of a story. Focus on capturing the essence and mood of the described scenes without including any text. Ensure the image conveys the narrative elements effectively, using the following description as inspiration: ${summarizedText}`;


  // Llama a la API para obtener la URL de la imagen
  const imageUrl = await dalle(promptForImage);

  console.log(imageUrl);
  return imageUrl;
}

// const generateEditImage = async (prompt, imagePath) => {
//   try {
//     // Log the image path to confirm it's passed correctly
//     console.log(imagePath);

//     // Call the API to get the edited image URL
//     const imageUrl = await edit(prompt, imagePath);
//     console.log(imageUrl);

//     // Fetch the image from the returned URL with CORS mode
//     const response = await fetch(imageUrl, { mode: 'cors' });

//     // Check if the fetch was successful
//     if (!response.ok) {
//       throw new Error(`Failed to fetch image: ${response.statusText}`);
//     }

//     // Convert the response to a Blob
//     const imageBlob = await response.blob();
//     console.log(response);
//     console.log(imageBlob);

//     // Convert the Blob to an object URL
//     const imageObjectURL = URL.createObjectURL(imageBlob);

//     // Return the object URL for further use
//     return imageObjectURL;
//   } catch (error) {
//     console.error('Error generating edited image:', error);
//     // Handle errors appropriately (e.g., return a fallback value or throw the error)
//     throw error;
//   }
// }





const generateChapter = async (chapterNumber) => {
  const prompt = generatePromptForChapter(chapterNumber);
  console.log(prompt);
  const response = await chatGpt(prompt);

  // Generar la imagen para el capítulo
  const imageUrl = await generateImageForChapter(response, chapterNumber);

  console.log(imageUrl);

  return { text: response, imageUrl };
}



const submitForm = async () => {
  loading.value = true;

  try {
    const chapters = [];
    const chapterNumbers = 1;
    for (let i = 1; i <= chapterNumbers; i++) {
      const chapter = await generateChapter(i);
      chapters.push(chapter);
      chapterNumberSpin.value++;
    }

    loading.value = false;

    // Enviar la data del libro al backend para generar el libro y guardar temporalmente
    const response = await generateBook(title.value, chapters, selectedLanguage.value);

    console.log("generateBook response", response);
    localStorage.setItem('jwt', response.token)



    if (response.success) {
      // Redirigir a la página de pago
      window.location.href = `/payment?bookName=${response.bookId}`;
    } else {
      console.error('Error generating the book on the server');
    }
  } catch (error) {
    loading.value = false;
    console.error('Error generating story or image:', error);
  }
}

function decrement() {
  if (totalProtagonists.value > 1) {
    totalProtagonists.value--;
    updateProtagonists();
  }
}

function increment() {
  totalProtagonists.value++;
  updateProtagonists();
}

definePageMeta({
  layout: 'default',
});


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

input[type="radio"]:checked {
  @apply bg-secondary border-transparent;
}


.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left: 4px solid #ffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

.spinner-text {
  margin-top: 10px;
  color: #ffff;
  font-size: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  border: 2px solid transparent;
  border-radius: 50%;
  border-top-color: #000000;
  width: 1em;
  height: 1em;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
