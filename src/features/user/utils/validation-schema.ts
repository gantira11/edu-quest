import * as yup from 'yup'

export const userSchema = yup.object({
  name: yup.string().required().label('Nama'),
  username: yup.string().required().label('Username'),
  password: yup.string().required().label('Password'),
  role_id: yup.string().required().label('Role')
})