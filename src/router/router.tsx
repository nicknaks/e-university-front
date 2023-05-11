import MainPage from "../pages/MainPage/MainPage";
import GroupsPage from "../pages/GroupsPage/GroupsPage";
import React from "react";
import TimeTablePage from "../pages/TimetablePage/TimeTablePage";

export interface IRoutes {
    path: string;
    component: JSX.Element;
}

export enum RoutesNames {
    MAIN = '/',
    GROUPS = '/groups',
    TIMETABLE = '/schedule/:id',
    ERROR = '*',
}

export const AllRoutes: IRoutes[] = [
     {path: RoutesNames.MAIN, component: <MainPage/>},
     {path: RoutesNames.TIMETABLE, component: <TimeTablePage/>},
     {path: RoutesNames.GROUPS, component: <GroupsPage/>},
];