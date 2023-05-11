export interface Group {
    id: string,
    number: string,
    course: number,
    students: Student,
}

export interface Teacher {
    id: string,
    name: string,
}

export interface Student {
    id: string,
    name: string,
    login: string,
    number: string,
}


export enum LessonType {
    DEFAULT = '',
    LAB = 'лаб',
    LEC = 'лек',
    SEM = 'сем',
}

export interface Schedule {
    id: string,
    type: string,
    subjectID: string,
    name: string,
    couple: number,
    day: number,
    groupID: string,
    teacherID: string,
    cabinet: string,
    isDenominator: boolean,
    isNumerator: boolean,
    teacher: Teacher
    group: Group
}

export interface ScheduleState {
    schedule: Array<Schedule>,
}

export enum ScheduleActionEnum {
    SET_SCHEDULE = 'SET_SCHEDULE',
    SET_NULL_SCHEDULE = 'SET_NULL_SCHEDULE',
}

export interface SetScheduleAction {
    type: ScheduleActionEnum.SET_SCHEDULE,
    payload: Array<Schedule>,
}

export interface SetScheduleNullAction {
    type: ScheduleActionEnum.SET_NULL_SCHEDULE,
    payload: [],
}

export type ScheduleAction = SetScheduleAction | SetScheduleNullAction;