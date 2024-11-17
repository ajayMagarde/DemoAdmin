// third-party
import { createSlice } from '@reduxjs/toolkit';
import axiosApiHelper from 'utils/axiosHelper';

// project imports
import { dispatch } from '../index';

// ----------------------------------------------------------------------
const PROXY = `${process.env.REACT_APP_API_URL}/api/admin/`;
console.log(PROXY);

const initialState = {
    error: null,
    games: [],
    loading: true
};

const slice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // ADD GAME
        addGameSuccess(state, action) {
            state.games.push(action.payload.ResponseData);
            state.loading = false;
        },

        // GET GAMES
        getGamesSuccess(state, action) {
            state.games = action.payload.ResponseData;
            state.loading = false;
        },

        // UPDATE GAME
        updateGameSuccess(state, action) {
            const index = state.games.findIndex((game) => game._id === action.payload._id);
            if (index !== -1) {
                state.games[index] = action.payload;
            }
            state.loading = false;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export const GetGamesAPI = () => async () => {
    try {
        const response = await axiosApiHelper('get', `${PROXY}get-offers`);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.getGamesSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const AddGameAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}add-offer`, formData);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.addGameSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};

export const UpdateGameAPI = (formData) => async () => {
    try {
        const response = await axiosApiHelper('post', `${PROXY}update-offer`, formData);
        if (response.data.succeeded === true) {
            dispatch(slice.actions.updateGameSuccess(response.data));
        }
        return response.data;
    } catch (error) {
        return error;
    }
};
