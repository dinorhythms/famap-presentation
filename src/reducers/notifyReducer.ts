import { GET_NOTIFICATION } from '../types';

interface action {
    type: any;
    payload: any;
}

interface InitialState {
    message: any;
    messageType: any;
}

const initialState: InitialState = {
    message: null,
    messageType: null,
}

const nofifyReducer = (state = initialState, action: action) => {
    switch (action.type) {
        case GET_NOTIFICATION:
            return {
                ...state,
                message: action.payload.message,
                messageType: action.payload.messageType
            }    
        default:
            return state;
    }
}

export default nofifyReducer