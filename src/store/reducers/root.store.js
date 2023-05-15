import {combineReducers} from "@reduxjs/toolkit";
import {firebaseReducer} from 'react-redux-firebase'
import firestoreReducer from "redux-firestore";
import commonSlice from './common-slice'
import modalSlice from './modal-slice'
import notificationSlice from "./notification-slice";

const RootStore = combineReducers({
    commonSlice: commonSlice,
    modalSlice:modalSlice,
    notificationSlice:notificationSlice,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default RootStore