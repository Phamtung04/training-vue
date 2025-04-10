<template>
  <v-responsive class="mx-auto" max-width="500">
    <v-select
      :model-value="modelValue"
      :items="props.item"
      :label="props.label"
      item-title="label"
      item-value="value"
      :error-messages="errorMessage"
      @update:model-value="onInput"
    />
  </v-responsive>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: String,
  label: String,
  item: Array,
  modelValue: [String, Number],
})

const emit = defineEmits(['update:modelValue'])

const { value: field, errorMessage } = useField(() => props.name!)

const onInput = (val: string | number) => {
  emit('update:modelValue', val)
  field.value = val
}
</script>
