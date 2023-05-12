import axios from "axios";
import {localUrl} from "../store";
import {
    facultyActionCourse1,
    facultyActionCourse2, facultyActionCourse3, facultyActionCourse4, facultyActionCourse5, facultyActionCourse6,
    facultyActionFaculties,
    facultyActionGroups
} from "../reducers/facultyReducer/facultyReducer";

export const facultiesList = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchFaculties",
                    "query": `query fetchFaculties{ faculties { id name number departments{ id name number }}}`,
                }
            });

            dispatch(facultyActionFaculties(res.data.data.faculties));

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

export const groupsList = (id) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchGroups",
                    "query": `query fetchGroups { groups (filter: { departmentID: "${id}" }) { id number course students { id name login number } } }`,
                }
            });

            dispatch(facultyActionGroups(res.data.data.groups));

            if (res.data.data.groups === null) {
                dispatch(facultyActionCourse1([]));
                dispatch(facultyActionCourse2([]));
                dispatch(facultyActionCourse3([]));
                dispatch(facultyActionCourse4([]));
                dispatch(facultyActionCourse5([]));
                dispatch(facultyActionCourse6([]));

                return false
            }

            const kolCourse = res.data.data.groups[res.data.data.groups.length - 1].course;

            for (let i = 1; i <= kolCourse; i++) {
                switch (i) {
                    case 1: {
                        dispatch(facultyActionCourse1(res.data.data.groups.filter(item => item.course === 1)));

                        break;
                    }
                    case 2: {
                        dispatch(facultyActionCourse2(res.data.data.groups.filter(item => item.course === 2)));

                        break;
                    }
                    case 3: {
                        dispatch(facultyActionCourse3(res.data.data.groups.filter(item => item.course === 3)));

                        break;
                    }
                    case 4: {
                        dispatch(facultyActionCourse4(res.data.data.groups.filter(item => item.course === 4)));

                        break;
                    }
                    case 5: {
                        dispatch(facultyActionCourse5(res.data.data.groups.filter(item => item.course === 5)));

                        break;
                    }
                    case 6: {
                        dispatch(facultyActionCourse6(res.data.data.groups.filter(item => item.course === 6)));

                        break;
                    }
                }
            }

            return true
        } catch (error) {
            return false
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}

export const groupsListMag = (id, check) => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            const res = await axios({
                url: localUrl,
                method: 'post',
                headers: {"Content-Type": "application/json", },
                data: {
                    "operationName": "fetchGroups",
                    "query": `query fetchGroups { groups (filter: { departmentID: "${id}", isMagistracy: ${check} }) { id number course students { id name login number } } }`,
                }
            });

            dispatch(groupsNullList());
            dispatch(facultyActionGroups(res.data.data.groups));

            if (res.data.data.groups === null) {
                dispatch(facultyActionCourse1([]));
                dispatch(facultyActionCourse2([]));
                dispatch(facultyActionCourse3([]));
                dispatch(facultyActionCourse4([]));
                dispatch(facultyActionCourse5([]));
                dispatch(facultyActionCourse6([]));

                return false
            }

            const kolCourse = res.data.data.groups[res.data.data.groups.length - 1].course;

            for (let i = 1; i <= kolCourse; i++) {
                switch (i) {
                    case 1: {
                        dispatch(facultyActionCourse1(res.data.data.groups.filter(item => item.course === 1)));

                        break;
                    }
                    case 2: {
                        dispatch(facultyActionCourse2(res.data.data.groups.filter(item => item.course === 2)));

                        break;
                    }
                    case 3: {
                        dispatch(facultyActionCourse3(res.data.data.groups.filter(item => item.course === 3)));

                        break;
                    }
                    case 4: {
                        dispatch(facultyActionCourse4(res.data.data.groups.filter(item => item.course === 4)));

                        break;
                    }
                    case 5: {
                        dispatch(facultyActionCourse5(res.data.data.groups.filter(item => item.course === 5)));

                        break;
                    }
                    case 6: {
                        dispatch(facultyActionCourse6(res.data.data.groups.filter(item => item.course === 6)));

                        break;
                    }
                }
            }

            return true
        } catch (error) {
            return false
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}

export const groupsNullList = () => {
    return async (dispatch) => {
        try {
            // dispatch(authActionLoading(true)) -- лоудер;

            dispatch(facultyActionGroups([]));

            dispatch(facultyActionCourse1([]));
            dispatch(facultyActionCourse2([]));
            dispatch(facultyActionCourse3([]));
            dispatch(facultyActionCourse4([]));
            dispatch(facultyActionCourse5([]));
            dispatch(facultyActionCourse6([]));

            return true
        } catch (error) {
            return false
        } finally {
            // dispatch(authActionLoading(false));
        }
    }
}

