import { validateAccess } from "~/api/jwt.js"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $auth } = useNuxtApp()
  
  // Solo ejecutar en el cliente
  if (import.meta.client) {
    // Mostrar una página de carga mientras se verifica el token
    const token = localStorage.getItem('token')

    if (!token) {
      return navigateTo('/login')
    }

    // Aquí podrías agregar más lógica para verificar la validez del token
    // Ejemplo: validar el token con el backend

    const result = await validateAccess(token); // Usa el bookId de la URL

    console.log(result);

    // try {
    //   // Supongamos que tienes una función para verificar el token
    //   const response = await fetch('/auth/verify', {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   })

    //   if (!response.ok) {
    //     // Token inválido o expirado
    //     localStorage.removeItem('token')
    //     return navigateTo('/login')
    //   }
      
    //   // Token válido
    //   // Puedes agregar lógica adicional aquí si es necesario
    // } catch (error) {
    //   console.error('Error verificando el token:', error)
    //   localStorage.removeItem('token')
    //   return navigateTo('/login')
    // }
  }
})
