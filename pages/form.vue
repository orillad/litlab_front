<template>
  <div class="max-w-2xl mx-auto p-4 text-center">
    <form @submit.prevent="submitForm">
      <h1 class="text-5xl font-bold mb-8">{{ $t('form.step1Title') }}</h1>
      <h1 class="text-5xl font-bold mb-8">{{ $t('form.question1') }}</h1>

      <label class="block mb-6">{{ $t('form.isChildrensBook') }}</label>
      <div class="flex justify-center items-center space-x-40 mb-16">
        <label class="flex items-center space-x-4">
          <span>{{ $t('form.yes') }}</span>
          <input type="radio" class="form-checkbox" value="yes" v-model="isChildrensBook">
        </label>
        <label class="flex items-center space-x-4">
          <span>{{ $t('form.no') }}</span>
          <input type="radio" class="form-checkbox" value="no" v-model="isChildrensBook">
        </label>
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
        <img class="pt-10" src="~/assets/images/down_arrow.svg" alt="">
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
            <input
  type="number"
  class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none text-center w-full bg-secondary font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"
  name="custom-input-number"
  v-model="totalProtagonists"
  min="1"
  @input="updateProtagonists"
/>

            <button data-action="increment" @click.prevent="increment"
              class="bg-secondary text-black hover:text-gray-700 hover:bg-secondary_hovered h-full w-20  rounded-r-full cursor-pointer outline-none">
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
          </div>
        </div>






        <label class="block mb-6 text-center">{{ $t('form.addNamesAndRoles') }}</label>
        <div class="flex flex-wrap justify-center">
          <div v-for="(protagonist, index) in protagonists" :key="index" class="flex flex-col items-center mb-8 mx-2">
            <div class="relative w-32 h-32 mb-4">
              <img :src="protagonist.image" alt="Protagonist Image" class="w-full h-full rounded-full object-cover"
                v-if="protagonist.image">
              <div class="w-full h-full rounded-full bg-secondary flex items-center justify-center" v-else>
                <span class="text-gray-500"> <img src="~/assets/images/image.svg" class="w-10" alt=""></span>
              </div>
              <input type="file" class="absolute inset-0 opacity-0" @change="onImageChange($event, index)" />
            </div>
            <input type="text"
              class="form-input text-white text-center border bg-primary_button border-secondary rounded-full px-4 py-2 mb-2"
              v-model="protagonist.name" :placeholder="$t('form.writeTitle')" />
            <select
              class="form-input text-white text-center border bg-primary_button border-secondary rounded-full px-4 py-2"
              v-model="protagonist.role">
              <option value="Principal">{{ $t('form.principal') }}</option>
              <option value="Secundario">{{ $t('form.secondary') }}</option>
              <option value="Terciario">{{ $t('form.tertiary') }}</option>
            </select>
          </div>
        </div>
        <img class="pt-10" src="~/assets/images/down_arrow.svg" alt="">
      </div>

      <h1 class="text-5xl font-bold mb-8">{{ $t('form.step3Title') }}</h1>
      <h1 class="text-5xl mb-8">{{ $t('form.summarizeStory') }}</h1>

      <div class="flex flex-col items-center space-y-4 mb-16">
        <textarea v-model="summary" @input="countWords" :placeholder="$t('form.writeSummary')" rows="6"
          class="w-full max-w-2xl p-4 border rounded-lg bg-primary_button"></textarea>
        <div class="text-right text-sm text-gray-500 mb-4">
          {{ wordCount }} / 300 {{ $t('form.wordCount') }}
        </div>
        <div class="flex items-center space-x-4 w-full max-w-2xl">
          <input type="text" required v-model="title" :placeholder="$t('form.writeTitle')"
            class="flex-auto p-2 border rounded-full bg-primary_button" />
          <button type="button" @click="generateTitle"
            class="bg-secondary text-black flex-auto px-4 py-2 rounded-full flex-shrink-0">
            {{ $t('form.generateTitle') }}
          </button>
        </div>
      </div>

      <div class="flex justify-center items-center">
        <button type="submit" class="bg-secondary text-black px-6 py-3 rounded-full flex items-center space-x-2">
          <span>{{ $t('form.generateBook') }}</span>
          <img src="~/assets/images/book.svg" alt="" class="h-6 w-6">
        </button>
        <!-- Spinner -->
        <div v-if="loading" class="spinner-overlay">
          <div class="spinner-container">
            <div class="spinner"></div>
            <p class="spinner-text">{{ $t('form.generatingBook') }}</p>
            <p class="spinner-text">{{ $t('form.chapter') }} {{ chapterNumberSpin }}/10</p>
          </div>
        </div>
      </div>
    </form>
  </div>


</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import chatGpt from "~/api/chat.js"
import dalle from "~/api/dalle.js"
import { useI18n } from 'vue-i18n'
import jsPDF from 'jspdf';
// var languages = require('language-list')();

// console.log(languages.getLanguageNames())

const { locale } = useI18n()

const isChildrensBook = ref('no')
const selectedUnits = ref(5)
const totalProtagonists = ref(1)
const protagonists = ref([{ image: null, name: '', role: 'Principal' }])
const summary = ref('')
const title = ref('')
const wordCount = ref(0)
const loading = ref(false)
const chapterNumberSpin = ref(1)

