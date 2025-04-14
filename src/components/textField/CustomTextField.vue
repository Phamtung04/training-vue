<template>
  <v-responsive class="mx-auto" max-width="500">
    <v-text-field
      v-model="field"
      :type="props.type"
      :label="props.label"
      :error-messages="errorMessage"
      @blur="handleBlur"
      :disabled="props.disabled"
    />
  </v-responsive>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { watch } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
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

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== field.value) {
      field.value = newVal
    }
  }
)

watch(field, (newVal) => {
  if (props.trimOnInput && typeof newVal === 'string') {
    const trimmed = newVal.trim()
    if (trimmed !== newVal) {
      field.value = trimmed
      return
    }
  }
  emit('update:modelValue', newVal)
})

const handleBlur = () => {
  if (props.trimOnBlur && typeof field.value === 'string') {
    const trimmed = field.value.trim()
    if (trimmed !== field.value) {
      field.value = trimmed
    }
  }
}
</script>
