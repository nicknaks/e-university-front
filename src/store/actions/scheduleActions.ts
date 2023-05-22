import {localUrl} from "../store";
import {
    scheduleActionClasses, scheduleActionClassesNull,
    scheduleActionLoading,
    scheduleActionSchedule,
    scheduleActionScheduleNull,
    scheduleActionStudents,
    scheduleActionStudentsNull,
    scheduleActionSubjectResult,
    scheduleActionSubjectResultNull,
    scheduleActionSubjects,
    scheduleActionSubjectsNull,
    scheduleActionTeachers
} from "../reducers/sheduleReducer/sheduleReducer";
import axios from "axios";

export const getSchedule = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSchedule",
                        "query": `query fetchSchedule{ schedule (filter: {groupID:"${id}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type addTeacherID addTeacher{id name}}}`,
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
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSchedule",
                    "query": `query fetchSchedule{ schedule (filter: {teacherID:"${id}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type addTeacherID addTeacher{id name}}}`,
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
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchMySchedule",
                    "query": `query fetchMySchedule{ mySchedule{id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type addTeacherID addTeacher{id name}}}`,
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
                headers: {"Content-Type": "application/json",},
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
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{teacherID:"${id}"}) { id group{ id number } teacher{ id name } name type addTeacherID addTeacher{id name}}}`,
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
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "subjectCreate",
                    query: `mutation subjectCreate{ subjectCreate (input:{name:"${name}", groupID:"${groupId}", teacherID:"${teacherId}", type:${type}}){id}}`,
                }
            });

            dispatch(scheduleActionSubjectsNull([]));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{groupID:"${groupId}"}) { id group{ number } teacher{ id name } name type addTeacherID addTeacher{id name}}}`,
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
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { subjectTypeChange(input:{id:"${id}", type:${type}}){type}}`,
                }
            });

            dispatch(scheduleActionSubjectsNull([]));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{groupID:"${groupId}"}) { id group{ number } teacher{ id name } name type addTeacherID addTeacher{id name}}}`,
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
            //dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                withCredentials: true,
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { lessonCreate(input:{subjectID:"${id}", type:${type}, couple:${couple},day:${day},isDenominator:${isDen}, isNumerator:${isNum}, cabinet:"${cab}"}){id}}`,
                }
            });

            if (add.data.data.lessonCreate === null) {

                throw Error('false');
            } else {

                dispatch(scheduleActionScheduleNull([]));

                const res = await axios({
                    url: localUrl,
                    method: 'post',
                    headers: {"Content-Type": "application/json",},
                    data: {
                        "operationName": "fetchSchedule",
                        "query": `query fetchSchedule{ schedule (filter: {groupID:"${groupId}"}) {id name couple cabinet groupID teacherID name subjectID isNumerator isDenominator day group{number} teacher{name} type addTeacherID addTeacher{id name}}}`,
                    }
                });

                dispatch(scheduleActionSchedule(res.data.data.schedule))

                return true
            }
        } catch (error) {
            return false
        } finally {
            //dispatch(scheduleActionLoading(false));
        }
    }
}


export const getGroupSubjects = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubjects",
                    "query": `query fetchSubjects{ subjects (filter:{groupID:"${id}"}) { id group{ number } teacher{ id name } name type addTeacherID addTeacher{id name}}}`,
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

export const getStudents = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchStudents",
                    "query": `query fetchStudents{students(filter:{groupID:"${id}"}) {id name groupId}}`,
                }
            });


            dispatch(scheduleActionStudentsNull([]))

            dispatch(scheduleActionStudents(res.data.data.students))

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

export const addStudents = (name, id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { studentCreate(input:{name:"${name}", groupID:"${id}"}) { id name groupId }}`,
                },
                withCredentials: true
            });

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchStudents",
                    "query": `query fetchStudents{students(filter:{groupID:"${id}"}) {id name groupId}}`,
                }
            });

            dispatch(scheduleActionStudentsNull([]))

            dispatch(scheduleActionStudents(res.data.data.students))

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

export const getSubjectsResult = (id) => {
    return async (dispatch) => {
        try {
            //dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubjectsResult",
                    "query": `query fetchSubjectsResult{ subjectResults(filter:{studentID:"${id}"}){ studentID subjectID subject{ id name teacherID type group {number} teacher{ id name } } firstModuleMark secondModuleMark thirdModuleMark mark total countAbsent}}`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionSubjectResultNull([]));

            if (res.data.data.subjectResults !== null) {
                dispatch(scheduleActionSubjectResult(res.data.data.subjectResults));
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
           // dispatch(scheduleActionLoading(false));
        }
    }
}

