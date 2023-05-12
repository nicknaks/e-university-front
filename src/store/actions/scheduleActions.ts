
import {localUrl} from "../store";
import {
    scheduleActionSchedule,
    scheduleActionScheduleNull,
    scheduleActionSubjects, scheduleActionTeachers
} from "../reducers/sheduleReducer/sheduleReducer";
import axios from "axios";

export const getSchedule = (id) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSchedule",
                    "query": `query fetchSchedule{ schedule (filter: {groupID:"${id}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type }}`,
                }
            });

            dispatch(scheduleActionScheduleNull([]));
            dispatch(scheduleActionSchedule(res.data.data.schedule));

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

export const getMySchedule = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchMySchedule",
                    "query": `query fetchMySchedule{ mySchedule{ groupID subjectID name couple day type groupID group{ number } }}`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionScheduleNull([]));
            dispatch(scheduleActionSchedule(res.data.data.mySchedule));

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

export const getTeachers = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchTeachers",
                    "query": `query fetchTeachers{ teachers{ id name }}`,
                },
            });

            dispatch(scheduleActionTeachers(res.data.data.teachers));

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


export const getSubjects = (id) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{teacherID:"${id}"}) { id group{ number } teacher{ name } name }}`,
                },
                withCredentials: true,
            });

           dispatch(scheduleActionSubjects(res.data.data.subjects))

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