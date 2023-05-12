import {ScheduleAction, ScheduleActionEnum, ScheduleState} from "./types";

const defaultState: ScheduleState = {
    schedule: [],
    subject: [],
    teachers: [],
}

export const ScheduleReducer = (state = defaultState, action: ScheduleAction) => {
    switch (action.type) {
        case ScheduleActionEnum.SET_SCHEDULE: {
            return {...state, schedule: action.payload}
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