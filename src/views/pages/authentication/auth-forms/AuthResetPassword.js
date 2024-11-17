import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik, useFormik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';
import { ResetPasswordApi } from 'store/slices/adminAuth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const AuthResetPassword = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [loader, setLoader] = React.useState(false);
    const [level, setLevel] = React.useState();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .max(255)
            .required('Password is required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters'),

        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .test('confirmPassword', 'Both Password must be match!!!', (confirmPassword, yup) => yup.parent.password === confirmPassword)
    });

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            const newData = {
                password: values.password
            };
            setLoader(true);
            ResetPasswordApi(newData)
                .then((res) => {
                    if (res?.succeeded === true) {
                        setLoader(false);
                        navigate('/');
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
        }
    });

    React.useEffect(() => {
        changePassword('');
    }, []);

    return (
        <>
            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
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
                            inputProps={{}}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {strength !== 0 && (
                        <FormControl fullWidth>
                            <Box sx={{ mb: 2 }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Box
                                            style={{ backgroundColor: level?.color }}
                                            sx={{
                                                width: 85,
                                                height: 8,
                                                borderRadius: '7px'
                                            }}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" fontSize="0.75rem">
                                            {level?.label}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </FormControl>
                    )}

                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-confirmPassword">Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-confirmPassword"
                            type={showPasswordConfirm ? 'text' : 'password'}
                            name="confirmPassword"
                            label="Confirm your password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.confirmPassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <AnimateButton>
                            <Button
                                // disableElevation
                                // fullWidth
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

export default AuthResetPassword;
