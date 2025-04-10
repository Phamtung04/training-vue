import { VALIDATE_CODES } from '../../../constants/validateCode'
import yup from '../../../yupGlobal'

export interface UserProps {
  isShow: boolean
  id: string
  userData: object
}

export const updateSchema = yup.object().shape({
  userName: yup.string().required(VALIDATE_CODES.E0001),
  fullName: yup.string().required(VALIDATE_CODES.E0001),
  email: yup.string(),
  phoneNumber: yup.string().phoneNumber(),
  description: yup.string().max(1000, VALIDATE_CODES.E0002(1000)),
  dob: yup.string().dob(),
  gender: yup.string(),
  role: yup.string(),
  avatar: yup.mixed().nullable(),
})
