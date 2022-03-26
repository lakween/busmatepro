import {combineReducers} from "@reduxjs/toolkit";
import { firebaseReducer } from 'react-redux-firebase'
import firestoreReducer from "redux-firestore";

const RootStore = combineReducers({
    
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default RootStore