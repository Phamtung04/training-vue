<template>
  <v-form class="flex items-center mt-2 mb-5">
    <CustomTextField
      class="ml-2"
      name="searchUserName"
      :label="t('searchContainer.searchByUserName')"
      type="text"
      v-model="searchValue.userName"
    />
    <CustomTextField
      class="ml-2"
      name="searchFullName"
      :label="t('searchContainer.searchByFullName')"
      type="text"
      v-model="searchValue.fullName"
    />
    <CustomSelectField
      class="ml-2 w-[100px]"
      name="role"
      :item="optionRole"
      :label="t('searchContainer.searchByRole')"
      v-model="searchValue.role"
    />
    <v-btn
      class="mb-5 ml-2 w-26"
      color="primary"
      height="54px"
      @click="handleSearch"
      >{{ t('searchContainer.buttonSearch') }}</v-btn
    >
    <v-btn
      class="mb-5 ml-2 w-26"
      color="error"
      height="54px"
      @click="handleClearSearch"
      >{{ t('searchContainer.buttonClear') }}</v-btn
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
    :option="option || ''"
    :handleUpdate="handleUpdate"
    :handleDelete="handleDelete"
    :sortBy="sortBy"
    :sortDirection="sortDirection"
    :userToken="userToken"
    @update-page="updatePage"
    @prev-page="prevPage"
    @next-page="nextPage"
    @update-items-per-page="handleUpdateItemsPerPage"
    @sort="handleSort"
    @handle-update="handleUpdate"
    :isLoading="isLoading"
  />

  <UpdateUserContainer
    :isShow="isShowUpdate"
    :id="selectedUserId"
    :userData="selectedUser"
    @close="isShowUpdate = false"
  />
</template>
<script setup lang="ts">
import CustomSelectField from '../../../components/textField/CustomSelectField.vue'
import CustomTextField from '../../../components/textField/CustomTextField.vue'
import { ref, computed } from 'vue'
import ListUser from './ListUser.vue'
import { ROLE } from '../../../constants/enum'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { userService } from '../../../config/apiService/userService'
import { formatDate } from '../../../utils/timeUtils'
import { User } from './config'
import { useAlert } from '../../../composable/useAlert'
import { VALIDATE_CODES } from '../../../constants/validateCode'
import { getUserInfo } from '../../../composable/useUserToken/useUserToken'
import UpdateUserContainer from '../updateUser/UpdateUserContainer.vue'
import { useI18n } from 'vue-i18n'

const { successNotify, errorNotify, confirm } = useAlert()
const sortBy = ref<string>('')
const sortDirection = ref<'ASC' | 'DESC'>('ASC')
const userToken = getUserInfo()
const { t } = useI18n()
const option = userToken?.role
const itemsPerPage = ref(5)
const perPageOptions = ref([5, 10, 15, 20])
const currentPage = ref(1)
const totalItems = computed(() => userList.value?.data?.totalDocs || 0)
const searchValue = ref({ userName: '', fullName: '', role: '' })
const appliedSearchValue = ref({ userName: '', fullName: '', role: '' })
const users = computed<User[]>(() => userList.value?.data?.docs || [])
const isShowUpdate = ref(false)
const selectedUserId = ref('')
const selectedUser = ref({})

const optionRole = computed(() => [
  { label: t('searchContainer.all'), value: '' },
  { label: t('searchContainer.admin'), value: ROLE.ADMIN },
  { label: t('searchContainer.user'), value: ROLE.USER },
])

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

const headers = computed(() => [
  { value: 'userName', sortable: true, text: t('tableContainer.userName') },
  { value: 'fullName', sortable: true, text: t('tableContainer.fullName') },
  { value: 'dob', sortable: true, text: t('tableContainer.birthday') },
  { value: 'email', sortable: true, text: t('tableContainer.email') },
  { value: 'Role', sortable: false, text: t('tableContainer.role') },
  { value: 'Actions', sortable: false, text: t('tableContainer.action') },
])

const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
)

const displayedUsers = computed(() =>
  users.value.map((user) => ({
    ...user,
    dob: formatDate(user.dob),
    role:
      user.role === ROLE.ADMIN.toString()
        ? t('tableContainer.admin')
        : t('tableContainer.user'),
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

const handleUpdate = (userId: string) => {
  selectedUserId.value = userId
  isShowUpdate.value = true
}

const { mutate: deleteUser } = useMutation({
  mutationFn: async (id: string) => {
    await userService.deleteUser({ id })
  },
  onSuccess: () => {
    refetch()
  },
  onError: (error) => {
    console.error('Error deleting user:', error)
  },
})

const handleDelete = async (id: string) => {
  const isOk = await confirm(t('actionContainer.message'))

  if (isOk) {
    try {
      deleteUser(id)
      successNotify(VALIDATE_CODES.I0001)
    } catch (e) {
      errorNotify(VALIDATE_CODES.I0002)
    }
  }
}

const handleSearch = () => {
  appliedSearchValue.value = { ...searchValue.value }

  sortBy.value = ''
  sortDirection.value = 'ASC'

  currentPage.value = 1
}

const handleClearSearch = () => {
  searchValue.value = { userName: '', fullName: '', role: '' }
  appliedSearchValue.value = { ...searchValue.value }

  sortBy.value = ''
  sortDirection.value = 'ASC'

  currentPage.value = 1
}
</script>
