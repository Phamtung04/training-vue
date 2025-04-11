<script setup lang="ts">
import { computed } from 'vue'
import CustomSelectField from '../../../components/textField/CustomSelectField.vue'
import CustomTextField from '../../../components/textField/CustomTextField.vue'
import { GENDER, ROLE } from '../../../constants/enum'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  values: any
  setFieldValue: (field: string, value: any) => void
}>()

const { t } = useI18n()

const genderValue = computed({
  get: () => props.values.gender,
  set: (value) => props.setFieldValue('gender', value),
})

const roleValue = computed({
  get: () => props.values.role,
  set: (value) => props.setFieldValue('role', value),
})

const updateGender = (value: any) => {
  props.setFieldValue('gender', value)
}

const updateRole = (value: any) => {
  props.setFieldValue('role', value)
}

const optionRole = [
  { label: t('registerContainer.admin'), value: ROLE.ADMIN },
  { label: t('registerContainer.user'), value: ROLE.USER },
]

const optionGender = [
  { label: t('registerContainer.male'), value: GENDER.MALE },
  { label: t('registerContainer.female'), value: GENDER.FEMALE },
]
</script>

<template>
  <div>
    <CustomTextField
      class="mb-3"
      name="userName"
      :label="t('registerContainer.userName')"
      type="text"
    />
    <CustomTextField
      class="mb-3"
      name="fullName"
      :label="t('registerContainer.fullName')"
      type="text"
    />
    <CustomTextField
      class="mb-3"
      name="email"
      :label="t('registerContainer.email')"
      type="email"
    />
    <CustomTextField
      class="mb-3"
      name="dob"
      :label="t('registerContainer.birthday')"
      type="date"
    />
    <CustomTextField
      class="mb-3"
      name="phoneNumber"
      :label="t('registerContainer.phone')"
      type="text"
    />
    <CustomSelectField
      class="mb-3"
      name="gender"
      :item="optionGender"
      :label="t('registerContainer.gender')"
      :model-value="genderValue"
      @update:model-value="updateGender"
    />
    <CustomSelectField
      class="mb-3"
      name="role"
      :item="optionRole"
      :label="t('registerContainer.role')"
      :model-value="roleValue"
      @update:model-value="updateRole"
    />
    <CustomTextField
      class="mb-3"
      name="password"
      :label="t('registerContainer.password')"
      type="password"
    />
    <CustomTextField
      class="mb-3"
      name="confirmPassword"
      :label="t('registerContainer.confirmPassword')"
      type="password"
    />
  </div>
</template>
