<template>
  <v-container
    class="w-full rounded-3xl shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] md:mt-0 sm:max-w-md xl:p-0"
    max-width="400"
  >
    <h3 class="text-center text-4xl mt-5 font-semibold">
      {{ t('registerContainer.register') }}
    </h3>

    <v-form @submit="onSubmit" class="w-[370px] mx-auto">
      <div class="mx-auto mt-5 h-96 overflow-y-auto scrollbar-hide">
        <Register
          :values="values"
          :setFieldValue="setFieldValue"
          @update:model-value="(field, value) => setFieldValue(field, value)"
        />
      </div>
      <v-btn
        class="w-[345px] mt-5 ml-1"
        color="primary"
        type="submit"
        :loading="mutation.isPending.value"
      >
        {{ t('registerContainer.register') }}
      </v-btn>
    </v-form>
    <p class="text-center mt-5">
      {{ t('registerContainer.ifYouHaveAlreadyAccount') }}
      <router-link to="/login" class="text-blue-400">
        {{ t('registerContainer.login') }}
      </router-link>
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import Register from './Register.vue'
import { validationSchema } from './config'
import { useMutation } from '@tanstack/vue-query'
import { authService } from '../../../config/apiService/authService'
import { useRouter } from 'vue-router'
import { useAlert } from '../../../composable/useAlert'
import { VALIDATE_CODES } from '../../../constants/validateCode'
import { useI18n } from 'vue-i18n'

const { handleSubmit, setFieldError, values, setFieldValue } = useForm({
  validationSchema,
})

const { successNotify, errorNotify } = useAlert()
const router = useRouter()
const { t } = useI18n()

const mutation = useMutation({
  mutationFn: authService.register,
  onSuccess: () => {
    router.push('/login')
    successNotify(VALIDATE_CODES.I0001)
  },
  onError: (error: any) => {
    const errorMessages = error?.validationErrors || {}
    console.log('error', error)
    errorNotify(error.response.data.message || VALIDATE_CODES.I0002)
    errorMessages.forEach(
      ({ field, message }: { field: string; message: string }) => {
        setFieldError(field, message)
      }
    )
  },
})

const onSubmit = handleSubmit((data) => {
  mutation.mutate(data)
})
</script>
