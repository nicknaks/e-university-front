export interface Me {
    id: number,
    type: string,
    owner_id: number,
}

export interface AuthState {
    me: Me
}

export enum AuthActionEnum {
    SET_LOGIN = 'SET_LOGIN',
    SET_LOGOUT = 'SET_LOGOUT',
}

export interface SetLoginAction {
    type: AuthActionEnum.SET_LOGIN,
    payload: Me,
}

export interface SetLogoutAction {
    type: AuthActionEnum.SET_LOGOUT,
    payload: {},
}

export type AuthAction = SetLoginAction | SetLogoutAction;