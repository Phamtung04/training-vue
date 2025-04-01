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

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: passwordCodeSchema,
})

const onSubmit = handleSubmit((values) => {
  console.log(values)
})

const onSubmitCancel = () => {
  router.push('/login')
}
</script>

<style scoped></style>
