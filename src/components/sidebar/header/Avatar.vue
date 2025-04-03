<template>
  <div class="text-center">
    <v-menu open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props"
          ><v-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-container>
          <div v-for="(item, index) in items" :key="index" :value="index">
            <div class="flex items-center w-58">
              <v-avatar color="brown" size="large">
                <v-img alt="John" :src="item.avatar"></v-img>
              </v-avatar>
              <v-list-item-title class="ml-3">{{
                item.email
              }}</v-list-item-title>
            </div>

            <v-btn class="mt-3" @click="handleClick">{{ item.title }}</v-btn>
          </div>
        </v-container>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const items = [
  {
    avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
    email: 'John@example.com',
    title: 'Logout',
  },
]

const handleClick = () => {
  localStorage.removeItem('training_vue_token_access')
  router.push('/login')
}
</script>
