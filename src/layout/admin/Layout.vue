<template>
  <v-layout class="rounded-md">
    <Header />
    <NavBar />

    <v-main class="d-flex align-center justify-center">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Header from '../../components/sidebar/header/Header.vue'
import NavBar from '../../components/sidebar/navBar/navBar.vue'
</script>
