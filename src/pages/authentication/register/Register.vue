<script setup lang="ts">
import { computed } from 'vue'
import CustomSelectField from '../../../components/textField/CustomSelectField.vue'
import CustomTextField from '../../../components/textField/CustomTextField.vue'
import { GENDER, ROLE } from '../../../constants/enum'

const props = defineProps<{
  values: any
  setFieldValue: (field: string, value: any) => void
}>()

// Computed properties với getter và setter
const genderValue = computed({
  get: () => props.values.gender,
  set: (value) => props.setFieldValue('gender', value),
})

const roleValue = computed({
  get: () => props.values.role,
  set: (value) => props.setFieldValue('role', value),
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

<template>
  <div>
    <CustomTextField
      class="mb-3"
      name="userName"
      label="userName"
      type="text"
    />
    <CustomTextField
      class="mb-3"
      name="fullName"
      label="Full name"
      type="text"
    />
    <CustomTextField class="mb-3" name="email" label="email" type="email" />
    <CustomTextField class="mb-3" name="dob" label="birthday" type="date" />
    <CustomTextField
      class="mb-3"
      name="phoneNumber"
      label="Phone Number"
      type="text"
    />
    <CustomSelectField
      class="mb-3"
      name="gender"
      :item="optionGender"
      label="Gender"
      :model-value="genderValue"
      @update:model-value="updateGender"
    />
    <CustomSelectField
      class="mb-3"
      name="role"
      :item="optionRole"
      label="Role"
      :model-value="roleValue"
      @update:model-value="updateRole"
    />
    <CustomTextField
      class="mb-3"
      name="password"
      label="password"
      type="password"
    />
    <CustomTextField
      class="mb-3"
      name="confirmPassword"
      label="confirmPassword"
      type="password"
    />
  </div>
</template>
