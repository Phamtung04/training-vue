<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-text-field
      v-model="field"
      :type="props.type"
      :label="props.label"
      :error-messages="errorMessage"
    ></v-text-field>
  </v-responsive>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
})

const { value: field, errorMessage } = useField(() => props.name!)
</script>
