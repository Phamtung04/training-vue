<template>
  <div>
    <CustomTextField
      class="my-3"
      name="email"
      :label="t('loginContainer.email')"
      type="email"
    />
    <CustomTextField
      class="mb-3"
      name="password"
      :label="t('loginContainer.password')"
      type="password"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CustomTextField from '../../../components/textField/CustomTextField.vue'

const { t } = useI18n()
</script>
