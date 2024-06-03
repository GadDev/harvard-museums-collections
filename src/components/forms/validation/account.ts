import * as yup from 'yup'

export const validationSchema = yup.object({
  name: yup
    .string()
    .required('Account name is required.')
    .min(3, 'Account name must be at least 3 characters.'),
  accountNumber: yup
    .string()
    .matches(/^\d+$/, 'The field should only contain numbers.')
    .max(10, 'The field should not exceed 10 digits.')
    .required('Account number is required.'),
  accountType: yup.string().required('Account type is required.'),
  balance: yup
    .number()
    .required('Balance is required.')
    .test(
      'is-positive',
      'Currency must be greater than or equal to zero.',
      (value) => value >= 0,
    ),
  currency: yup.string().required('Currency is required.'),
  ownerId: yup.string().required('Owner is required.'),
})
