import {configureStore} from '@reduxjs/toolkit';
import {actionTypes, firebaseReducer} from "react-redux-firebase";
import RootStore from "./reducers/root.store";

export const store = configureStore({
    reducer: RootStore,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR]
        }
      }),
});
