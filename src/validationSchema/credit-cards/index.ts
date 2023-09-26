import * as yup from 'yup';

export const creditCardValidationSchema = yup.object().shape({
  card_number: yup.string().required(),
  expiry_date: yup.date().required(),
  cvv: yup.number().integer().required(),
  due_date: yup.date().required(),
  maximum_limit: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
