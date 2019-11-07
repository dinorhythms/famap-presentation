import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "./reducers/rootReducer";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";

// firebase
import { firebase as fbConfig, rrfConfig } from './config.js'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore' // make sure you add this for firestore
import { reactReduxFirebase } from 'react-redux-firebase';
import { reduxFirestore } from 'redux-firestore'

// Initialize Firebase instance
firebase.initializeApp(fbConfig)

// initialize Firestore
firebase.firestore()

const initialState = {};
const middleware = [thunk];

const storeEnhanser = composeWithDevTools || compose;

const store = createStore(
	rootReducer,
	initialState,
	storeEnhanser(
        applyMiddleware(...middleware),
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase)
    )
);

export default store;

