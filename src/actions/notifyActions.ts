import { GET_NOTIFICATION } from '../types';

export const getNotification = (message: string, messageType: any)=>{
    return {
        type: GET_NOTIFICATION,
        payload: {message, messageType}
    }
}