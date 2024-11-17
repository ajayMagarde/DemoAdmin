import React from 'react';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { ForgetPasswordApi } from '../../../../store/slices/adminAuth';
import { useTheme } from '@mui/material/styles';
import { useFormik, Formik } from 'formik';
import * as Yup from 'yup';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

const AuthForgotPassword = ({ ForgetPasswordApi }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [loader, setLoader] = React.useState(false);

    const initialValues = {
        username: ''
    };

    const onSubmit = (values, { setSubmitting }) => {
        const newData = {
            email: values.username
        };
        setLoader(true);
        ForgetPasswordApi(newData)
            .then((res) => {
                console.log('🚀 res:', res);
                if (res?.succeeded === true) {
                    setLoader(false);
                    localStorage.setItem('adminToken', res.ResponseData.token);
                    navigate('/code-verification');
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
                setLoader(false);
                setSubmitting(false);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong. Please try again.',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
            });
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Username field is required')
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Forgot Passsword</Typography>
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
                        <InputLabel htmlFor="outlined-adornment-email-login">Enter Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email-login"
                            type="email"
                            name="username"
                            label="Enter your email"
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
                                Submit
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default connect(null, {
    ForgetPasswordApi
})(AuthForgotPassword);
