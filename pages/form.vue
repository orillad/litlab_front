<!-- litlab_front/pages/form.vue -->
<template>
  <div class="relative">
    <img src="~/assets/images/maquina.png" alt="Màquina d'escriure"
      class="absolute left-0 transform w-1/3 sm:w-1/4 sm:top-96 top-96 md:w-1/3 md:top-96 lg:w-1/3 hidden sm:block">

    <img src="~/assets/images/llibre.png" alt="Otra Imagen"
      class="absolute right-0 transform w-1/4 sm:w-1/4 sm:top-[70rem] top-[70rem] md:w-1/4 md:top-[70rem] lg:w-1/4 hidden sm:block">
  </div>


  <div class="max-w-2xl mx-auto p-4 text-center relative ">


    <form @submit.prevent="submitForm">
      <h1 class="text-5xl font-bold mb-8">{{ $t('form.step1Title') }}</h1>
      <h1 class="text-4xl mb-8">{{ $t('form.question1') }} <span class=" text-secondary font-bold">{{
        $t('form.question1_2') }}</span></h1>


      <label class="block mb-6">{{ $t('form.isChildrensBook') }}</label>
      <div class="flex justify-center items-center space-x-32 mb-14">
        <label class="flex items-center space-x-4">
          <span>{{ $t('form.yes') }}</span>
          <input type="radio" value="yes" v-model="isChildrensBook">
        </label>
        <label class="flex items-center space-x-4">
          <span>{{ $t('form.no') }}</span>
          <input type="radio" value="no" v-model="isChildrensBook">
        </label>
      </div>



      <div class="flex flex-col items-center  mb-16">
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
        <img class="pt-10 cursor-pointer" src="~/assets/images/down_arrow.png" alt=""
          @click="scrollToNextStep('step2')" />
      </div>

      <h1 ref="step2" class="text-5xl font-bold mb-8">{{ $t('form.step2Title') }}</h1>
      <h1 class="text-4xl mb-8">{{ $t('form.bookNeedsProtagonist') }} <span class="text-secondary font-bold">{{
        $t('form.bookNeedsProtagonist2') }}</span></h1>

      <div class="flex flex-col items-center space-y-4 mb-16">
        <label class="block mb-6 text-center">{{ $t('form.addNamesAndRoles') }}</label>
        <div class="flex flex-col justify-center items-center space-y-4 mb-8">
          <draggable v-model="protagonists" class="space-y-8 w-full">
            <template #item="{ element: protagonist, index }">
              <div class="flex flex-row md:flex-row items-center justify-between mb-4 w-full md:w-auto mx-2">
                <span class="text-secondary font-bold mb-2 mt-0 mr-4 hidden md:block">{{ index + 1 }}.</span>
                <div class="flex items-center w-full md:w-96 relative">
                  <span class="absolute left-3">
                    <img src="~/assets/images/drag.svg" alt="Drag icon">
                  </span>
                  <input type="text"
                    class="form-input text-white text-center border bg-primary_button border-secondary rounded-full w-full px-12 py-2"
                    v-model="protagonist.name" :placeholder="$t('form.writeName')" />
                </div>
                <button class="ml-4 mt-0" @click.prevent="decrement(index)">
                  <img src="~/assets/images/trash.svg" alt="Delete icon">
                </button>
              </div>
            </template>
          </draggable>

          <button data-action="increment" @click.prevent="increment"
            class="bg-secondary font-bold text-primary w-full md:w-96 px-4 py-2 mt-4 rounded-full border border-primary hover:bg-secondary hover:text-black transition-all duration-300 ease-in-out">
            {{ $t('form.addCharacter') }}
          </button>
        </div>



        <img class="pt-10 cursor-pointer" src="~/assets/images/down_arrow.png" alt=""
          @click="scrollToNextStep('step3')" />
      </div>

      <h1 ref="step3" class="text-5xl sm:text-4xl md:text-5xl font-bold mb-6">{{ $t('form.step3Title') }}</h1>
      <h1 class="text-4xl sm:text-4xl md:text-5xl  mb-6">{{ $t('form.summarizeStory') }} <span
          class="text-secondary font-bold">{{ $t('form.summarizeStory2') }}</span> <span class="font-bold">{{
            $t('form.summarizeStory3') }}</span></h1>

      <div class="flex flex-col items-center space-y-4 mb-8">
        <textarea v-model="summary" @input="countWords" :placeholder="$t('form.writeSummary')" rows="6"
          class="w-full max-w-2xl p-4 border rounded-lg border-secondary bg-primary_button"></textarea>
        <div class="text-right text-sm text-gray-500 mb-4">
          {{ wordCount }} / 300 {{ $t('form.wordCount') }}
        </div>

        <div class="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full max-w-2xl">
          <input type="text" v-model="title" :placeholder="$t('form.writeTitle')"
            class="flex-auto p-2 border border-secondary rounded-full bg-primary_button" />
          <button type="button" @click="generateTitle"
            class="bg-secondary hover:bg-secondary_hovered active:bg-secondary_active text-black flex-auto px-4 py-2 rounded-full flex items-center justify-center"
            :disabled="isLoading">
            <span v-if="isLoading" class="loader"></span>
            <span class="font-bold text-primary" v-else>{{ $t('form.generateTitle') }}</span>
          </button>
        </div>

        <!-- Mensaje de error -->
        <div v-if="errorMessage" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </div>
      </div>





      <div class="flex flex-col items-center mb-16">
        <label class="block text-center mb-6">{{ $t('form.units') }}</label>
        <div class="relative">
          <!-- Botón que abre el selector -->
          <button @click.prevent="toggleButton" :class="[
            'flex mx-auto w-64 font-bold bg-secondary text-primary py-2 px-4 leading-tight focus:outline-none focus:text-primary hover:bg-secondary_hovered items-center justify-center space-x-2',
            isPressed ? 'rounded-t-[21px]' : 'rounded-full'
          ]">
            <span>{{ selectedUnits ? selectedUnits : $t('form.units1') }}</span>

          </button>

          <!-- Menú desplegable para seleccionar idioma -->
          <div v-show="isDropdownOpen" class="absolute w-full bg-white z-10 shadow-lg rounded-b-[21px]">
            <ul>
              <li v-for="(unit, index) in units" :key="unit" :class="[
                'px-4 py-2 bg-secondary text-black hover:bg-gray-200 cursor-pointer',
                unit === Object.values(units)[Object.values(units).length - 1] ? 'rounded-b-[21px]' : 'rounded-none'
              ]" @click="selectUits(unit)">
                {{ unit }}
              </li>
            </ul>
          </div>
        </div>

      </div>


      <div class="flex justify-center items-center mt-4">
        <button type="submit"
          class="bg-secondary hover:bg-secondary_hovered active:bg-secondary_active text-black px-6 py-3 rounded-full flex items-center space-x-2">
          <span class="font-bold">{{ $t('form.generateBook') }}</span>
          <img src="~/assets/images/book.svg" alt="" class="h-6 w-6">
        </button>

        <!-- Spinner -->
        <div v-if="loading" class="spinner-overlay">
          <div class="spinner-container">
            <Book />
            <p class="spinner-text">{{ $t('form.chapter') }} {{ chapterNumberSpin }}/10</p>
            <p class="spinner-text">{{ $t('form.countdown') }}</p>
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
const selectedUnits = ref(null)
const isLoading = ref(false)

