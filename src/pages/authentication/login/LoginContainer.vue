<template>
  <v-container
    class="w-full rounded-xl shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] md:mt-0 sm:max-w-md xl:p-0"
    max-width="400"
  >
    <h3 class="text-center text-4xl mt-5 font-semibold">Login</h3>
    <v-form @submit="onSubmit" class="w-[370px] mx-auto">
      <Login />
      <router-link class="text-blue-400 float-right mr-3" to="/forgot-password"
        >Forgot password?</router-link
      >
      <v-btn class="w-[345px] mt-5 ml-3" color="primary" type="submit">
        Login
      </v-btn>
    </v-form>
    <p class="text-center mt-5">
      If you don't have an account?
      <router-link to="/register" class="text-blue-400"> Register </router-link>
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import Login from './Login.vue'
import { loginSchema } from './config'
import { useRouter } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import { authService } from '../../../config/apiService/authService'

const { handleSubmit, setFieldError } = useForm({
  validationSchema: loginSchema,
})

const router = useRouter()

const mutate = useMutation({
  mutationFn: authService.login,
  onSuccess: (dataAuth) => {
    router.push('/user')
    localStorage.setItem(
      'training_vue_token_access',
      dataAuth.data.data.accessToken
    )
    console.log('success', dataAuth)
  },
  onError: (error: any) => {
    const errorMessages = error?.validationErrors || {}
    console.log('error', errorMessages)

    errorMessages.forEach(
      ({ field, message }: { field: string; message: string }) => {
        setFieldError(field, message)
      }
    )
    console.log('error', error)
  },
})

const onSubmit = handleSubmit((data) => {
  mutate.mutate(data)
  console.log(data)
})
</script>

<style scoped></style>
