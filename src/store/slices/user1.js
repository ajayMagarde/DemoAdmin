// third-party
import { createSlice } from '@reduxjs/toolkit';
import axiosApiHelper from 'utils/axiosHelper';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;

const initialState = {
    error: null,
    userList1: [],
    userCount: ''
};

const slice = createSlice({
    name: 'user1',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USER LIST
        getUserListSuccess(state, action) {
            state.userList1 = action.payload.ResponseData;
        },

        // GET USER COUNT
        getUserCountSuccess(state, action) {
            state.userCount = action.payload.ResponseData.usersCount;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetUsersAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-user-list`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getUserListSuccess(response.data));
        }
        console.log(response.data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const GetUserCountAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-users-count`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getUserCountSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
