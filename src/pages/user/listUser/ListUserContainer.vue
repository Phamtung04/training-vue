<template>
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
import { ref, computed } from 'vue'
import ListUser from './ListUser.vue'

const sortBy = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')

const users = ref([
  {
    id: '8172711',
    Username: 'john_doe',
    Fullname: 'John Doe',
    Birthday: '1990-05-15',
    Email: 'john@example.com',
    Role: 'Admin',
    Other: 'N/A',
  },
  {
    id: '8172712',
    Username: 'jane_smith',
    Fullname: 'Jane Smith',
    Birthday: '1992-07-20',
    Email: 'jane@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    id: '8172713',
    Username: 'alice_jones',
    Fullname: 'Alice Jones',
    Birthday: '1988-11-30',
    Email: 'alice@example.com',
    Role: 'Moderator',
    Other: 'N/A',
  },
  {
    id: '8172714',
    Username: 'bob_brown',
    Fullname: 'Bob Brown',
    Birthday: '1995-02-25',
    Email: 'bob@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    id: '8172715',
    Username: 'charlie_clark',
    Fullname: 'Charlie Clark',
    Birthday: '1993-09-10',
    Email: 'charlie@example.com',
    Role: 'Admin',
    Other: 'N/A',
  },
  {
    id: '8172716',
    Username: 'david_white',
    Fullname: 'David White',
    Birthday: '1991-12-05',
    Email: 'david@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    id: '8172717',
    Username: 'emily_davis',
    Fullname: 'Emily Davis',
    Birthday: '1998-06-18',
    Email: 'emily@example.com',
    Role: 'Moderator',
    Other: 'N/A',
  },
  {
    id: '8172718',
    Username: 'frank_miller',
    Fullname: 'Frank Miller',
    Birthday: '1987-04-12',
    Email: 'frank@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    id: '8172719',
    Username: 'david_white',
    Fullname: 'David White',
    Birthday: '1991-12-05',
    Email: 'david@example.com',
    Role: 'User',
    Other: 'N/A',
  },
  {
    id: '8172720',
    Username: 'emily_davis',
    Fullname: 'Emily Davis',
    Birthday: '1998-06-18',
    Email: 'emily@example.com',
    Role: 'Moderator',
    Other: 'N/A',
  },
  {
    id: '8172721',
    Username: 'frank_miller',
    Fullname: 'Frank Miller',
    Birthday: '1987-04-12',
    Email: 'frank@example.com',
    Role: 'User',
    Other: 'N/A',
  },
])

const headers = ref([
  { value: 'Username', sortable: true },
  { value: 'Fullname', sortable: true },
  { value: 'Birthday', sortable: true },
  { value: 'Email', sortable: true },
  { value: 'Role', sortable: false },
  { value: 'Other', sortable: false },
])
const option = 1
const itemsPerPage = ref(3)
const perPageOptions = ref([3, 5, 10, 15])
const currentPage = ref(1)

const totalItems = computed(() => users.value.length)
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value)
)

const displayedUsers = computed(() => {
  let sortedUsers = [...users.value]

  if (sortBy.value) {
    sortedUsers.sort((a, b) => {
      const fieldA = a[sortBy.value]
      const fieldB = b[sortBy.value]

      if (sortBy.value === 'Birthday') {
        const dateA = new Date(fieldA)
        const dateB = new Date(fieldB)
        return sortDirection.value === 'asc'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime()
      }

      if (sortDirection.value === 'asc') {
        return fieldA.localeCompare(fieldB)
      } else {
        return fieldB.localeCompare(fieldA)
      }
    })
  }

  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return sortedUsers.slice(start, end)
})

const startItem = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1
)
const endItem = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
)

const handleSort = (column: string) => {
  if (sortBy.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = column
    sortDirection.value = 'asc'
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

const handleDelete = (id: string) => {
  console.log('Delete user with id:', id)
  const index = users.value.findIndex((user) => user.id === id)
  if (index !== -1) {
    users.value.splice(index, 1)
  }
}
</script>
