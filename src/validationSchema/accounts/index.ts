import * as yup from 'yup';

export const accountValidationSchema = yup.object().shape({
  account_number: yup.string().required(),
  account_type: yup.string().required(),
  balance: yup.number().integer().required(),
  bank_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});
