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
const items = [
  {
    label: 'User',
    icon: 'mdi-view-dashboard',
    to: '/user',
  },
  {
    label: 'Oder',
    icon: 'mdi-account',
    to: '/order',
  },
]
</script>

<style scoped></style>
