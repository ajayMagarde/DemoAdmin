import React from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

import { Navigate, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import { AdminLoginApi, AdminDetailApi } from '../../../../store/slices/adminAuth';
import { useTheme } from '@mui/material/styles';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { DASHBOARD_PATH } from 'config';

const LoginAuth = ({ AdminLoginApi }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { isAuthenticated, loading } = useSelector((state) => state.admin);
    const [loader, setLoader] = React.useState(false);
    const [loginLoading, setLoginLoading] = React.useState(true);
    const [showPassword, setShowPassword] = React.useState(false);

    const initialValues = {
        username: '',
        password: ''
    };

    const onSubmit = (values, { setSubmitting }) => {
        setLoginLoading(true);
        const newData = {
            username: values.username.toLowerCase(),
            password: values.password
        };
        setLoader(true);
        AdminLoginApi(newData)
            .then((res) => {
                console.log('🚀 res:', res);
                setLoginLoading(false);
                if (res?.succeeded === true) {
                    setLoader(false);
                    setSubmitting(false);
                    setTimeout(() => {
                        dispatch(AdminDetailApi(res.ResponseData));
                    }, 3000);
                    localStorage.setItem('adminToken', res.ResponseData);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res.ResponseMessage,
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                } else {
                    setLoader(false);
                    setSubmitting(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res.ResponseMessage,
                            variant: 'alert',
                            alert: {
                                color: 'error'
                            },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                }
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username field is required'),
        password: Yup.string().required('Password field is required')
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    if (isAuthenticated === true && loading === false) {
        return <Navigate replace to={DASHBOARD_PATH} />;
    }
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign in with Username</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                    {/* <Alert /> */}
                </Grid>
            </Grid>

            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.username && formik.errors.username)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="text"
                            name="username"
                            label="Email Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.username}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password-login"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Grid container alignItems="center" justifyContent="flex-end">
                        <Grid item>
                            <Typography
                                variant="subtitle1"
                                component={Link}
                                to="/forgot-password"
                                color="secondary"
                                sx={{ textDecoration: 'none' }}
                            >
                                Forgot Password?
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <AnimateButton>
                            <Button
                                disabled={formik.isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ padding: '5px 50px' }}
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <CircularProgress color="inherit" size={20} />
                                    </>
                                ) : (
                                    'Log In'
                                )}
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default connect(null, {
    AdminLoginApi
})(LoginAuth);
