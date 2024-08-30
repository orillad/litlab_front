<!-- pages/customers.vue -->

<template>
    <div>
      <h1>Customer List</h1>
      <ul>
        <li v-for="customer in customers" :key="customer.id">
          {{ customer.first_name }} {{ customer.last_name }} - {{ customer.email }}
          <button @click="updateCustomer(customer.id)">Update</button>
          <button @click="deleteCustomer(customer.id)">Delete</button>
        </li>
      </ul>
      <div>
        <input v-model="newCustomer.first_name" placeholder="First Name" />
        <input v-model="newCustomer.last_name" placeholder="Last Name" />
        <input v-model="newCustomer.email" placeholder="Email" />
        <input v-model="newCustomer.mobile_phone" placeholder="Mobile Phone" />
        <input v-model="newCustomer.country" placeholder="Country" />
        <input v-model="newCustomer.state_province" placeholder="State/Province" />
        <input v-model="newCustomer.postal_code" placeholder="Postal Code" />
        <textarea v-model="newCustomer.shipping_address" placeholder="Shipping Address"></textarea>
        <!-- Add file input if needed for `book` -->
        <button @click="addCustomer">Add Customer</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } from '~/api/customers'
  
  const customers = ref([])
  const newCustomer = ref({
    first_name: '',
    last_name: '',
    email: '',
    mobile_phone: '',
    country: '',
    state_province: '',
    postal_code: '',
    shipping_address: ''
  })
  
  const fetchCustomers = async () => {
    try {
      customers.value = await getAllCustomers()
    } catch (e) {
      console.error('Error fetching customers:', e)
    }
  }
  
  const handleAddCustomer = async () => {
    try {
      const data = await addCustomer(newCustomer.value)
      customers.value.push(data)
      newCustomer.value = {
        first_name: '',
        last_name: '',
        email: '',
        mobile_phone: '',
        country: '',
        state_province: '',
        postal_code: '',
        shipping_address: ''
      }
    } catch (e) {
      console.error('Error adding customer:', e)
    }
  }
  
  const handleUpdateCustomer = async (id) => {
    try {
      const updatedCustomer = { ...newCustomer.value }
      const data = await updateCustomer(id, updatedCustomer)
      customers.value = customers.value.map(customer =>
        customer.id === id ? data : customer
      )
    } catch (e) {
      console.error('Error updating customer:', e)
    }
  }
  
  const handleDeleteCustomer = async (id) => {
    try {
      await deleteCustomer(id)
      customers.value = customers.value.filter(customer => customer.id !== id)
    } catch (e) {
      console.error('Error deleting customer:', e)
    }
  }
  
  // Fetch customers when component mounts
  onMounted(fetchCustomers)
  </script>
  