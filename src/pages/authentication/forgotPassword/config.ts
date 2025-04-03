import { VALIDATE_CODES } from '../../../constants/validateCode'
import yup from '../../../yupGlobal'

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email(VALIDATE_CODES.E0003)
    .required(VALIDATE_CODES.E0001),
})
