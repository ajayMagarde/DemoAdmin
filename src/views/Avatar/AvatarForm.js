import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Stack, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// API calling
import { AddAvatarAPI, UpdateAvatarAPI } from 'store/slices/avatar';

// Project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { openSnackbar } from 'store/slices/snackbar';
import { gridSpacing } from 'store/constant';

// Validation schema
const validationSchema = yup.object({
    avatar: yup.mixed().required('Image is required')
});

// Allowed file extensions and MIME types
const allowedExtensions = ['jpg', 'jpeg', 'png'];
const allowedMimeTypes = ['image/jpeg', 'image/png'];

const AvatarForm = ({ data, handleModalClose, handleModalCloseEdit, fetchData }) => {
    const PROXY = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(data ? PROXY + data.path : null);
    const [isDisabled, setIsDisabled] = useState(true);

    const formik = useFormik({
        initialValues: {
            avatar: data ? PROXY + data.path : null
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDisabled(true);
            const formData = new FormData();
            formData.append('avatar', values.avatar);
            if (data !== undefined) {
                formData.append('_id', data._id);
            }

            if (data !== undefined) {
                await dispatch(UpdateAvatarAPI(formData)).then((res) => {
                    if (res.succeeded === true) {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: res.ResponseMessage,
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                }
                            })
                        );
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: res.ResponseMessage,
                                variant: 'alert',
                                alert: {
                                    color: 'danger'
                                }
                            })
                        );
                    }
                    handleModalCloseEdit();
                    fetchData();
                });
            } else {
                await dispatch(AddAvatarAPI(formData)).then((res) => {
                    if (res.succeeded === true) {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: res.ResponseMessage,
                                variant: 'alert',
                                alert: {
                                    color: 'success'
                                }
                            })
                        );
                    } else {
                        dispatch(
                            openSnackbar({
                                open: true,
                                message: res.ResponseMessage,
                                variant: 'alert',
                                alert: {
                                    color: 'danger'
                                }
                            })
                        );
                    }
                    handleModalClose();
                    fetchData();
                });
            }
        }
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Check file extension
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const isExtensionValid = allowedExtensions.includes(fileExtension);

            // Check MIME type
            const isMimeTypeValid = allowedMimeTypes.includes(file.type);

            if (isExtensionValid && isMimeTypeValid) {
                formik.setFieldValue('avatar', file);
                setIsDisabled(false);
                setSelectedImage(URL.createObjectURL(file));
            } else {
                alert('Please select a file with one of the following extensions: JPG, JPEG, or PNG.');
                event.target.value = null; // Clear the input
                setIsDisabled(true);
            }
        }
    };

    return (
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                        {selectedImage ? (
                            <img src={selectedImage} alt="Selected" width="100px" />
                        ) : (
                            'Select an image (.jpeg, .jpg and .png files are accepted)'
                        )}
                        <input id="avatar" name="avatar" type="file" accept=".jpg,.jpeg,.png" hidden onChange={handleFileChange} />
                        <Button
                            variant="contained"
                            color="dark"
                            size="small"
                            component="span"
                            sx={{ color: 'white', marginY: 1 }}
                            onClick={() => document.getElementById('avatar').click()}
                        >
                            Select Avatar
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <AnimateButton>
                            <Button variant="contained" color="secondary" type="submit" size="large" disabled={isDisabled}>
                                {data ? 'Update' : 'Add New Avatar'}
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default AvatarForm;
