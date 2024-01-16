/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Grid,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/system';

export default function ForgotPassword(): JSX.Element {
  const navigate = useNavigate();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email is required').email('Email invalid'),
    }),
    onSubmit: async (values: unknown) => {
      // handle request api register
      // const res = await api.register({
      //   email: values.email,
      //   password: values.password,
      //   lastName: values.lastName,
      //   username: values.username,
      //   confirmPassword: values.confirmPassword,
      // });
      setSuccessDialogOpen(true);
    },
  });

  const handleDialogClose = () => {
    setSuccessDialogOpen(false);
  };
  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Grid
      container
      sx={{ marginTop: 15 }}
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Box
        component={Paper}
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          boxShadow: 3,
          borderRadius: 1,
          width: '30%',
          marginInline: 'auto',
          [theme.breakpoints.down('lg')]: {
            width: '65%',
            marginTop: 40,
          },
          [theme.breakpoints.down('md')]: {
            width: '65%',
            marginTop: 25,
          },
          [theme.breakpoints.down('sm')]: {
            width: '85%',
            marginTop: 10,
          },
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: 40, marginBottom: 2 }} />
        <Typography variant="h5">Forgot Password</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Button
          margin="normal"
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit}
          sx={{ marginTop: 1 }}
        >
          Reset Password
        </Button>
        <Button
          color="primary"
          startIcon={<ArrowBackIcon />}
          href="login"
          sx={{ fontSize: 14, fontWeight: 'bold', marginTop: 2 }}
        >
          Back to Login
        </Button>
      </Box>
      <Dialog open={successDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Email Sent Successfully</DialogTitle>
        <DialogContent>
          <Typography>
            Please check your email for further instructions.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleBackToLogin}
            color="primary"
            startIcon={<ArrowBackIcon />}
          >
            Back to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
