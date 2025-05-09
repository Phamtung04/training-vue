<template>
  <v-container
    class="w-full rounded-xl shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] md:mt-0 sm:max-w-md xl:p-0"
    max-width="400"
  >
    <h3 class="text-center text-4xl font-semibold">
      {{ t('resetPasswordContainer.reset') }}
    </h3>
    <p class="text-center font-thin">
      {{ t('resetPasswordContainer.rememberYourPassword') }}
      <router-link to="/login" class="text-blue-400">{{
        t('resetPasswordContainer.login')
      }}</router-link>
    </p>

    <v-form @submit="onSubmit">
      <ForgotPassword />
      <v-btn
        type="submit"
        class="w-[345px] ml-3"
        color="primary"
        :loading="mutation.isPending.value"
        >{{ t('resetPasswordContainer.continue') }}</v-btn
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
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()
const { errorNotify } = useAlert()
const { handleSubmit, setFieldError } = useForm({
  validationSchema: forgotPasswordSchema,
})

const mutation = useMutation({
  mutationFn: authService.forgotPassword,
  onSuccess: () => {
    router.push('/password-code')
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
})
</script>

<style scoped></style>
