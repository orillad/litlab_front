import chatGpt from "~/api/chat.js"
import dalle from '~/api/dalle.js';
import jsPDF from 'jspdf';

export const generateTitle = async (summary, title) => {
  // Lógica para generar el título
  const prompt = `Crea un título para un libro basado en este resumen: ${summary}`;
  try {
    const response = await chatGpt.sendPrompt(prompt);
    return response.title || title;
  } catch (error) {
    console.error('Error generating title:', error);
    return title;
  }
}

export const generatePromptForChapter = (chapterNumber, isChildrensBook, protagonists, summary, title, locale) => {
  // Lógica para generar el prompt del capítulo
  return `Capítulo ${chapterNumber}: ${title}. ${summary}`;
}

export const generateChapter = async (chapterNumber, generatePromptForChapter, isChildrensBook, protagonists, summary, title, locale) => {
  const prompt = generatePromptForChapter(chapterNumber, isChildrensBook, protagonists, summary, title, locale);
  try {
    const response = await chatGpt.sendPrompt(prompt);
    return response.chapter;
  } catch (error) {
    console.error('Error generating chapter:', error);
    return '';
  }
}

export const generateImage = async (chapterNumber, summary) => {
  const prompt = `Imagen para el capítulo ${chapterNumber}: ${summary}`;
  try {
    const response = await dalle.generateImage(prompt);
    return response.imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    return '';
  }
}

export const generatePDF = (chapters, images, title) => {
  const doc = new jsPDF();
  doc.setFontSize(24);
  doc.text(title, 10, 10);
  
  chapters.forEach((chapter, index) => {
    doc.addPage();
    doc.setFontSize(16);
    doc.text(`Capítulo ${index + 1}`, 10, 10);
    doc.setFontSize(12);
    doc.text(chapter, 10, 20);
    if (images[index]) {
      doc.addImage(images[index], 'JPEG', 10, 30, 180, 160);
    }
  });

  doc.save(`${title}.pdf`);
}
