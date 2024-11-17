// third-party
import { createSlice } from '@reduxjs/toolkit';
import axiosApiHelper from 'utils/axiosHelper';

// project imports
import { dispatch } from '../index';

const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;

const initialState = {
    error: null,
    offers: [],
    loading: true
};

const slice = createSlice({
    name: 'offers',
    initialState,
    reducers: {
        // Error Handling
        hasError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },

        // Add Offer
        addOfferSuccess(state, action) {
            state.offers.push(action.payload.ResponseData);
            state.loading = false;
        },

        // Get Offers
        getOffersSuccess(state, action) {
            state.offers = action.payload.ResponseData;
            console.log(action.payload.ResponseData);

            state.loading = false;
        },

        // Update Offer
        updateOfferSuccess(state, action) {
            const index = state.offers.findIndex((offer) => offer.id === action.payload.ResponseData.id);
            if (index !== -1) {
                state.offers[index] = action.payload.ResponseData;
            }
            state.loading = false;
        },

        // Set Loading
        setLoading(state, action) {
            state.loading = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// Async API calls
export const GetOffersAPI = () => async () => {
    try {
        dispatch(slice.actions.setLoading(true));
        const response = await axiosApiHelper('get', `${PROXY}get-offers`);
        if (response.data.succeeded) {
            dispatch(slice.actions.getOffersSuccess(response.data));
        } else {
            dispatch(slice.actions.hasError('Failed to fetch offers.'));
        }
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
};

export const AddOfferAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add-offer`, formData);
        if (response.data.succeeded) {
            dispatch(slice.actions.addOfferSuccess(response.data));
        } else {
            dispatch(slice.actions.hasError('Failed to add offer.'));
        }
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
};

export const UpdateOfferAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update-offer`, formData);
        if (response.data.succeeded) {
            dispatch(slice.actions.updateOfferSuccess(response.data));
        } else {
            dispatch(slice.actions.hasError('Failed to update offer.'));
        }
    } catch (error) {
        dispatch(slice.actions.hasError(error.message));
    }
};
