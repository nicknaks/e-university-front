
import {localUrl} from "../store";
import {
    scheduleActionLoading,
    scheduleActionSchedule,
    scheduleActionScheduleNull,
    scheduleActionSubjects, scheduleActionSubjectsNull, scheduleActionTeachers
} from "../reducers/sheduleReducer/sheduleReducer";
import axios from "axios";

export const getSchedule = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

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

            if (res.data.data.schedule.length === 0) {
                return false
            }

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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const getScheduleTeacher = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSchedule",
                    "query": `query fetchSchedule{ schedule (filter: {teacherID:"${id}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type }}`,
                }
            });

            dispatch(scheduleActionScheduleNull([]));

            if (res.data.data.schedule.length === 0) {
                return false
            }

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
            dispatch(scheduleActionLoading(false));
        }
    }
}


export const getMySchedule = () => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchMySchedule",
                    "query": `query fetchMySchedule{ mySchedule{id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type }}`,
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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const getTeachers = () => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

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
            dispatch(scheduleActionLoading(false));
        }
    }
}


export const getSubjects = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{teacherID:"${id}"}) { id group{ number } teacher{ name } name type}}`,
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

            dispatch(scheduleActionLoading(false));
        }
    }
}

export const addSubjects = (name, groupId, teacherId, type) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const add = await axios({
                url: localUrl,
                method: 'post',
                withCredentials: true,
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "subjectCreate",
                    query: `mutation subjectCreate{ subjectCreate (input:{name:"${name}", groupID:"${groupId}", teacherID:"${teacherId}", type:${type}}){id}}`,
                }
            });

            dispatch(scheduleActionSubjectsNull([]));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{groupID:"${groupId}"}) { id group{ number } teacher{ name } name type}}`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionSubjects(res.data.data.subjects))


            //dispatch(scheduleActionSubjects(res.data.data.subjects))

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

export const changeTypeSubjects = (id, groupId, type) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                withCredentials: true,
                headers: {"Content-Type": "application/json", },
                data: {
                    query: `mutation { subjectTypeChange(input:{id:"${id}", type:${type}}){type}}`,
                }
            });

            dispatch(scheduleActionSubjectsNull([]));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{groupID:"${groupId}"}) { id group{ number } teacher{ name } name type}}`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionSubjects(res.data.data.subjects))


            //dispatch(scheduleActionSubjects(res.data.data.subjects))

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

export const addLesson = (id, type, couple, day, isDen, isNum, cab, groupId) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                withCredentials: true,
                headers: {"Content-Type": "application/json", },
                data: {
                    query: `mutation { lessonCreate(input:{subjectID:"${id}", type:${type}, couple:${couple},day:${day},isDenominator:${isDen}, isNumerator:${isNum}, cabinet:"${cab}"}){id}}`,
                }
            });

            dispatch(scheduleActionScheduleNull([]));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSchedule",
                    "query": `query fetchSchedule{ schedule (filter: {groupID:"${groupId}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type }}`,
                }
            });

            dispatch(scheduleActionSchedule(res.data.data.schedule))

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


export const getGroupSubjects = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{groupID:"${id}"}) { id group{ number } teacher{ name } name type}}`,
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
        }
    }
}