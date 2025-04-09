<template>
  <v-form class="flex items-center mt-10">
    <CustomTextField
      name="searchUserName"
      label="Search username"
      type="text"
      v-model="searchValue.userName"
    />
    <CustomTextField
      name="searchFullName"
      label="Search fullname"
      type="text"
      v-model="searchValue.fullName"
    />
    <CustomSelectField
      name="role"
      :item="optionRole"
      label="Role"
      v-model="searchValue.role"
    />
    <v-btn class="mb-5" color="primary" height="54px" @click="handleSearch"
      >Search</v-btn
    >
  </v-form>

  <ListUser
    :headers="headers"
    :displayedUsers="displayedUsers"
    :itemsPerPage="itemsPerPage"
    :perPageOptions="perPageOptions"
    :currentPage="currentPage"
    :totalItems="totalItems"
    :totalPages="totalPages"
    :startItem="startItem"
    :endItem="endItem"
    :option="option"
    :handleUpdate="handleUpdate"
    :handleDelete="handleDelete"
    :sortBy="sortBy"
    :sortDirection="sortDirection"
    @update-page="updatePage"
    @prev-page="prevPage"
    @next-page="nextPage"
    @update-items-per-page="handleUpdateItemsPerPage"
    @sort="handleSort"
  />
</template>
<script setup lang="ts">
import CustomSelectField from '../../../components/textField/CustomSelectField.vue'
import CustomTextField from '../../../components/textField/CustomTextField.vue'
import { ref, computed, watch, toRaw, onMounted, watchEffect } from 'vue'
import ListUser from './ListUser.vue'
import { ROLE } from '../../../constants/enum'
import { QueryClient, useMutation, useQuery } from '@tanstack/vue-query'
import { userService } from '../../../config/apiService/userService'
import { formatDate } from '../../../utils/timeUtils'
import { User } from './config'
import { useAlert } from '../../../composable/useAlert'

const { success, error, confirm } = useAlert()
const sortBy = ref<string>('')
const sortDirection = ref<'ASC' | 'DESC'>('ASC')

const option = 1
const itemsPerPage = ref(3)
const perPageOptions = ref([3, 5, 10, 15, 20])
const currentPage = ref(1)
const totalItems = computed(() => userList.value?.data?.totalDocs || 0)
const searchValue = ref({ userName: '', fullName: '', role: '' })
const appliedSearchValue = ref({ userName: '', fullName: '', role: '' })
const users = computed<User[]>(() => userList.value?.data?.docs || [])

const optionRole = [
  { label: 'All', value: '' },
  { label: 'Admin', value: ROLE.ADMIN },
  { label: 'User', value: ROLE.USER },
]

const {
  data: userList,
  isLoading,
  refetch,
} = useQuery({
  queryKey: [
    'userList',
    currentPage,
    itemsPerPage,
    sortBy,
    sortDirection,
    appliedSearchValue,
  ],
  queryFn: () =>
    userService.listUser(
      currentPage.value,
      itemsPerPage.value,
      sortBy.value,
      sortDirection.value,
      {
        userName: appliedSearchValue.value.userName,
        fullName: appliedSearchValue.value.fullName,
        role: appliedSearchValue.value.role,
      }
    ),
  select: (data) => data.data,
  refetchOnWindowFocus: false,
})

const headers = ref([
  { value: 'userName', sortable: true, text: 'Username' },
  { value: 'fullName', sortable: true, text: 'Fullname' },
  { value: 'dob', sortable: true, text: 'Birthday' },
  { value: 'email', sortable: true, text: 'Email' },
  { value: 'Role', sortable: false, text: 'Role' },
  { value: 'Actions', sortable: false, text: 'Actions' },
])

const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
)

const displayedUsers = computed(() =>
  users.value.map((user) => ({
    ...user,
    dob: formatDate(user.dob),
    role: user.role === ROLE.ADMIN.toString() ? 'Admin' : 'User',
  }))
)

const startItem = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
)

const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'ASC' ? 'DESC' : 'ASC'
  } else {
    sortBy.value = column
    sortDirection.value = 'ASC'
  }

  currentPage.value = 1
}

const updatePage = (page: number) => {
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

const handleUpdateItemsPerPage = (event: number) => {
  itemsPerPage.value = event
  updatePage(1)
}

const handleUpdate = (id: string) => {
  console.log('Update user with id:', id)
}

const { mutate: deleteUser } = useMutation({
  mutationFn: async (id: string) => {
    await userService.deleteUser({ id })
  },
  onSuccess: () => {
    console.log('User deleted successfully')
    refetch()
  },
  onError: (error) => {
    console.error('Error deleting user:', error)
  },
})

const handleDelete = async (id: string) => {
  console.log('Delete user with id:', id)

  const isOk = await confirm('Bạn có chắc muốn xóa người dùng này không?')

  if (isOk) {
    try {
      deleteUser(id)
      success('Xóa người dùng thành công!')
    } catch (e) {
      error('Xóa thất bại, vui lòng thử lại!')
    }
  }
}

const handleSearch = () => {
  appliedSearchValue.value = { ...searchValue.value }
  currentPage.value = 1
}
</script>