const updateProtagonists = () => {
  const newTotal = parseInt(totalProtagonists.value)
  if (newTotal > protagonists.value.length) {
    for (let i = protagonists.value.length; i < newTotal; i++) {
      protagonists.value.push({ image: null, name: '', role: 'Principal' })
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

const generateTitle = async () => {
  if (summary.value) {
    let combinedSummary = summary.value + "\n Dame un título para esta historia.";
    const text = await chatGpt(combinedSummary);
    title.value = text.trim();
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
const generatePromptForChapter = (chapterNumber) => {
  const prompts = {
    en: `Generate Chapter ${chapterNumber} of an extensive story in English based on the following details:
    - Each chapter should be a minimum of 2000 words.
    - Include detailed character development, rich descriptions, and substantial dialogue.
    - The story should explore both internal and external conflicts.
    - Ensure a coherent narrative style and tone with clear evolution of plot and characters.`,

    es: `Genera el Capítulo ${chapterNumber} de un cuento extenso en español basándote en los siguientes detalles:
    - Cada capítulo debe tener un mínimo de 2000 palabras.
    - Incluye desarrollo detallado de personajes, descripciones ricas y diálogos sustanciales.
    - La historia debe abordar tanto conflictos internos como externos.
    - Asegúrate de mantener un estilo narrativo coherente con una evolución clara de la trama y personajes.`,

    ca: `Genera el Capítol ${chapterNumber} d'un conte extens en català basat en els següents detalls:
    - Cada capítol ha de tenir un mínim de 2000 paraules.
    - Inclou desenvolupament detallat dels personatges, descripcions riques i diàlegs substancials.
    - La història ha d'abordar tant conflictes interns com externs.
    - Mantingues un estil narratiu coherent amb una evolució clara de la trama i personatges.`
  }

  const currentLanguage = locale.value
  const languagePrompt = prompts[currentLanguage] || prompts['en']

  return `${languagePrompt}
  - Is it a children's book: ${isChildrensBook.value}
  - Protagonists: ${protagonists.value.map(p => `${p.name} (${p.role})`).join(', ')}
  - Summary: ${summary.value}
  - Suggested title: ${title.value ? title.value : 'No title has been generated yet'}`
}

const summarizeChapterText = async (chapterText) => {
  const summaryPrompt = `Summarize the following text into a concise description suitable for generating an image: ${chapterText}`;
  const summaryResponse = await chatGpt(summaryPrompt);
  return summaryResponse;
}

const generateImageForChapter = async (chapterText, chapterNumber) => {
  const summarizedText = await summarizeChapterText(chapterText);
  const promptForImage = `Generate an image without text for Chapter ${chapterNumber} of a story based on the following description: ${summarizedText}`;

  // Llama a la API para obtener la URL de la imagen
  const imageUrl = await dalle(promptForImage);

  // Descarga la imagen como un Blob
  const response = await fetch(imageUrl);
  console.log(response);
  
  const imageBlob = await response.blob();

  // Convierte el Blob a una URL de objeto
  const imageObjectURL = URL.createObjectURL(imageBlob);

  return imageObjectURL;
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




const generatePDF = async (chapters) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const lineHeight = 10;
  const titleFontSize = 20;
  const chapterFontSize = 16;
  const textFontSize = 12;

  let y = margin;

  // Portada
  doc.setFontSize(titleFontSize);
  doc.text(title.value, pageWidth / 2, pageHeight / 2, { align: 'center' });
  doc.addPage();

  // Contenido
  for (const [index, chapter] of chapters.entries()) {
    doc.setFontSize(chapterFontSize);
    doc.text(`Capítulo ${index + 1}`, margin, y);
    y += lineHeight * 2;

    // Insertar imagen del capítulo
    if (chapter.imageUrl) {
      const base64Image = await loadImageToCanvas(chapter.imageUrl);
      doc.addImage(base64Image, 'PNG', margin, y, pageWidth - margin * 2, 100); 
      y += 110;  // Ajustar según el tamaño de la imagen
    }

    doc.setFontSize(textFontSize);
    const splitStory = doc.splitTextToSize(chapter.text, pageWidth - margin * 2);

    for (const line of splitStory) {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }

    if (index < chapters.length - 1) {
      doc.addPage();
      y = margin;
    }
  }

  doc.save(title.value ? title.value + '.pdf' : 'story.pdf');
}

const loadImageToCanvas = async (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}


const submitForm = async () => {
  loading.value = true;

  try {
    const chapters = [];
    for (let i = 1; i <= selectedUnits.value; i++) {
      const chapter = await generateChapter(i);
      chapters.push(chapter);
      chapterNumberSpin.value++;
    }

    loading.value = false;
    generatePDF(chapters);
  } catch (error) {
    loading.value = false;

    console.error('Error generating story or image:', error);
  }
}

function decrement() {
  if(totalProtagonists.value > 1){
    totalProtagonists.value--;
    updateProtagonists();
  }
}

function increment() {
  totalProtagonists.value++;
  updateProtagonists();
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
</style>
