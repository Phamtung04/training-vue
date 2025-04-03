import { VALIDATE_CODES } from '../../../constants/validateCode'
import yup from './../../../yupGlobal'

export const validationSchema = yup.object().shape({
  userName: yup.string().required(VALIDATE_CODES.E0001),
  fullName: yup.string().required(VALIDATE_CODES.E0001),
  email: yup
    .string()
    .required(VALIDATE_CODES.E0001)
    .email(VALIDATE_CODES.E0003),
  password: yup
    .string()
    .required(VALIDATE_CODES.E0001)
    .min(8, VALIDATE_CODES.E0008(8)),
  confirmPassword: yup.string().passwordConfirm(),
  dob: yup.string().dob(),
  phoneNumber: yup.string().phoneNumber(),
  role: yup.string().required(VALIDATE_CODES.E0001),
  gender: yup.string().required(VALIDATE_CODES.E0001),
})
