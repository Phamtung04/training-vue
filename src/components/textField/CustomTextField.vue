<template>
  <v-responsive class="mx-auto" max-width="500">
    <v-text-field
      :model-value="modelValue"
      :type="props.type"
      :label="props.label"
      :error-messages="errorMessage"
      @input="onInput"
      @blur="handleBlur"
      :disabled="props.disabled"
    ></v-text-field>
  </v-responsive>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { watch } from 'vue'

const props = defineProps({
  name: String,
  label: String,
  type: { type: String, default: 'text' },
  errorMessage: String,
  modelValue: String,
  trimOnInput: { type: Boolean, default: false },
  trimOnBlur: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])

const { value: field, errorMessage } = useField(() => props.name!)

const onInput = (e: Event) => {
  const inputValue = (e.target as HTMLInputElement).value
  emit('update:modelValue', inputValue)

  if (props.trimOnInput && typeof field.value === 'string') {
    field.value = inputValue.trim()
  } else {
    field.value = inputValue
  }
}

const handleBlur = () => {
  if (props.trimOnBlur && typeof field.value === 'string') {
    field.value = field.value.trim()
  }
}

watch(
  () => field.value,
  (newValue) => {
    if (typeof newValue === 'string' && props.trimOnBlur) {
      field.value = newValue.trim()
    }
  }
)
</script>
