import React from 'react';
import ReactDOM from 'react-dom';
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
import {RouterConfig} from "./router/router-config";
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
    createFirestoreInstance,
};

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <ChakraProvider theme={theme}>
                    <RouterConfig/>
                </ChakraProvider>
            </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
);

reportWebVitals();