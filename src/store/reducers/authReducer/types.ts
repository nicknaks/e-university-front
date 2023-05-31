export interface Me {
    id: number,
    type: UserType,
    owner_id: number,
}

export enum UserType {
    UNKNOWN = '',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
}

export interface AuthState {
    me: Me
    name?: string,
}

export enum AuthActionEnum {
    SET_LOGIN = 'SET_LOGIN',
    SET_LOGOUT = 'SET_LOGOUT',
    SET_NAME_TEACHER = 'SET_NAME_TEACHER',
}

export interface SetLoginAction {
    type: AuthActionEnum.SET_LOGIN,
    payload: Me,
}

export interface SetLogoutAction {
    type: AuthActionEnum.SET_LOGOUT,
    payload: Me,
}

export interface SetTeacherNameAction {
    type: AuthActionEnum.SET_NAME_TEACHER,
    payload: string,
}

export type AuthAction = SetLoginAction | SetLogoutAction | SetTeacherNameAction;