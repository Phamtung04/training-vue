<template>
  <div class="text-center">
    <v-menu open-on-click>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" class="w-12 h-12 rounded-full"
          ><v-avatar>
            <v-img
              :src="
                userToken?.avatar
                  ? `${BASE_URL}${userToken.avatar}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDyMe5CIk86B4cEY1L_gpvJZa7j3vWcJp8w&s'
              "
            ></v-img>
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
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { getUserInfo } from '../../../composable/useUserToken/useUserToken'

const { t } = useI18n()
const router = useRouter()
const userToken = getUserInfo()
const BASE_URL = import.meta.env.VITE_BASE_URL_IMAGE

const items = computed(() => [
  {
    avatar: userToken?.avatar
      ? `${BASE_URL}${userToken.avatar}`
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuDyMe5CIk86B4cEY1L_gpvJZa7j3vWcJp8w&s',
    email: userToken.email,
    title: t('menuContainer.logout'),
  },
])

const handleClick = () => {
  localStorage.removeItem('training_vue_token_access')
  router.push('/login')
}
</script>
