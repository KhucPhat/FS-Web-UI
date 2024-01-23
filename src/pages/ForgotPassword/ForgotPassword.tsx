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
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles((theme: any) =>
  createStyles({
    grid: {
      marginTop: '8%',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '8px',
      width: '30%',
      height: '100%',
      marginInline: 'auto',
      marginTop: '10px',
      padding: '16px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
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
    },
    LockOutlinedIcon: { fontSize: 50, marginBottom: 2 },
    button: {
      marginTop: 20,
    },
    buttonBack: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 10,
      color: 'navy',
    },
  })
);
function ForgotPassword() {
  const classes = useStyles();

  const navigate = useNavigate();
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

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
    <Grid container className={classes.grid}>
      <Box component={Paper} elevation={3} className={classes.box}>
        <LockOutlinedIcon className={classes.LockOutlinedIcon} />
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
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Button
          margin="normal"
          variant="contained"
          color="primary"
          onClick={formik.handleSubmit}
          className={classes.button}
        >
          Reset Password
        </Button>
        <Button
          startIcon={<ArrowBackIcon />}
          href="login"
          className={classes.buttonBack}
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
export default ForgotPassword;
