import {localUrl, mutationUrl} from "../store";
import axios from "axios";
import {authActionLogin, authActionLogout, authActionTeacherName} from "../reducers/authReducer/AuthReducer";
import {Me} from "../reducers/authReducer/types";
import {scheduleActionLoading} from "../reducers/sheduleReducer/sheduleReducer";

export const loginAction = (login, pass) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                withCredentials: true,
                headers: {"Content-Type": "application/json", },
                data: {
                    query: `mutation { login(login:"${login}", password:"${pass}")}`,
                }
            });

            if (res.data.data === null) {
                return false
            }

            if (res.data.data.login) {
                const me = await axios({
                    url: localUrl,
                    withCredentials: true,
                    method: 'post',
                    headers: {"Content-Type": "application/json", },
                    data: {
                        query: `{ me { id type owner_id }}`,
                    }
                });

                dispatch(authActionLogin(me.data.data.me))
            }

           return true
        } catch (error) {
            if (error.response.data.status === 400) {
                return 400;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                withCredentials: true,
                headers: {"Content-Type": "application/json", },
                data: {
                    query: `mutation { logout}`,
                }
            });

            dispatch(authActionLogout({} as Me))

            return true
        } catch (error) {
            if (error.response.data.status === 400) {
                return 400;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}

export const isLogin = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const me = await axios({
                url: localUrl,
                withCredentials: true,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    query: `{ me { id type owner_id }}`,
                }
            });

            if (me.data.data.me === null) {
                return false
            }

            dispatch(authActionLogin(me.data.data.me))

            return true
        } catch (error) {
            if (error.response.data.status === 400) {
                return 400;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}

export const getTeacherName = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchTeachers",
                    "query": `query fetchTeachers{ teachers (filter:{idIn:"${id}"}) { id name }}`,
                },
            });

            dispatch(authActionTeacherName(res.data.data.teachers[0].name))

            return true
        } catch (error) {
            if (error.response.data.status === 400) {
                return 400;
            }

            if (Math.trunc(error.response.data.status / 100) === 5) {
                return 500;
            }
        } finally {
            dispatch(scheduleActionLoading(false));
        }
    }
}