// middleware/auth.js

export default function ({ route, redirect }) {
    // Verifica si la ruta actual es '/payment'
    if (route.name === 'payment') {
      // Extrae el parámetro bookId de la ruta
      const bookId = route.query.bookId;
  
      // Verifica si bookId está presente y es válido
      if (!bookId || !isValidBookId(bookId)) {
        // Redirige a una página de error o a la página de inicio si no es válido
        return redirect('/');
      }
    }
  }
  
  // Función para validar el bookId
  function isValidBookId(id) {
    // Implementa la lógica para validar el bookId aquí
    // Por ejemplo, podrías verificar si es un número positivo
    return /^[0-9]+$/.test(id);
  }
  