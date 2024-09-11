<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-gray-100">
      <div class="p-6 text-center text-2xl font-bold">
        Admin Panel
      </div>
      <nav class="mt-10">
        <ul>
          <li>
            <NuxtLink
              to="/admin"
              class="block py-2.5 px-4 rounded hover:bg-gray-700"
              active-class="bg-gray-700"
            >
              Dashboard
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/customers"
              class="block py-2.5 px-4 rounded hover:bg-gray-700"
              active-class="bg-gray-700"
            >
              Customers
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/admin/purchases"
              class="block py-2.5 px-4 rounded hover:bg-gray-700"
              active-class="bg-gray-700"
            >
              Purchases
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
        <div class="text-xl font-semibold text-black">
          Admin Dashboard
        </div>
        <button
          class="px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
          @click="logout"
        >
          Logout
        </button>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 text-black">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function logout() {
  // Eliminar el JWT de localStorage
  localStorage.removeItem('token')

  // Redirigir al usuario a la página de login
  router.push('/login')
}
</script>

<style scoped>
.text-black {
  color: black;
}
</style>
