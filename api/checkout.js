import axios from "./axios";

const checkout = async (price, url, purchaseId) => {
  try {
    const response = await axios.post('/api/create-checkout-session', {
      price,
      url,
      purchaseId,
    });

    // Verifica si hay un error en la respuesta (axios no usa `response.ok` como fetch)
    if (!response.data.url) {
      throw new Error('No se pudo obtener la URL de la sesión.');
    }

    // Redirige a la URL de la sesión de checkout
    window.location.href = response.data.url;
  } catch (error) {
    console.error('Error durante el checkout:', error);
    // Asumiendo que `message` es una variable reactiva de Vue
    message.value = 'Hubo un error durante el checkout. Por favor, inténtalo de nuevo.';
  }
}

export default checkout;
