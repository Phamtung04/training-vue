<template>
  <div class="w-[500px]">
    <div>
      <CustomUploadImage
        name="avatar"
        :model-value="values.avatar"
        @update:model-value="(value) => props.setFieldValue('avatar', value)"
        class="w-32 mb-5"
      />
    </div>
    <div>
      <CustomTextField
        class="mb-3"
        :model-value="props.values.email"
        name="email"
        label="email"
        type="email"
      />
    </div>
    <div class="flex">
      <CustomTextField
        class="mb-3 w-[80px]"
        :model-value="props.values.userName"
        name="userName"
        label="userName"
        type="text"
      />
      <CustomTextField
        class="mb-3 w-[80px] ml-2"
        :model-value="props.values.fullName"
        name="fullName"
        label="Full name"
        type="text"
      />
    </div>
    <div class="flex">
      <CustomTextField
        class="mb-3 w-[80px]"
        :model-value="dayjs(dobValue).format('YYYY-MM-DD') || dobValue"
        name="dob"
        label="birthday"
        type="date"
      />
      <CustomTextField
        class="mb-3 w-[80px] ml-2"
        :model-value="props.values.phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        type="text"
        @update:model-value="
          (value) => props.setFieldValue('phoneNumber', value)
        "
      />
    </div>
    <div class="flex">
      <CustomSelectField
        :model-value="genderValue"
        @update:model-value="updateGender"
        class="mb-3 w-[80px]"
        name="gender"
        :item="optionGender"
        label="Gender"
      />
      <CustomSelectField
        :model-value="roleValue"
        @update:model-value="updateRole"
        class="mb-3 w-[80px] ml-2"
        name="role"
        :item="optionRole"
        label="Role"
      />
    </div>
    <div>
      <CustomTextField
        class="mb-3"
        :model-value="props.values.description"
        name="description"
        label="Description"
        type="text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CustomSelectField from '../../../components/textField/CustomSelectField.vue'
import CustomTextField from '../../../components/textField/CustomTextField.vue'
import { GENDER, ROLE } from '../../../constants/enum'
import CustomUploadImage from '../../../components/textField/CustomUploadImage.vue'
import dayjs from 'dayjs'

const props = defineProps<{
  values: any
  setFieldValue: (field: string, value: any) => void
  userData: any
}>()

// Computed properties với getter và setter
const genderValue = computed({
  get: () => (props.values.gender == GENDER.MALE ? 'Male' : 'Female'),
  set: (value) => props.setFieldValue('gender', value),
})

const roleValue = computed({
  get: () => (props.values.role == ROLE.ADMIN ? 'Admin' : 'User'),
  set: (value) => props.setFieldValue('role', value),
})

const dobValue = computed({
  get: () => props.values.dob,
  set: (value) => props.setFieldValue('dob', value),
})

// Hoặc sử dụng hàm update riêng
const updateGender = (value: any) => {
  props.setFieldValue('gender', value)
}

const updateRole = (value: any) => {
  props.setFieldValue('role', value)
}

const optionRole = [
  { label: 'Admin', value: ROLE.ADMIN },
  { label: 'User', value: ROLE.USER },
]

const optionGender = [
  { label: 'Male', value: GENDER.MALE },
  { label: 'Female', value: GENDER.FEMALE },
]
</script>

<style scoped></style>
