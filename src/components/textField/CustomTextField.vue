<!-- <template>
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
  errorMessage: String,
})

const { value: field, errorMessage } = useField(() => props.name!)
</script> -->

<template>
  <v-responsive class="mx-auto" max-width="500">
    <v-text-field
      :model-value="modelValue"
      :type="props.type"
      :label="props.label"
      :error-messages="errorMessage"
      @input="onInput"
      @blur="handleBlur"
    ></v-text-field>
  </v-responsive>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { ref, watch } from 'vue'

const props = defineProps({
  name: String,
  label: String,
  type: { type: String, default: 'text' },
  errorMessage: String,
  modelValue: String, // Thêm dòng này
  trimOnInput: { type: Boolean, default: false },
  trimOnBlur: { type: Boolean, default: true },
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

// // Xử lý trim khi blur (mất focus)
const handleBlur = () => {
  if (props.trimOnBlur && typeof field.value === 'string') {
    field.value = field.value.trim()
  }
}

watch(
  () => field.value,
  (newValue) => {
    if (typeof newValue === 'string' && props.trimOnBlur) {
      // Cập nhật lại field.value sau khi trim
      field.value = newValue.trim()
    }
  }
)
</script>
