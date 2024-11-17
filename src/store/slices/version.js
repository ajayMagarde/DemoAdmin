// third-party
import { createSlice } from '@reduxjs/toolkit';
import axiosApiHelper from 'utils/axiosHelper';

// project imports
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;

const initialState = {
    error: null,
    allVersions: []
};

const slice = createSlice({
    name: 'version',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // UPDATE VERSION
        // updateVersionSuccess(state, action) {
        //     const index = state.allVersions.findIndex((version) => version === action.payload);
        //     if (index !== -1) {
        //         state.allVersions[index] = action.payload;
        //     }
        // },

        // GET VERSIONS
        getVersionSuccess(state, action) {
            state.allVersions = action.payload.ResponseData;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetVersionsAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-latest-version`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getVersionSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateVersionAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update-latest-version`, formData);
        // if (response.data.succeeded === true) {
        //     dispatch(slice.actions.updateVersionSuccess(response.data));
        // }
        return response.data;
    } catch (error) {
        return error;
    }
};
