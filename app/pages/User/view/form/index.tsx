import { useFormik } from 'formik';
import { useSubmit } from 'react-router';
import * as Yup from 'yup';

import { Button, Stack, TextField } from '@mui/material';

const defaultInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
};

const userValidationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const getHelperText = (field: string, formik: ReturnType<typeof useFormik>): string | undefined => {
  const error = formik.errors[field as keyof typeof formik.errors];
  const touched = formik.touched[field as keyof typeof formik.touched];
  return touched && typeof error === 'string' ? error : undefined;
};

interface UserFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any;
}

export default function UserForm({ initialValues }: UserFormProps) {
  const submit = useSubmit();
  const isEdit = Boolean(initialValues?.id);

  const formik = useFormik({
    initialValues: initialValues || defaultInitialValues,
    enableReinitialize: true,
    validationSchema: userValidationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => formData.append(key, value as string));

      submit(formData, {
        method: isEdit ? 'put' : 'post',
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} sx={{ width: 400 }}>
        <TextField
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={getHelperText('firstName', formik)}
        />

        <TextField
          name="lastName"
          label="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={getHelperText('lastName', formik)}
        />

        <TextField
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={getHelperText('email', formik)}
        />

        <Button type="submit" variant="contained" disabled={formik.isSubmitting}>
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </Stack>
    </form>
  );
}
