// third-party
import { createSlice } from '@reduxjs/toolkit';
import axiosApiHelper from 'utils/axiosHelper';

// project imports
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;

const initialState = {
    error: null,
    avatarData: []
};

const slice = createSlice({
    name: 'avatar',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // ADD AVATAR
        addAvatarSuccess(state, action) {
            state.avatarData.push(action.payload);
        },

        // EDIT AVATAR
        editAvatarSuccess(state, action) {
            const index = state.avatarData.findIndex((avatar) => avatar._id === action.payload._id);
            if (index !== -1) {
                state.avatarData[index] = action.payload;
            }
        },

        // DELETE AVATAR
        deleteAvatarSuccess(state, action) {
            state.avatarData = state.avatarData.filter((avatar) => avatar._id !== action.payload._id);
        },

        // GET AVATAR
        getAvatarSuccess(state, action) {
            state.avatarData = action.payload.ResponseData;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetAvatarsAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get_avtar`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getAvatarSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const AddAvatarAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add_avtar`, formData);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.addAvatarSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateAvatarAPI = (avatar) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update_avtar`, avatar);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.editAvatarSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const DeleteAvatarAPI = (avatar) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}delete_avtar`, avatar);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.deleteAvatarSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
