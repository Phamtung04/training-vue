<template>
  <v-navigation-drawer>
    <v-list nav>
      <v-list-item
        v-for="(menuItem, index) in items"
        :key="index"
        :title="menuItem.label"
        :prepend-icon="menuItem.icon"
        :to="menuItem.to"
        link
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const items = computed(() => [
  {
    label: t('menuContainer.listUser'),
    icon: 'mdi-view-dashboard',
    to: '/user',
  },
  {
    label: t('menuContainer.order'),
    icon: 'mdi-account',
    to: '/order',
  },
])
</script>

<style scoped></style>
