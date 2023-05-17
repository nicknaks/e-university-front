import MainPage from "../pages/MainPage/MainPage";
import GroupsPage from "../pages/GroupsPage/GroupsPage";
import React from "react";
import TimeTablePage from "../pages/TimetablePage/TimeTablePage";
import MyInfoPage from "../pages/MyInfoPage/MyInfoPage";
import TeachersPage from "../pages/TeachersPage/TeachersPage";
import GradePage from "../pages/GradePage/GradePage";
import GradeKRPage from "../pages/GradeKRPage/GradeKRPage";

export interface IRoutes {
    path: string;
    component: JSX.Element;
}

export enum RoutesNames {
    MAIN = '/',
    GROUPS = '/groups',
    TEACHERS = '/teachers',
    GRADE = '/grade/:id',
    MYINFO = '/myinfo',
    TIMETABLE = '/schedule/:id',
    GRADEKR = '/gradekr/:id',
    ERROR = '*',
}

export const AllRoutes: IRoutes[] = [
     {path: RoutesNames.MAIN, component: <MainPage/>},
     {path: RoutesNames.GRADE, component: <GradePage/>},
     {path: RoutesNames.GRADEKR, component: <GradeKRPage/>},
     {path: RoutesNames.TIMETABLE, component: <TimeTablePage/>},
     {path: RoutesNames.TEACHERS, component: <TeachersPage/>},
     {path: RoutesNames.MYINFO, component: <MyInfoPage/>},
     {path: RoutesNames.GROUPS, component: <GroupsPage/>},
];