import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {FacultyReducer} from "./facultyReducer";

const rootReducer = combineReducers({
    faculty: FacultyReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
});

export const apiUrl = 'http://myaidkit.ru:1323/api/v1';
export const localUrl = 'http://localhost:8080/query';