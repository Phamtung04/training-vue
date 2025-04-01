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
      <v-btn type="submit" class="w-[345px] ml-3" color="primary">Send</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import ForgotPassword from './ForgotPassword.vue'
import { forgotPasswordSchema } from './config'
import { useRouter } from 'vue-router'

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: forgotPasswordSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
  router.push('/password-code')
})
</script>

<style scoped></style>
