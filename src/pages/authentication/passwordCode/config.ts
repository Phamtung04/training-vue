import { VALIDATE_CODES } from '../../../constants/validateCode'
import yup from '../../../yupGlobal'

export const passwordCodeSchema = yup.object().shape({
  passCode: yup
    .string()
    .length(4, VALIDATE_CODES.E0010(4))
    .required(VALIDATE_CODES.E0001),
})
