import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { TextField, Button, Grid, Typography } from '@mui/material';

// redux
import { useDispatch } from 'store';
import { AddOfferAPI, UpdateOfferAPI } from 'store/slices/offers';

// ==============================|| OfferForm ||============================== //

const OfferForm = ({ data, handleModalClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: data?.title || '',
        logo: null,
        points: data?.points || '',
        description: data?.description || ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.points || isNaN(formData.points)) newErrors.points = 'Points must be a valid number';
        if (!formData.description) newErrors.description = 'Description is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, logo: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const payload = new FormData();
        payload.append('title', formData.title);
        if (formData.logo) payload.append('logo', formData.logo);
        payload.append('points', formData.points);
        payload.append('description', formData.description);

        if (data && data.id) {
            // Update existing offer
            dispatch(UpdateOfferAPI({ id: data.id, payload })).then(() => handleModalClose());
        } else {
            // Add new offer
            dispatch(AddOfferAPI(payload)).then(() => handleModalClose());
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        error={!!errors.title}
                        helperText={errors.title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        type="number"
                        label="Points"
                        name="points"
                        value={formData.points}
                        onChange={handleInputChange}
                        error={!!errors.points}
                        helperText={errors.points}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" gutterBottom>
                        Upload Logo:
                    </Typography>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        {data && data.id ? 'Update Offer' : 'Add Offer'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

OfferForm.propTypes = {
    data: PropTypes.object,
    handleModalClose: PropTypes.func.isRequired
};

export default OfferForm;
