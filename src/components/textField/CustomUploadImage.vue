<template>
  <div>
    <input
      type="file"
      id="avatar"
      accept="image/*"
      @change="handleChange"
      style="display: none"
    />

    <label for="avatar" class="cursor-pointer">
      <div v-if="preview">
        <img :src="preview" class="w-32 h-32 object-cover rounded-full" />
      </div>
      <div
        v-else
        class="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full"
      >
        <span class="text-gray-500">{{ t('updateUserContainer.image') }}</span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<{ modelValue: File | string | null }>()
const emit = defineEmits(['update:modelValue'])
const preview = ref<string | null>(null)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      if (typeof newVal === 'string') {
        preview.value = newVal
      } else {
        preview.value = URL.createObjectURL(newVal)
      }
    } else {
      preview.value = null
    }
  },
  { immediate: true }
)

const handleChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    preview.value = URL.createObjectURL(file)
    emit('update:modelValue', file)
  }
}
</script>