const step2 = ref(null);
const step3 = ref(null);

const scrollToNextStep = (stepRef) => {
  const element = stepRef === 'step2' ? step2.value : step3.value;
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};


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


const units = {
  1: 1,
  5: 5,
  10: 10,
  20: 20
}

const selectLanguage = (key) => {
  selectedLanguage.value = key
  toggleButton();
}
const selectUits = (key) => {
  selectedUnits.value = key
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
  isLoading.value = true;
  errorMessage.value = ''; // Reinicia el mensaje de error

  if (!selectedLanguage.value) {
    errorMessage.value = t('error.selectLanguage'); // Mensaje de error si no se selecciona un idioma
    isLoading.value = false;
    return;
  }

  if (!summary.value) {
    errorMessage.value = t('error.emptySummary'); // Mensaje de error si el resumen está vacío
    isLoading.value = false;
    return;
  }

  let combinedSummary = summary.value + "\nPlease generate a creative and engaging title for this story in " + selectedLanguage.value + ". Make sure the title reflects the tone and theme of the story, and captures the reader's attention effectively.";

  try {
    const text = await chatGpt(combinedSummary);
    title.value = text.trim();
  } catch (error) {
    console.error('Error generating title:', error);
    errorMessage.value = t('error.titleGeneration'); // Mensaje de error traducido
  }

  isLoading.value = false;
};





