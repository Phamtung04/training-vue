<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-select
      v-model="field"
      :items="props.item"
      :label="props.label"
      item-title="state"
      item-value="abbr"
      :error-messages="errorMessage"
    ></v-select>
  </v-responsive>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  label: String,
  item: Array,
})

const { value: field, errorMessage } = useField(() => props.name!)
</script>
