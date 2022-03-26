import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react'
import {firebaseConfig} from '../src/enviroment/firebase-config'
import theme from './theme'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {store} from "./store/store";
import { Provider } from "react-redux";


import {
    ReactReduxFirebaseProvider,
    firebaseReducer
} from 'react-redux-firebase';
import {createFirestoreInstance} from "redux-firestore";


firebase.initializeApp(firebaseConfig)
firebase.firestore();

const rrfConfig = {
  userProfile: "passengers",
  useFirestoreForProfile: true,
};

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance, //since we are using Firestore
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <App/>
                </ChakraProvider>
            </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
