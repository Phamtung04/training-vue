<template>
  <v-container
    class="w-full rounded-xl shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] md:mt-0 sm:max-w-md xl:p-0"
    max-width="400"
  >
    <h3 class="text-center text-4xl font-semibold">Password Code</h3>
    <v-form @submit="onSubmit">
      <PasswordCode />
      <div class="flex justify-end mr-3">
        <v-btn class="w-[100px] ml-3" color="primary" @click="onSubmitCancel"
          >Cancel</v-btn
        >
        <v-btn class="w-[100px] ml-3" color="primary" type="submit">Send</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import PasswordCode from './PasswordCode.vue'
import { passwordCodeSchema } from './config'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { authService } from '../../../config/apiService/authService'
import { useAlert } from '../../../composable/useAlert'
import { VALIDATE_CODES } from '../../../constants/validateCode'

const router = useRouter()

const { handleSubmit, setFieldError } = useForm({
  validationSchema: passwordCodeSchema,
})

const { successNotify, errorNotify } = useAlert()

const mutate = useMutation({
  mutationFn: authService.confirmForgotPassword,
  onSuccess: () => {
    router.push('/login')
    localStorage.removeItem('training_vue_token_email')
    successNotify(VALIDATE_CODES.I0001)
  },
  onError: (error: any) => {
    const errorMessages = error?.validationErrors || {}
    errorNotify(VALIDATE_CODES.I0002)
    console.log('error', errorMessages)

    errorMessages.forEach(
      ({ field, message }: { field: string; message: string }) => {
        setFieldError(field, message)
      }
    )
    console.log('error', error)
  },
})

const onSubmitCancel = () => {
  router.push('/login')
}

const onSubmit = handleSubmit((data) => {
  const email = localStorage.getItem('training_vue_token_email')
  const requestBody = { email, ...data }
  mutate.mutate(requestBody)
})
</script>

<style scoped></style>
