<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialogVisible" max-width="600">
      <v-card
        prepend-icon="mdi-account"
        :title="t('updateUserContainer.update')"
      >
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
                  :text="t('updateUserContainer.cancel')"
                  variant="plain"
                  @click="closeDialog"
                ></v-btn>
                <v-btn
                  color="primary"
                  type="submit"
                  :text="t('updateUserContainer.update')"
                  variant="tonal"
                  :loading="updateMutation.isPending.value"
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { userService } from '../../../config/apiService/userService'
import { useAlert } from '../../../composable/useAlert.ts'
import { VALIDATE_CODES } from '../../../constants/validateCode.ts'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps<UserProps>()
const emit = defineEmits(['close', 'update'])
const BASE_URL = import.meta.env.VITE_BASE_URL_IMAGE
const { successNotify, errorNotify } = useAlert()

const { handleSubmit, values, setFieldValue, setFieldError } = useForm({
  validationSchema: updateSchema,
})

const { data: userData } = useQuery({
  queryKey: ['user', props.id],
  queryFn: () => userService.getUserById({ id: props.id }),
  select: (response) => response.data?.data,
  enabled: computed(() => !!props.id && dialogVisible.value),
  staleTime: 0,
})
const queryClient = useQueryClient()

const updateMutation = useMutation({
  mutationFn: async (formData: any) => {
    const response = await userService.updateUser(formData)
    return response
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['user'] })
    successNotify(VALIDATE_CODES.I0001)
    emit('close')
  },
  onError: (error: any) => {
    errorNotify(error.response.data.message || VALIDATE_CODES.I0002)
    const errorMessages = error?.validationErrors || {}
    errorMessages.forEach(
      ({ field, message }: { field: string; message: string }) => {
        setFieldError(field, message)
      }
    )
    console.log(error)
  },
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
  const formData = new FormData()
  formData.append('id', props.id)
  formData.append('userName', values.userName)
  formData.append('fullName', values.fullName)
  formData.append('dob', values.dob)
  formData.append('gender', values.gender)
  formData.append('role', values.role)
  formData.append('phoneNumber', values.phoneNumber)
  formData.append('description', values.description ?? '')

  if (data.avatar && values.avatar instanceof File) {
    formData.append('file', values.avatar)
  }

  updateMutation.mutate(formData)
})
</script>
