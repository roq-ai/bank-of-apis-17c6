import * as yup from 'yup';

export const financialAdvisorValidationSchema = yup.object().shape({
  advisor_name: yup.string().required(),
  contact_number: yup.string().required(),
  email: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
