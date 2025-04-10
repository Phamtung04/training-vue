<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense class="justify-center">
            <form @submit="onSubmit">
              <UpdateUser
                :userData="props.userData"
                :values="values"
                :setFieldValue="setFieldValue"
                @update:model-value="
                  (field, value) => setFieldValue(field, value)
                "
              />
              <div class="d-flex justify-end">
                <v-btn
                  text="Close"
                  variant="plain"
                  @click="closeDialog"
                ></v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  text="Save"
                  variant="tonal"
                ></v-btn>
              </div>
            </form>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import UpdateUser from './UpdateUser.vue'
import { computed, watchEffect } from 'vue'
import { updateSchema, UserProps } from './config.ts'
import { useForm } from 'vee-validate'
import { useQuery } from '@tanstack/vue-query'
import { userService } from '../../../config/apiService/userService'

const props = defineProps<UserProps>()

const { handleSubmit, values, setFieldValue, setFieldError } = useForm({
  validationSchema: updateSchema,
})

const emit = defineEmits(['close', 'update'])
const BASE_URL = import.meta.env.VITE_BASE_URL_IMAGE

const {
  data: userData,
  isLoading,
  refetch,
} = useQuery({
  queryKey: ['user', props.id],
  queryFn: () => userService.getUserById({ id: props.id }),
  select: (response) => response.data?.data,
  enabled: computed(() => !!props.id),
  staleTime: 0,
})

watchEffect(() => {
  if (props.id) {
    refetch()
  }
})

watchEffect(() => {
  if (userData.value) {
    setFieldValue('avatar', null)
    Object.keys(userData.value).forEach((key) => {
      let value = userData.value[key]
      if (key === 'avatar') {
        value = value ? BASE_URL + value : null
      }
      setFieldValue(key, value)
    })
  } else {
    setFieldValue('avatar', null)
  }
})

const dialogVisible = computed({
  get: () => props.isShow,
  set: (value) => {
    if (!value) {
      emit('close')
    }
  },
})

const closeDialog = () => {
  emit('close')
}

const onSubmit = handleSubmit((data) => {
  console.log(data)
})
</script>
