<template>
  <table class="mx-auto [border-spacing:0_8px] [border-collapse:collapse] mt-5">
    <thead>
      <tr class="h-15">
        <th
          v-for="(header, index) in headers"
          :key="index"
          class="w-40 text-center cursor-pointer"
          @click="handleHeaderClick(header)"
        >
          <div class="flex items-center justify-center">
            {{ header.text }}
            <span v-if="header.sortable" class="ml-1">
              <span v-if="sortBy === header.value && sortDirection === 'ASC'">
                ▲
              </span>
              <span
                v-else-if="sortBy === header.value && sortDirection === 'DESC'"
              >
                ▼
              </span>
              <span v-else class="text-gray-300"> ⇅ </span>
            </span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in displayedUsers"
        :key="index"
        class="mt-5 rounded-xl text-center hover:shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] h-15"
      >
        <td>{{ user.userName }}</td>
        <td>{{ user.fullName }}</td>
        <td>{{ user.dob }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.role }}</td>
        <td>
          <div v-if="option === ROLE.ADMIN">
            <button
              class="px-2 mr-2 w-15 text-center py-1 bg-green"
              @click="handleUpdate(user._id)"
            >
              Edit
            </button>
            <button
              class="px-2 mr-2 w-15 text-center py-1 bg-red"
              @click="handleDelete(user._id)"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-end items-center mb-3 mt-5">
    <div>
      <label for="itemsPerPage"> Số lượng hiển thị:</label>
      <select
        id="itemsPerPage"
        :value="itemsPerPage"
        class="ml-2 p-1 border rounded w-10"
        @change="
          handleItemsPerPageChange(($event.target as HTMLSelectElement)?.value)
        "
      >
        <option
          v-for="(option, index) in perPageOptions"
          :key="index"
          :value="option"
        >
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

<script setup lang="ts">
import { ROLE } from '../../../constants/enum'
import { ListUserProps } from './config'

defineProps<ListUserProps>()

const emit = defineEmits([
  'update-page',
  'prev-page',
  'next-page',
  'update-items-per-page',
  'sort',
])

const updatePage = (page: number) => {
  emit('update-page', page)
}

const handleItemsPerPageChange = (value: string) => {
  const numValue = parseInt(value, 10)
  emit('update-items-per-page', numValue)
  updatePage(1)
}

const prevPage = () => {
  emit('prev-page')
}

const nextPage = () => {
  emit('next-page')
}

const handleHeaderClick = (header: { value: string; sortable?: boolean }) => {
  if (header.sortable) {
    emit('sort', header.value)
  }
}
</script>
