import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCreditCardById, updateCreditCardById } from 'apiSdk/credit-cards';
import { creditCardValidationSchema } from 'validationSchema/credit-cards';
import { CreditCardInterface } from 'interfaces/credit-card';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function CreditCardEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<CreditCardInterface>(
    () => (id ? `/credit-cards/${id}` : null),
    () => getCreditCardById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CreditCardInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCreditCardById(id, values);
      mutate(updated);
      resetForm();
      router.push('/credit-cards');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<CreditCardInterface>({
    initialValues: data,
    validationSchema: creditCardValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Credit Cards',
              link: '/credit-cards',
            },
            {
              label: 'Update Credit Card',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Credit Card
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.card_number}
            label={'Card Number'}
            props={{
              name: 'card_number',
              placeholder: 'Card Number',
              value: formik.values?.card_number,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="expiry_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Expiry Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.expiry_date ? new Date(formik.values?.expiry_date) : null}
              onChange={(value: Date) => formik.setFieldValue('expiry_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Cvv"
            formControlProps={{
              id: 'cvv',
              isInvalid: !!formik.errors?.cvv,
            }}
            name="cvv"
            error={formik.errors?.cvv}
            value={formik.values?.cvv}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('cvv', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="due_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Due Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.due_date ? new Date(formik.values?.due_date) : null}
              onChange={(value: Date) => formik.setFieldValue('due_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Maximum Limit"
            formControlProps={{
              id: 'maximum_limit',
              isInvalid: !!formik.errors?.maximum_limit,
            }}
            name="maximum_limit"
            error={formik.errors?.maximum_limit}
            value={formik.values?.maximum_limit}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('maximum_limit', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/credit-cards')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'credit_card',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CreditCardEditPage);