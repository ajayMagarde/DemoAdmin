import React from 'react';
import { useDispatch } from 'store';
import { UpdateVersionAPI } from 'store/slices/version';

// material-ui
import { Button, Grid, Stack, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// Validation schema
const validationSchema = yup.object({
    android_minimum_version: yup.string().required('Android Minimum Version is required'),
    android_latest_version: yup.string().required('Android Latest Version is required'),
    ios_minimum_version: yup.string().required('IOS Minimum Version is required'),
    ios_latest_version: yup.string().required('IOS Latest Version is required')
});

const UpdateVersion = ({ handleModalClose, data, refreshVersions }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            android_minimum_version: data?.android_minimum_version,
            android_latest_version: data?.android_latest_version,
            ios_minimum_version: data?.ios_minimum_version,
            ios_latest_version: data?.ios_latest_version
        },

        validationSchema,

        onSubmit: async (values) => {
            const formData = {
                android_minimum_version: values.android_minimum_version,
                android_latest_version: values.android_latest_version,
                ios_minimum_version: values.ios_minimum_version,
                ios_latest_version: values.ios_latest_version
            };
            console.log(formData);
            const response = await dispatch(UpdateVersionAPI(formData));

            if (response.succeeded === true) {
                await dispatch(
                    openSnackbar({
                        open: true,
                        message: response.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        }
                    })
                );
                refreshVersions();
            } else {
                await dispatch(
                    openSnackbar({
                        open: true,
                        message: response.ResponseMessage,
                        variant: 'alert',
                        alert: {
                            color: 'danger'
                        }
                    })
                );
            }
            handleModalClose();
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="android_minimum_version"
                        name="android_minimum_version"
                        label="Android Minimum Version"
                        value={formik.values.android_minimum_version}
                        onChange={formik.handleChange}
                        error={formik.touched.android_minimum_version && Boolean(formik.errors.android_minimum_version)}
                        helperText={formik.touched.android_minimum_version && formik.errors.android_minimum_version}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="android_latest_version"
                        name="android_latest_version"
                        label="Android Latest Version"
                        value={formik.values.android_latest_version}
                        onChange={formik.handleChange}
                        error={formik.touched.android_latest_version && Boolean(formik.errors.android_latest_version)}
                        helperText={formik.touched.android_latest_version && formik.errors.android_latest_version}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="ios_minimum_version"
                        name="ios_minimum_version"
                        label="IOS Minimum Version"
                        value={formik.values.ios_minimum_version}
                        onChange={formik.handleChange}
                        error={formik.touched.ios_minimum_version && Boolean(formik.errors.ios_minimum_version)}
                        helperText={formik.touched.ios_minimum_version && formik.errors.ios_minimum_version}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="ios_latest_version"
                        name="ios_latest_version"
                        label="IOS Latest Version"
                        value={formik.values.ios_latest_version}
                        onChange={formik.handleChange}
                        error={formik.touched.ios_latest_version && Boolean(formik.errors.ios_latest_version)}
                        helperText={formik.touched.ios_latest_version && formik.errors.ios_latest_version}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <AnimateButton>
                            <Button variant="contained" color="secondary" type="submit">
                                Update
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default UpdateVersion;
