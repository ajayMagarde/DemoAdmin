// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';
import { setAuthSession } from 'config';
import axiosApiHelper from 'utils/axiosHelper';

// ----------------------------------------------------------------------

const PROXY = `${process.env.REACT_APP_API_URL}api/admin/`;

const initialState = {
    adminToken: localStorage.getItem('adminToken'),
    adminRole: localStorage.getItem('adminRole'),
    isAuthenticated: false,
    loading: true,
    adminDetails: {},
    error: null
};

const slice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Admin Login successfull
        Login_Success(state, action) {
            state.adminToken = action.payload?.ResponseData;
            state.isAuthenticated = true;
            state.loading = false;
            state.adminDetails = {};
        },

        GetCode_Success(state, action) {
            state.adminToken = action.payload?.ResponseData.token;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminDetails = {};
            state.error = null;
        },

        GetCode_Failed(state, action) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.error = action.payload;
        },

        // Admin Login Failed
        Login_Failed(state) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
        },
        // Admin secret key verification
        Login_Verification_Success(state, action) {
            state.adminToken = action.payload?.ResponseData?.token;
            state.isAuthenticated = true;
            state.loading = false;
            state.adminRole = action.payload?.ResponseData?.role_type;
            state.adminDetails = action.payload?.ResponseData?.user;
        },

        // Admin secret key verification failed
        Login_Verification_Failed(state, action) {
            state.adminToken = null;
            state.adminRole = '';
            state.isAuthenticated = false;
            state.loading = false;
            state.adminDetails = {};
        },

        // Admin details
        Admin_Details(state, action) {
            state.adminDetails = action.payload?.ResponseData;
            state.isAuthenticated = true;
            state.loading = false;
        },

        // details failed
        Admin_Details_Failed(state, action) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.adminDetails = {};
        },

        // logout
        LogoutSession(state) {
            state.adminToken = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.adminRole = '';
            state.adminDetails = {};
        },

        // All  Erros
        hasError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { LogoutSession } = slice.actions;
// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const AdminLoginApi = (data) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}login`, data);
        if (response?.data?.succeeded === true) {
            dispatch(slice.actions.Login_Success(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Login_Failed(error));
        return error;
    }
};

export const VerificationSecretApi = (data, newToken) => async () => {
    const newAuth = {
        headers: {
            authorization: `bearer ${newToken}`
        }
    };
    try {
        const response = await axios.post(`${PROXY}verify-secret-key`, data, newAuth);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Login_Verification_Success(response.data));
            setAuthSession(response.data.ResponseData?.token);
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Login_Verification_Failed(error));
        return error;
    }
};

export const AdminDetailApi = (newToken) => async () => {
    const newAuth = {
        headers: {
            'content-type': 'application/json',
            Authorization: `bearer ${newToken}`
        }
    };

    try {
        const response = await axios.get(`${PROXY}get-profile`, newAuth);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.Admin_Details(response.data));
        } else {
            dispatch(slice.actions.Admin_Details_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.Admin_Details_Failed(error));
        dispatch(slice.actions.hasError(error));
        return error;
    }
};

export const UpdateProfileApi = (formData) => async () => {
    try {
        const response = await axiosApiHelper('put', `${PROXY}update-profile`, formData);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ChangePasswordApi = async (formData) => {
    const response = await axiosApiHelper('post', `${PROXY}update-password`, formData);
    return response.data;
};

export const ForgetPasswordApi = (data) => async (dispatch) => {
    console.log(data);
    try {
        const response = await axiosApiHelper('post', `${PROXY}forget-password`, data);
        console.log(response.data);
        if (response?.data?.succeeded === true) {
            dispatch(slice.actions.GetCode_Success(response.data));
        } else {
            dispatch(slice.actions.GetCode_Failed(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetCode_Failed(error));
        return error;
    }
};

export const VerifyOtpApi = async (data) => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}verify-otp`, data);

        if (response?.data?.succeeded === true) {
            dispatch(slice.actions.GetCode_Success(response.data));
        }
        return response.data;
    } catch (error) {
        dispatch(slice.actions.GetCode_Failed(error));
        return error;
    }
};

export const ResendOtpApi = async (data) => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}resend-otp`, data);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const ResetPasswordApi = async (formData) => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}reset-password`, formData);
        return response.data;
    } catch (error) {
        return error;
    }
};
