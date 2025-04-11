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
  let newValue = inputValue

  if (props.trimOnInput && typeof newValue === 'string') {
    newValue = newValue.trim()
  }

  field.value = newValue
  emit('update:modelValue', newValue)
}

const handleBlur = () => {
  if (props.trimOnBlur && typeof field.value === 'string') {
    const trimmedValue = field.value.trim()
    field.value = trimmedValue
    emit('update:modelValue', trimmedValue)
  }
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== field.value) {
      field.value = newValue
    }
  }
)

watch(
  () => field.value,
  (newValue) => {
    if (typeof newValue === 'string' && props.trimOnBlur) {
      const trimmedValue = newValue.trim()
      if (trimmedValue !== newValue) {
        field.value = trimmedValue
        emit('update:modelValue', trimmedValue)
      } else if (trimmedValue !== props.modelValue) {
        emit('update:modelValue', trimmedValue)
      }
    } else if (newValue !== props.modelValue) {
      emit('update:modelValue', newValue)
    }
  }
)
</script>