const countWords = () => {
  wordCount.value = summary.value.trim().split(/\s+/).length
  if (wordCount.value > 300) {
    wordCount.value = 300
  }
}
const generatePromptForChapter = (chapterNumber) => {
  const prompt = isChildrensBook.value 
    ? `Generate Chapter ${chapterNumber} of a fun and colorful children's story in ${selectedLanguage.value} based on the following details:
    - Each chapter should be a minimum of 500 words.
    - Use simple language and engaging characters to capture children's attention.
    - Include plenty of dialogue and imaginative scenarios.
    - Ensure a clear moral lesson or message in the story.`
    : `Generate Chapter ${chapterNumber} of an extensive story in ${selectedLanguage.value} based on the following details:
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
  const promptForImage = `Create a detailed image that visually represents the key themes and atmosphere of Chapter ${chapterNumber} of a story. Focus on capturing the essence and mood of the described scenes without including any text or written elements. The image should convey the narrative elements effectively, using the following description as inspiration: ${summarizedText}. Ensure that the final artwork purely reflects the chapter's essence through visual storytelling.`;


  // Llama a la API para obtener la URL de la imagen
  const imageUrl = await dalle(promptForImage);

  console.log(imageUrl);
  return imageUrl;
}



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
  errorMessage.value = ''; // Reinicia el mensaje de error
  loading.value = true; // Inicia el spinner de carga

  // Validaciones previas
  if (!selectedLanguage.value) {
    errorMessage.value = t('error.selectLanguage'); // Mensaje de error si no se selecciona un idioma
    loading.value = false;
    return;
  }

  if (!title.value) {
    errorMessage.value = t('error.noTitle'); // Mensaje de error si no se ha generado el título
    loading.value = false;
    return;
  }

  if (!summary.value) {
    errorMessage.value = t('error.emptySummary'); // Mensaje de error si el resumen está vacío
    loading.value = false;
    return;
  }

  if (protagonists.value.length === 0 || !protagonists.value[0].name) {
    errorMessage.value = t('error.noProtagonist'); // Mensaje de error si no hay protagonistas
    loading.value = false;
    return;
  }

  try {
    const chapters = [];
    const totalChapters = 10; // Número de capítulos a generar

    for (let i = 1; i <= totalChapters; i++) {
      const chapter = await generateChapter(i);
      chapters.push(chapter);
      chapterNumberSpin.value++; // Incrementa el número de capítulo mostrado en el spinner
    }

    loading.value = false;

    // Genera el libro después de obtener todos los capítulos
    const response = await generateBook(title.value, chapters, selectedLanguage.value);

    if (response.success) {
      // Almacena el token JWT si el libro se genera con éxito
      localStorage.setItem('jwt', response.token); // Guarda el JWT en el localStorage
      console.log('JWT Token:', response.token); // Muestra el token en la consola

      // Redirige al usuario a la página de pago con el ID del libro
      window.location.href = `/payment?bookName=${response.bookId}`;
    } else {
      console.error('Error generating the book on the server');
      errorMessage.value = t('error.serverError'); // Error del servidor
    }
  } catch (error) {
    console.error('Error generating story or image:', error);
    errorMessage.value = t('error.generationError'); // Mensaje de error general para la generación
    loading.value = false; // Detén el spinner si ocurre un error
  }
};


function decrement(index) {
  if (totalProtagonists.value > 1) {
    protagonists.value.splice(index, 1);
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
