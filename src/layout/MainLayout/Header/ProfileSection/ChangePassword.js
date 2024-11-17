import * as React from 'react';

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
import { ChangePasswordApi } from 'store/slices/adminAuth';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const ChangePassword = ({ handleModalClose, ...others }) => {
    const theme = useTheme();
    const [showPasswordnew, setShowPasswordNew] = React.useState(false);
    const [showPasswordconfirm, setShowPasswordConfirm] = React.useState(false);
    const [showPasswordold, setShowPasswordOld] = React.useState(false);
    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();

    const handleClickShowPasswordNew = () => {
        setShowPasswordNew(!showPasswordnew);
    };

    const handleClickShowPasswordOld = () => {
        setShowPasswordOld(!showPasswordold);
    };

    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordconfirm);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const initialValues = {
        oldpassword: '',
        newpassword: '',
        confirmPassword: ''
    };

    const validationSchema2 = Yup.object({
        oldpassword: Yup.string().max(255).required('Old Password is required'),
        newpassword: Yup.string().max(255).required('New Password is required'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .test('confirmPassword', 'Both Password must be match!', (confirmPassword, yup) => yup.parent.newpassword === confirmPassword)
    });

    const validationSchema = Yup.object({
        oldpassword: Yup.string().max(255).required('Old Password is required'),
        newpassword: Yup.string()
            .required('Password Field is Required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Password Field is Required')
            .test('confirmPassword', 'Both Password must be match!', (confirmPassword, yup) => yup.parent.newpassword === confirmPassword)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            )
            .min(8, 'Password must be at least 8 characters')
    });

    const changingPassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            const formData = { old_password: values.oldpassword, new_password: values.newpassword };
            try {
                const res = await ChangePasswordApi(formData);
                if (res?.succeeded === true) {
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res.ResponseMessage,
                            variant: 'alert',
                            alert: { color: 'success' },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                    handleModalClose();
                } else {
                    setSubmitting(false);
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: res.ResponseMessage,
                            variant: 'alert',
                            alert: { color: 'error' },
                            transition: 'Fade',
                            anchorOrigin: { vertical: 'top', horizontal: 'right' }
                        })
                    );
                }
            } catch (err) {
                setSubmitting(false);
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Something went wrong. Please try again.',
                        variant: 'alert',
                        alert: { color: 'error' },
                        transition: 'Fade',
                        anchorOrigin: { vertical: 'top', horizontal: 'right' }
                    })
                );
                handleModalClose();
            }
        }
    });

    React.useEffect(() => {
        changingPassword('');
    }, []);

    return (
        <>
            <Formik>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.oldpassword && formik.errors.oldpassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordold ? 'text' : 'password'}
                            name="oldpassword"
                            label="Enter old password"
                            value={formik.values.oldpassword}
                            onChange={formik.handleChange}
                            error={formik.touched.oldpassword && Boolean(formik.errors.oldpassword)}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordOld}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPasswordold ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />
                        {formik.touched.oldpassword && formik.errors.oldpassword && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.oldpassword}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <FormControl
                        fullWidth
                        error={Boolean(formik.touched.newpassword && formik.errors.newpassword)}
                        sx={{ ...theme.typography.customInput }}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPasswordnew ? 'text' : 'password'}
                            name="newpassword"
                            label="Enter new password"
                            value={formik.values.newpassword}
                            onChange={formik.handleChange}
                            error={formik.touched.newpassword && Boolean(formik.errors.newpassword)}
                            onBlur={formik.handleBlur}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordNew}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPasswordnew ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            inputProps={{}}
                        />
                        {formik.touched.newpassword && formik.errors.newpassword && (
                            <FormHelperText error id="standard-weight-helper-text-password-login">
                                {formik.errors.newpassword}
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
                            type={showPasswordconfirm ? 'text' : 'password'}
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
                                        {showPasswordconfirm ? <Visibility /> : <VisibilityOff />}
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
                                disabled={formik.isSubmitting}
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
                                sx={{ padding: '5px 50px' }}
                            >
                                Change
                            </Button>
                        </AnimateButton>
                    </Box>
                </form>
            </Formik>
        </>
    );
};

export default ChangePassword;
