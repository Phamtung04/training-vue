import { VALIDATE_CODES } from '../../../constants/validateCode'
import yup from '../../../yupGlobal'

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required(VALIDATE_CODES.E0001)
    .email(VALIDATE_CODES.E0003),
  password: yup
    .string()
    .required(VALIDATE_CODES.E0001)
    .min(8, VALIDATE_CODES.E0008(8)),
})
