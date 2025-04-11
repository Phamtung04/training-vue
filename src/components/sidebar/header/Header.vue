<template>
  <v-app-bar :title="t('menuContainer.listUser')"
    ><Avatar /> <Language
  /></v-app-bar>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Avatar from './Avatar.vue'
import Language from './Language.vue'

const { t } = useI18n()
</script>

<style scoped></style>
