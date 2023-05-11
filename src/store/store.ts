import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {FacultyReducer} from "./reducers/facultyReducer/facultyReducer";
import {ScheduleReducer} from "./reducers/sheduleReducer/sheduleReducer";
import {AuthReducer} from "./reducers/authReducer/AuthReducer";

const rootReducer = combineReducers({
    faculty: FacultyReducer,
    schedule: ScheduleReducer,
    auth: AuthReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const localUrl = 'http://localhost:8090/query';
export const mutationUrl = 'http://localhost:8090/mutation';