import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import nofifyReducer from '../reducers/notifyReducer';

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    form: formReducer,
    notification: nofifyReducer
})

export default rootReducer;