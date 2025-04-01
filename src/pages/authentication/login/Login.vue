<template>
  <div>
    <CustomTextField class="my-3" name="email" label="email" type="email" />
    <CustomTextField
      class="mb-3"
      name="password"
      label="password"
      type="password"
    />
  </div>
</template>

<script setup lang="ts">
import CustomTextField from '../../../components/textField/CustomTextField.vue'
</script>
