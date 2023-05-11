import {AuthAction, AuthActionEnum, AuthState, Me} from "./types";

const defaultState: AuthState = {
    me: {} as Me,
}

export const AuthReducer = (state = defaultState, action: AuthAction) => {
    switch (action.type) {
        case AuthActionEnum.SET_LOGIN: {
            return {...state, me: action.payload}
        }
        case AuthActionEnum.SET_LOGOUT: {
            return {...state, me: action.payload}
        }
        default:
            return state;
    }
}

export const authActionLogin = (payload) => {
    return {
        type: AuthActionEnum.SET_LOGIN,
        payload
    }
}

export const authActionLogout = (payload) => {
    return {
        type: AuthActionEnum.SET_LOGOUT,
        payload
    }
}