<template>
  <table
    class="mx-auto [border-spacing:0_8px] [border-collapse:separate] mt-10"
  >
    <thead>
      <tr class="h-15">
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="w-40 text-center"
        >
          {{ header.value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in displayedUsers"
        :key="index"
        class="mt-5 rounded-2xl text-center hover:shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] h-15"
      >
        <td>{{ user.Username }}</td>
        <td>{{ user.Fullname }}</td>
        <td>{{ user.Birthday }}</td>
        <td>{{ user.Email }}</td>
        <td>{{ user.Role }}</td>
        <td>{{ user.Other }}</td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-end items-center mb-3">
    <div>
      <label for="itemsPerPage"> Số lượng hiển thị:</label>
      <select
        id="itemsPerPage"
        v-model="itemsPerPage"
        class="ml-2 p-1 border rounded w-10"
        @change="updatePage(1)"
      >
        <option v-for="option in perPageOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div>
      Hiển thị {{ startItem }} - {{ endItem }} trên tổng số
      {{ totalItems }} người dùng
    </div>
    <div class="flex items-center gap-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        <
      </button>

      <span>Trang {{ currentPage }} / {{ totalPages }}</span>

      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const users = ref([
  {
    Username: 'john_doe',
    Fullname: 'John Doe',
    Birthday: '1990-05-15',
    Email: 'john@example.com',
    Role: 'Admin',
    Other: 'N/A',
  },
  {
    Username: 'jane_smith',
    Fullname: 'Jane Smith',
    Birthday: '1992-07-20',
    Email: 'jane@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    Username: 'alice_jones',
    Fullname: 'Alice Jones',
    Birthday: '1988-11-30',
    Email: 'alice@example.com',
    Role: 'Moderator',
    Other: 'N/A',
  },
  {
    Username: 'bob_brown',
    Fullname: 'Bob Brown',
    Birthday: '1995-02-25',
    Email: 'bob@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    Username: 'charlie_clark',
    Fullname: 'Charlie Clark',
    Birthday: '1993-09-10',
    Email: 'charlie@example.com',
    Role: 'Admin',
    Other: 'N/A',
  },
  {
    Username: 'david_white',
    Fullname: 'David White',
    Birthday: '1991-12-05',
    Email: 'david@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    Username: 'emily_davis',
    Fullname: 'Emily Davis',
    Birthday: '1998-06-18',
    Email: 'emily@example.com',
    Role: 'Moderator',
    Other: 'N/A',
  },
  {
    Username: 'frank_miller',
    Fullname: 'Frank Miller',
    Birthday: '1987-04-12',
    Email: 'frank@example.com',
    Role: 'User',
    Other: 'N/A',
  },
])

const headers = ref([
  { value: 'Username' },
  { value: 'Fullname' },
  { value: 'Birthday' },
  { value: 'Email' },
  { value: 'Role' },
  { value: 'Other' },
])

const itemsPerPage = ref(3) // Số lượng item trên mỗi trang
const perPageOptions = ref([3, 5, 10, 15])
const currentPage = ref(1) // Trang hiện tại

const totalItems = computed(() => users.value.length)
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
)

const displayedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return users.value.slice(start, end)
})

const startItem = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
)

const updatePage = (page) => {
  currentPage.value = page
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
