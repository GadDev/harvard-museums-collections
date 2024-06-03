import * as yup from 'yup'

export const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required.')
    .min(3, 'First name must be at least 3 characters.'),
  lastName: yup
    .string()
    .required('Last name is required.')
    .min(3, 'Last name must be at least 3 characters.'),
  email: yup
    .string()
    .email('Invalid email address.')
    .required('Email is required.'),
})
