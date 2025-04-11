<template>
  <div class="mt-5">
    <CustomTextField
      class="mb-3"
      name="passwordCode"
      :label="t('passCodeContainer.passCode')"
      type="text"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CustomTextField from '../../../components/textField/CustomTextField.vue'

const { t } = useI18n()
</script>

<style scoped></style>
