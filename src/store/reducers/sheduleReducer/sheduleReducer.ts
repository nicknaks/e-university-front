import {ScheduleAction, ScheduleActionEnum, ScheduleState} from "./types";

const defaultState: ScheduleState = {
    schedule: [],
    subject: [],
    teachers: [],
    loading: false,
    students: [],
    subjectResults: [],
    classes: []
}

export const ScheduleReducer = (state = defaultState, action: ScheduleAction) => {
    switch (action.type) {
        case ScheduleActionEnum.SET_SCHEDULE: {
            return {...state, schedule: action.payload}
        }
        case ScheduleActionEnum.SET_LOADING: {
            return {...state, loading: action.payload}
        }
        case ScheduleActionEnum.SET_NULL_SCHEDULE: {
            return {...state, schedule: []}
        }
        case ScheduleActionEnum.SET_SUBJECTS: {
            return {...state, subject: action.payload}
        }
        case ScheduleActionEnum.SET_TEACHERS: {
            return {...state, teachers: action.payload}
        }
        case ScheduleActionEnum.SET_NULL_SUBJECTS: {
            return {...state, subject: []}
        }
        case ScheduleActionEnum.SET_STUDENTS: {
            return {...state, students: action.payload}
        }
        case ScheduleActionEnum.SET_NULL_STUDENTS: {
            return {...state, students: []}
        }
        case ScheduleActionEnum.SET_SUBJECT_RESULTS_NULL: {
            return {...state, subjectResults: []}
        }
        case ScheduleActionEnum.SET_SUBJECT_RESULTS: {
            return {...state, subjectResults: action.payload}
        }
        case ScheduleActionEnum.SET_CLASSES: {
            return {...state, classes: action.payload}
        }
        case ScheduleActionEnum.SET_CLASSES_NULL: {
            return {...state, classes: []}
        }
        default:
            return state;
    }
}

export const scheduleActionSchedule = (payload) => {
    return {
        type: ScheduleActionEnum.SET_SCHEDULE,
        payload
    }
}

export const scheduleActionLoading = (payload) => {
    return {
        type: ScheduleActionEnum.SET_LOADING,
        payload
    }
}

export const scheduleActionTeachers = (payload) => {
    return {
        type: ScheduleActionEnum.SET_TEACHERS,
        payload
    }
}

export const scheduleActionScheduleNull = (payload) => {
    return {
        type: ScheduleActionEnum.SET_NULL_SCHEDULE,
        payload
    }
}

export const scheduleActionSubjects = (payload) => {
    return {
        type: ScheduleActionEnum.SET_SUBJECTS,
        payload
    }
}

export const scheduleActionSubjectsNull = (payload) => {
    return {
        type: ScheduleActionEnum.SET_NULL_SUBJECTS,
        payload
    }
}

export const scheduleActionStudentsNull = (payload) => {
    return {
        type: ScheduleActionEnum.SET_NULL_STUDENTS,
        payload
    }
}

export const scheduleActionStudents = (payload) => {
    return {
        type: ScheduleActionEnum.SET_STUDENTS,
        payload
    }
}

export const scheduleActionSubjectResult = (payload) => {
    return {
        type: ScheduleActionEnum.SET_SUBJECT_RESULTS,
        payload
    }
}

export const scheduleActionSubjectResultNull = (payload) => {
    return {
        type: ScheduleActionEnum.SET_SUBJECT_RESULTS_NULL,
        payload
    }
}

export const scheduleActionClassesNull = (payload) => {
    return {
        type: ScheduleActionEnum.SET_CLASSES_NULL,
        payload
    }
}

export const scheduleActionClasses = (payload) => {
    return {
        type: ScheduleActionEnum.SET_CLASSES,
        payload
    }
}