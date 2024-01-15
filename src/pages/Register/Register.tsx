/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
// import * as api from '../../apis/api';
import MuiPhoneNumber from 'material-ui-phone-number';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { makeStyles, createStyles } from '@mui/styles';

function Copyright(props: any): JSX.Element {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const useStyles = makeStyles((theme: any) =>
  createStyles({
    box: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: 4,
      boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.1)', // Example boxShadow value
      borderRadius: 1,
      width: '30%',
      height: '100%',
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
        marginTop: 5,
      },
    },
  })
);

function Register() {
  // const theme = useTheme();
  const classes = useStyles();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      phoneNumber: '',
      birthDay: dayjs(),
      gender: '',
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email is required').email('Email invalid'),
      password: yup
        .string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      phoneNumber: yup
        .string()
        .matches(/(\+84|0)[0-9]{9,10}/, 'Invalid phone number')
        .required('Confirm password is required'),
      username: yup
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be under 20 character')
        .required('Username is required'),
      gender: yup
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name must be under 20 character')
        .required('Last name is required'),
    }),
    onSubmit: async (values) => {
      // handle request api register
      // const res = await api.register({
      //   email: values.email,
      //   password: values.password,
      //   lastName: values.lastName,
      //   username: values.username,
      //   confirmPassword: values.confirmPassword,
      // });

      navigate('/login');
    },
  });

  return (
    <Box
      className={classes.box}
      // sx={{
      //   marginTop: 4,
      //   display: 'flex',
      //   flexDirection: 'column',
      //   alignItems: 'center',
      //   padding: 4,
      //   boxShadow: '3', // Correcting the boxShadow value
      //   borderRadius: 1,
      //   width: '30%',
      //   height: '100%',
      //   marginInline: 'auto',
      //   [theme.breakpoints.down('lg')]: {
      //     width: '65%',
      //     marginTop: 40,
      //   },
      //   [theme.breakpoints.down('md')]: {
      //     width: '65%',
      //     marginTop: 25,
      //   },
      //   [theme.breakpoints.down('sm')]: {
      //     width: '85%',
      //     marginTop: 5,
      //   },
      // }}
    >
      <Avatar sx={{ m: 0, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" fontWeight="bold">
        Sign up
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <TextField
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              id="username"
              inputProps={{
                onFocus: () => false,
              }}
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={7} style={{ marginTop: '-8px' }}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs} > 
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      label="Birth Day"
                      onChange={(date: any) => formik.setFieldValue('birthDay', date.toDate())}
                      onBlur={() => formik.setFieldTouched('birthDay', true)}
                      variant="outlined"
                      error={Boolean(formik.touched.birthDay && formik.errors.birthDay)}
                      helperText={formik.touched.birthDay && formik.errors.birthDay}
                      value={formik.values.birthDay}
                     
                    />
                  </DemoContainer>
                </LocalizationProvider> */}
          </Grid>
          <Grid item xs={12}>
            <TextField
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              error={formik.touched.password && formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiPhoneNumber
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={(value) => {
                formik.handleChange('phoneNumber')(value);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              defaultCountry="vn"
              onlyCountries={['vn']}
              template="+84 (###) ###-####"
              countryCodeEditable={false}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formik.values.gender}
                onChange={formik.handleChange('gender')}
                onBlur={formik.handleBlur('gender')}
                error={formik.touched.gender && formik.errors.gender}
                helperText={formik.touched.gender && formik.errors.gender}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I accept the Terms of Use and Privacy Policy."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
      <Copyright sx={{ mt: 2 }} />
    </Box>
  );
}

export default Register;
