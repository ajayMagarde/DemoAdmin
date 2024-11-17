// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import userReducer from './slices/user1';
import cartReducer from './slices/cart';
import menuReducer from './slices/menu';
import adminReducer from './slices/adminAuth';
import adminDataReducer from './slices/adminAction';
import versionReducer from './slices/version';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    admin: adminReducer,
    snackbar: snackbarReducer,
    version: versionReducer,
    adminAction: adminDataReducer,
    user1: userReducer,
    menu: menuReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    )
});

export default reducer;
