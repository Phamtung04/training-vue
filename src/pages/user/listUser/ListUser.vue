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
          <div v-if="option === ROLE.ADMIN.toString()">
            <button
              class="px-2 mr-2 w-10 text-center py-1 bg-transparent"
              @click="emit('handle-update', user._id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="#0118D8"
                  d="M2 17V20H10V18.11H3.9V17C3.9 16.36 7.03 14.9 10 14.9C10.96 14.91 11.91 15.04 12.83 15.28L14.35 13.76C12.95 13.29 11.5 13.03 10 13C7.33 13 2 14.33 2 17M10 4C7.79 4 6 5.79 6 8S7.79 12 10 12 14 10.21 14 8 12.21 4 10 4M10 10C8.9 10 8 9.11 8 8S8.9 6 10 6 12 6.9 12 8 11.11 10 10 10M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.86 11.14 20.21 11.14 20.42 11.35L21.7 12.63C21.91 12.84 21.91 13.19 21.7 13.4M12 18.94L18.06 12.88L20.11 14.88L14.11 20.95H12V18.94"
                />
              </svg>
            </button>
            <button
              class="px-2 mr-2 w-10 text-center py-1 bg-transparent"
              @click="handleDelete(user._id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="red"
                  d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                />
              </svg>
            </button>
          </div>
          <div v-else>
            <p class="text-red-400">{{ t('tableContainer.noPermission') }}</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="flex justify-end items-center mb-3 mt-5">
    <div>
      <label for="itemsPerPage">{{
        t('tableContainer.labelRowsPerPage')
      }}</label>
      <div class="ml-2 relative inline-block justify-between">
        <select
          id="itemsPerPage"
          :value="itemsPerPage"
          class="border rounded w-10"
          @change="
            handleItemsPerPageChange(
              ($event.target as HTMLSelectElement)?.value
            )
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
        <div
          class="pointer-events-none absolute inset-y-0 right-1 flex items-center text-gray-700"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
    <div>
      {{ t('tableContainer.display') }} {{ startItem }} - {{ endItem }}
      {{ t('tableContainer.of') }} {{ totalItems }}
      {{ t('tableContainer.user') }}
    </div>
    <div class="flex items-center gap-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        <
      </button>

      <span
        >{{ t('tableContainer.page') }} {{ currentPage }} /
        {{ totalPages }}</span
      >

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
import { useI18n } from 'vue-i18n'
import { ROLE } from '../../../constants/enum'
import { ListUserProps } from './config'

defineProps<ListUserProps>()
const { t } = useI18n()
const emit = defineEmits([
  'update-page',
  'prev-page',
  'next-page',
  'update-items-per-page',
  'sort',
  'handle-update',
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
