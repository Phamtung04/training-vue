<template>
  <v-container
    class="w-full rounded-xl shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] md:mt-0 sm:max-w-md xl:p-0"
    max-width="400"
  >
    <h3 class="text-center text-4xl font-semibold">Forgot Password</h3>
    <p class="text-center font-thin">
      Remember your password?
      <router-link to="/login" class="text-blue-400">Login</router-link>
    </p>

    <v-form @submit="onSubmit">
      <ForgotPassword />
      <v-btn
        type="submit"
        class="w-[345px] ml-3"
        color="primary"
        :loading="mutation.isPending.value"
        >Send</v-btn
      >
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import ForgotPassword from './ForgotPassword.vue'
import { forgotPasswordSchema } from './config'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { authService } from '../../../config/apiService/authService'
import { useAlert } from '../../../composable/useAlert'
import { VALIDATE_CODES } from '../../../constants/validateCode'

const router = useRouter()

const { handleSubmit, setFieldError } = useForm({
  validationSchema: forgotPasswordSchema,
})

const { errorNotify } = useAlert()

const mutation = useMutation({
  mutationFn: authService.forgotPassword,
  onSuccess: (dataForgot) => {
    router.push('/password-code')
    console.log('success', dataForgot)
  },
  onError: (error: any) => {
    const errorMessages = error?.validationErrors || {}

    errorMessages.forEach(
      ({ field, message }: { field: string; message: string }) => {
        setFieldError(field, message)
      }
    )
    errorNotify(VALIDATE_CODES.I0002)
    console.log('error', error)
  },
})

const onSubmit = handleSubmit((data) => {
  mutation.mutate(data)
  localStorage.setItem('training_vue_token_email', data.email)
  console.log(data)
})
</script>

<style scoped></style>
