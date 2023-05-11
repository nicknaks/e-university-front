import {ScheduleAction, ScheduleActionEnum, ScheduleState} from "./types";

const defaultState: ScheduleState = {
    schedule: [],
}

export const ScheduleReducer = (state = defaultState, action: ScheduleAction) => {
    switch (action.type) {
        case ScheduleActionEnum.SET_SCHEDULE: {
            return {...state, schedule: action.payload}
        }
        case ScheduleActionEnum.SET_NULL_SCHEDULE: {
            return {...state, schedule: []}
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

export const scheduleActionScheduleNull = (payload) => {
    return {
        type: ScheduleActionEnum.SET_NULL_SCHEDULE,
        payload
    }
}