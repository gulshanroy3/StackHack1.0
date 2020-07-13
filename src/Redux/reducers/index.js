import { USER_INFO, NOTIFICATION } from "../actionTypes";

const intialstate = {
};

export default function (state = intialstate, action) {
    switch (action.type) {
        case NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };
        case USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            };
        default:
            return { ...state };
    }
}