export const getOneSubjectsResult = (id, subId) => {
    return async (dispatch) => {
        try {
            //dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubjectsResult",
                    "query": `query fetchSubjectsResult{ subjectResults(filter:{subjectID: "${subId}"}){ id studentID subjectID subject{ name teacherID type group {number} teacher{id name } } firstModuleMark secondModuleMark thirdModuleMark mark total examResult countAbsent}}`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionSubjectResultNull([]));

            if (res.data.data.subjectResults !== null) {
                dispatch(scheduleActionSubjectResult(res.data.data.subjectResults));
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
            // dispatch(scheduleActionLoading(false));
        }
    }
}

export const getOneSubjects = (id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchSubject",
                    "query": `query fetchSubject{ subjects (filter:{ID:"${id}"}) { id group{ id number } teacher{ id name } name type addTeacherID addTeacher{id name}}}`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionSubjectsNull([]));

            if (res.data.data.subjects !== null) {
                dispatch(scheduleActionSubjects(res.data.data.subjects))
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

            dispatch(scheduleActionLoading(false));
        }
    }
}

export const getClasses = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchClasses",
                    "query": `query fetchClasses{ classes(filter:{subjectID:"${id}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }} }`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionClassesNull([]));

            if (res.data.data.classes !== null) {
                dispatch(scheduleActionClasses(res.data.data.classes))
            }

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

export const changeAbsentAction = (ids, id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            console.log()

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { absentSet(input:{classProgressID: [${ids.map((item) => {return `"${item}"`})}]}){ id isAbsent} }`,
                },
                withCredentials: true
            });

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchClasses",
                    "query": `query fetchClasses{ classes(filter:{subjectID:"${id}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }} }`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionClassesNull([]));

            if (res.data.data.classes !== null) {
                dispatch(scheduleActionClasses(res.data.data.classes))
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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const changeAbsentFalseAction = (ids, id) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { attendedSet(input:{classProgressID: [${ids.map((item) => {return `"${item}"`})}]}){ id isAbsent} }`,
                },
                withCredentials: true
            });

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchClasses",
                    "query": `query fetchClasses{ classes(filter:{subjectID:"${id}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }} }`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionClassesNull([]));

            if (res.data.data.classes !== null) {
                dispatch(scheduleActionClasses(res.data.data.classes))
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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const changeMarkAction = (id, mark, subId) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { markCreate(input:{classProgressID:"${id}", mark:${mark}}){ id } }`,
                },
                withCredentials: true
            });

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchClasses",
                    "query": `query fetchClasses{ classes(filter:{subjectID:"${subId}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }} }`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionClassesNull([]));

            if (res.data.data.classes !== null) {
                dispatch(scheduleActionClasses(res.data.data.classes))
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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const changeExam = (id, exam, subId) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { examResultSet(input:{examResultID:"${id}", mark:${exam}}){ id studentID subjectID subject{ name teacherID type group {number} teacher{ name } } firstModuleMark secondModuleMark thirdModuleMark mark total examResult countAbsent} }`,
                },
                withCredentials: true
            });

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchClasses",
                    "query": `query fetchClasses{ classes(filter:{subjectID:"${subId}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }} }`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionClassesNull([]));

            if (res.data.data.classes !== null) {
                dispatch(scheduleActionClasses(res.data.data.classes))
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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const changeName = (id, name, subId) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { classNameSet(input:{classID:"${id}", name:"${name}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }}}`,
                },
                withCredentials: true
            });

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    "operationName": "fetchClasses",
                    "query": `query fetchClasses{ classes(filter:{subjectID:"${subId}"}){ id groupID subjectID day module name comment type studentProgress{ id isAbsent mark studentID }} }`,
                },
                withCredentials: true,
            });

            dispatch(scheduleActionClassesNull([]));

            if (res.data.data.classes !== null) {
                dispatch(scheduleActionClasses(res.data.data.classes))
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
            dispatch(scheduleActionLoading(false));
        }
    }
}

export const changeTotal = (id, total, subId) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { totalMarkSet(input:{subjectResultID:"${id}", totalMark:${total}}) { id studentID subjectID subject{ name teacherID type group {number} teacher{ name } } firstModuleMark secondModuleMark thirdModuleMark mark total examResult countAbsent}}`,
                },
                withCredentials: true
            });

            dispatch(getOneSubjectsResult(1, subId))

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

export const changeProgressAction = (id, module, mark, subId) => {
    return async (dispatch) => {
        try {
            dispatch(scheduleActionLoading(true));

            const add = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json",},
                data: {
                    query: `mutation { moduleSetResult(input:{subjectResultID:"${id}", module:${module}, mark:${mark}}) { firstModuleMark firstModuleMarkComment secondModuleMark secondModuleMarkComment thirdModuleMark thirdModuleMarkComment examResult examResultComment}}`,
                },
                withCredentials: true
            });

            dispatch(getOneSubjectsResult(1, subId))

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

export const getExel = (id) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                url: `http://localhost:8090/download?id=${id}`,
                method: 'get',
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            });

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


