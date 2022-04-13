import {combineReducers} from "@reduxjs/toolkit";
import {firebaseReducer} from 'react-redux-firebase'
import firestoreReducer from "redux-firestore";
import commonSlice from './common-slice'

const RootStore = combineReducers({
    commonSlice: commonSlice,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default RootStore