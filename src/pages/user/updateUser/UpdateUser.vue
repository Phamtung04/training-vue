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
        :label="t('updateUserContainer.email')"
        type="email"
        disabled
      />
    </div>
    <div class="flex">
      <CustomTextField
        class="mb-3 w-[80px]"
        :model-value="props.values.userName"
        name="userName"
        :label="t('updateUserContainer.userName')"
        type="text"
      />
      <CustomTextField
        class="mb-3 w-[80px] ml-2"
        :model-value="props.values.fullName"
        name="fullName"
        :label="t('updateUserContainer.fullName')"
        type="text"
      />
    </div>
    <div class="flex">
      <CustomTextField
        class="mb-3 w-[80px]"
        :model-value="formattedDob"
        name="dob"
        :label="t('updateUserContainer.birthday')"
        type="date"
      />
      <CustomTextField
        class="mb-3 w-[80px] ml-2"
        :model-value="props.values.phoneNumber"
        name="phoneNumber"
        :label="t('updateUserContainer.phone')"
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
        :label="t('updateUserContainer.gender')"
      />
      <CustomSelectField
        :model-value="roleValue"
        @update:model-value="updateRole"
        class="mb-3 w-[80px] ml-2"
        name="role"
        :item="optionRole"
        :label="t('updateUserContainer.role')"
      />
    </div>
    <div>
      <CustomTextField
        class="mb-3"
        :model-value="props.values.description"
        name="description"
        :label="t('updateUserContainer.description')"
        type="text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import CustomSelectField from '../../../components/textField/CustomSelectField.vue'
import CustomTextField from '../../../components/textField/CustomTextField.vue'
import { GENDER, ROLE } from '../../../constants/enum'
import CustomUploadImage from '../../../components/textField/CustomUploadImage.vue'
import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  values: any
  setFieldValue: (field: string, value: any) => void
  userData: any
}>()

const genderValue = computed({
  get: () =>
    props.values.gender == GENDER.MALE
      ? t('registerContainer.male')
      : t('registerContainer.female'),
  set: (value) => props.setFieldValue('gender', value),
})

const roleValue = computed({
  get: () =>
    props.values.role == ROLE.ADMIN
      ? t('registerContainer.admin')
      : t('registerContainer.user'),
  set: (value) => props.setFieldValue('role', value),
})

const dobValue = computed({
  get: () => props.values.dob,
  set: (value) => props.setFieldValue('dob', value),
})

watch(
  () => props.values.dob,
  (newDob) => {
    if (newDob) {
      props.setFieldValue('dob', dayjs(newDob).format('YYYY-MM-DD'))
    }
  },
  { immediate: true }
)

const formattedDob = computed(() =>
  dobValue.value ? dayjs(dobValue.value).format('YYYY-MM-DD') : ''
)

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

<style scoped></style>
