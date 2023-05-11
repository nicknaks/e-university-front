import {FacAction, FacActionEnum, FacState} from "./types";

const defaultState: FacState = {
    faculties: [],
    groups: [],
    course1: [],
    course2: [],
    course3: [],
    course4: [],
    course5: [],
    course6: [],
}

export const FacultyReducer = (state = defaultState, action: FacAction) => {
    switch (action.type) {
        case FacActionEnum.SET_FACULTIES: {
            return {...state, faculties: action.payload}
        }
        case FacActionEnum.SET_GROUPS: {
            return {...state, groups: action.payload}
        }
        case FacActionEnum.SET_COURSE1: {
            return {...state, course1: action.payload}
        }
        case FacActionEnum.SET_COURSE2: {
            return {...state, course2: action.payload}
        }
        case FacActionEnum.SET_COURSE3: {
            return {...state, course3: action.payload}
        }
        case FacActionEnum.SET_COURSE4: {
            return {...state, course4: action.payload}
        }
        case FacActionEnum.SET_COURSE5: {
            return {...state, course5: action.payload}
        }
        case FacActionEnum.SET_COURSE6: {
            return {...state, course6: action.payload}
        }
        default:
            return state;
    }
}

export const facultyActionFaculties = (payload) => {
    return {
        type: FacActionEnum.SET_FACULTIES,
        payload
    }
}

export const facultyActionGroups = (payload) => {
    return {
        type: FacActionEnum.SET_GROUPS,
        payload
    }
}

export const facultyActionCourse1 = (payload) => {
    return {
        type: FacActionEnum.SET_COURSE1,
        payload
    }
}

export const facultyActionCourse2 = (payload) => {
    return {
        type: FacActionEnum.SET_COURSE2,
        payload
    }
}

export const facultyActionCourse3 = (payload) => {
    return {
        type: FacActionEnum.SET_COURSE3,
        payload
    }
}

export const facultyActionCourse4 = (payload) => {
    return {
        type: FacActionEnum.SET_COURSE4,
        payload
    }
}

export const facultyActionCourse5 = (payload) => {
    return {
        type: FacActionEnum.SET_COURSE5,
        payload
    }
}

export const facultyActionCourse6 = (payload) => {
    return {
        type: FacActionEnum.SET_COURSE6,
        payload
    }
}