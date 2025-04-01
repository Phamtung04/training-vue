<template>
  <v-container
    class="w-full rounded-3xl shadow-[0_2px_15px_3px_rgba(0,0,0,0.07),0_10px_20px_2px_rgba(0,0,0,0.04)] md:mt-0 sm:max-w-md xl:p-0"
    max-width="400"
  >
    <h3 class="text-center text-4xl mt-5 font-semibold">Register</h3>

    <v-form @submit="onSubmit" class="w-[370px] mx-auto">
      <div class="mx-auto mt-5 h-96 overflow-y-auto scrollbar-hide">
        <Register />
      </div>
      <v-btn class="w-[345px] mt-5 ml-1" color="primary" type="submit">
        Register
      </v-btn>
    </v-form>
    <p class="text-center mt-5">
      If you have already account?
      <router-link to="/login" class="text-blue-400"> Login </router-link>
    </p>
  </v-container>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import Register from './Register.vue'
import { validationSchema } from './config'

const { handleSubmit } = useForm({
  validationSchema,
})
const onSubmit = handleSubmit((data) => {
  console.log(data)
})
</script>
