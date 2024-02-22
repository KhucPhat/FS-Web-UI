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
import * as api from '../../apis/api';
import MuiPhoneNumber from 'material-ui-phone-number';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles, createStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            width: '85%',
            height: '85%',
            marginInline: 'auto',
            marginTop: '3%',
            padding: '30px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            [theme.breakpoints.down('lg')]: {
                width: '70%',
                marginTop: 0,
                height: '80%',
            },
            [theme.breakpoints.down('md')]: {
                width: '65%',
                marginTop: 25,
                height: '65%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '90%',
                marginTop: 5,
                height: '85%',
            },
        },
        textField: {
            marginTop: '5px',
            width: '100%',
            '& input': {
                fontSize: '13px',
            },
        },
        date: {
            marginTop: '-8px',
        },
        formControl: {
            width: '100%',
        },
        button: {
            marginTop: '3%',
            marginBottom: '3%',
        },
        copyRight: {
            marginTop: '10px',
        },
        avatar: {
            margin: 0,
            backgroundColor: 'navy',
        },
        boxChild: {
            marginTop: '16px',
        },
        link: {
            fontSize: '16px',
        },
    })
);

function Register() {
    // const theme = useTheme();
    const classes = useStyles();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
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
            email: yup
                .string()
                .required('Email is required')
                .email('Email invalid'),
            password: yup
                .string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            phoneNumber: yup
                .string()
                .matches(/(\+84|0)[0-9]{9,10}/, 'Invalid phone number'),
            // .required('Confirm password is required'),
            username: yup
                .string()
                .min(3, 'Username must be at least 3 characters')
                .max(20, 'Username must be under 20 character')
                .required('Username is required'),
            gender: yup
                .string()
                .min(2, 'Last name must be at least 2 characters')
                .max(20, 'Last name must be under 20 character'),
            // .required('Last name is required'),
        }),
        onSubmit: async (values: any) => {
            const res = await api.register({
                email: values.email,
                password: values.password,
                name: values.username,
            });
            console.log(res);
            if (res.status === 200) {
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
                navigate('/login');
            } else {
              enqueueSnackbar(res.message, {
                  variant: 'error',
                  anchorOrigin: {
                      vertical: 'top',
                      horizontal: 'right',
                  },
              });
            }
        },
    });

    return (
        <Box className={classes.box}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight="bold">
                Sign up
            </Typography>
            <Box
                className={classes.boxChild}
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="username"
                            required
                            fullWidth
                            id="username"
                            inputProps={{
                                onFocus: () => false,
                            }}
                            className={classes.textField}
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange('username')}
                            onBlur={formik.handleBlur('username')}
                            error={
                                formik.touched.username &&
                                Boolean(formik.errors.username)
                            }
                            helperText={
                                formik.touched.username &&
                                Boolean(formik.errors.username)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.date}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    label="Birth Day"
                                    onChange={(date: any) =>
                                        formik.setFieldValue(
                                            'birthDay',
                                            date.toDate()
                                        )
                                    }
                                    className={classes.textField}
                                    onBlur={() =>
                                        formik.setFieldTouched('birthDay', true)
                                    }
                                    variant="outlined"
                                    error={Boolean(
                                        formik.touched.birthDay &&
                                            formik.errors.birthDay
                                    )}
                                    helperText={
                                        formik.touched.birthDay &&
                                        formik.errors.birthDay
                                    }
                                    value={formik.values.birthDay}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange('email')}
                            onBlur={formik.handleBlur('email')}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.textField}
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
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <MuiPhoneNumber
                            className={classes.textField}
                            name="phoneNumber"
                            label="Phone Number"
                            value={formik.values.phoneNumber}
                            onChange={(value) => {
                                formik.handleChange('phoneNumber')(value);
                            }}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.phoneNumber &&
                                Boolean(formik.errors.phoneNumber)
                            }
                            helperText={
                                formik.touched.phoneNumber &&
                                Boolean(formik.errors.phoneNumber)
                            }
                            defaultCountry="vn"
                            onlyCountries={['vn']}
                            countryCodeEditable={false}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Gender
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formik.values.gender}
                                onChange={formik.handleChange('gender')}
                                onBlur={formik.handleBlur('gender')}
                                error={
                                    formik.touched.gender &&
                                    Boolean(formik.errors.gender)
                                }
                                helperText={
                                    formik.touched.gender &&
                                    formik.errors.gender
                                }
                                label="Gender"
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="allowExtraEmails"
                                    color="primary"
                                />
                            }
                            label="I accept the Terms of Use and Privacy Policy."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    className={classes.button}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link
                            className={classes.link}
                            href="login"
                            variant="body2"
                        >
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
            <Copyright className={classes.copyRight} />
        </Box>
    );
}

export default Register;
