import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react'
import {firebaseConfig} from '../src/enviroment/firebase-config'
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {RouterConfig} from "./router/router-config";
import {
    ReactReduxFirebaseProvider,
    firebaseReducer
} from 'react-redux-firebase';
import {createFirestoreInstance} from "redux-firestore";
import SendRequestModal from "./components/passenger/dialog/send-request.modal";
// import 'bootstrap/dist/css/bootstrap.min.css';
import SendMessageModal from "./components/driver/pages/home-page/dialogs/sendMessage.modal";
import SendReplyModal from "./components/driver/pages/message/dialogs/send-reply-modal/send-reply-moda";
import theme from './theme'
import SidebarV2 from "./components/common/sidebar/sideBarV2.component";

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                <BrowserRouter>
                    <ChakraProvider theme={theme}>
                        <RouterConfig/>
                        <SendRequestModal/>
                        <SendMessageModal/>
                        <SendReplyModal/>
                    </ChakraProvider>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
