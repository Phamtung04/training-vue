<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CustomSelectField from '../../textField/CustomSelectField.vue'

const { locale } = useI18n()

const languageOptions = [
  { label: 'Vi', value: 'vi' },
  { label: 'En', value: 'en' },
]

const changeLanguage = (val: string) => {
  locale.value = val
  localStorage.setItem('lang', val)
}
</script>

<template>
  <CustomSelectField
    class="mr-5"
    max-width="100"
    max-height="50"
    name="lang"
    :item="languageOptions"
    :model-value="locale"
    @update:model-value="changeLanguage"
  />
</template>
