<template>
  <div class="bg-[#f1f1f1] rounded-lg overflow-hidden">
    <table>
      <thead>
        <tr class="h-10">
          <th
            v-for="(header, index) in headers"
            :key="index"
            class="w-40 text-center cursor-pointer"
            @click="handleHeaderClick(header)"
          >
            <div class="flex items-center bg-[#9810fa] justify-center h-16">
              {{ header.text }}
              <span v-if="header.sortable" class="ml-1">
                <span v-if="sortBy === header.value && sortDirection === 'ASC'">
                  ▲
                </span>
                <span
                  v-else-if="
                    sortBy === header.value && sortDirection === 'DESC'
                  "
                >
                  ▼
                </span>
                <span v-else class="text-gray-300"> ⇅ </span>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="overflow-auto custom-scrollbar">
        <tr
          v-for="(user, index) in displayedUsers"
          v-if="!isLoading"
          :key="index"
          class="focus:outline-none focus:ring-1 focus:ring-purple-300 focus:border-purple-300 border border-gray-200 text-center hover:shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] h-15"
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
                v-if="user._id !== userToken?._id"
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
              <button
                v-else
                class="px-2 mr-2 w-10 text-center py-1 bg-transparent"
                @click="deleteUser()"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    fill="gray"
                    d="M2 5.27L3.28 4L5 5.72L5.28 6L6.28 7L18 18.72L20 20.72L18.73 22L17.27 20.54C16.93 20.83 16.5 21 16 21H8C6.9 21 6 20.1 6 19V9.27L2 5.27M19 4V6H7.82L5.82 4H8.5L9.5 3H14.5L15.5 4H19M18 7V16.18L8.82 7H18Z"
                  />
                </svg>
              </button>
            </div>
            <div v-else>
              <p class="text-red-400">
                {{ t('tableContainer.noPermission') }}
              </p>
            </div>
          </td>
        </tr>
        <div v-else>
          <div
            role="status"
            class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2"
          >
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </tbody>
    </table>

    <div class="flex justify-end items-center mb-3 mt-5">
      <div class="mr-5">
        <label for="itemsPerPage">{{
          t('tableContainer.labelRowsPerPage')
        }}</label>
        <div class="ml-2 relative inline-block justify-between">
          <select
            id="itemsPerPage"
            :value="itemsPerPage"
            class="rounded w-10 focus:outline-none"
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
      <div class="mr-4">
        {{ startItem }} - {{ endItem }} {{ t('tableContainer.of') }}
        {{ totalItems }}
      </div>
      <div class="flex items-center">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <
        </button>

        <span> {{ currentPage }} / {{ totalPages }}</span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ROLE } from '../../../constants/enum'
import { ListUserProps } from './config'
import { useAlert } from '../../../composable/useAlert'

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

const { warning } = useAlert()

const deleteUser = () => {
  warning(t('tableContainer.deleteNotify'))
}

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

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2dfe5;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #e2dfe5;
}
</style>
