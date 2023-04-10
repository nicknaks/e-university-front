const defaultState = {
    faculties: [],
}

const FacultyTypes = {
    SET_FACULTIES: "SET_FACULTIES",
}

export const FacultyReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FacultyTypes.SET_FACULTIES: {
            return {...state, faculties: action.payload}
        }
        default:
            return state;
    }
}

export const facultyActionFaculties = (payload) => {
    return {
        type: FacultyTypes.SET_FACULTIES,
        payload
    }
}