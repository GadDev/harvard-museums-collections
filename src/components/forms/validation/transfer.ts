import * as yup from 'yup'

export const validationSchema = yup.object({
  fromAccountId: yup.string().required('AccountFrom is required.'),
  toAccountId: yup.string().required('AccountTo is required.'),
  amount: yup
    .number()
    .required('Balance is required.')
    .test(
      'is-positive',
      'Currency must be greater than or equal to zero.',
      (value) => value > 0,
    ),
})
