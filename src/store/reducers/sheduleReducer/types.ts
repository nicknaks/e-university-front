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

export interface Subjects {
    id: string,
    teacherID: string,
    groupID: string,
    name: string,
    group: Group
    teacher: Teacher
}

export interface ScheduleState {
    schedule: Array<Schedule>,
    subject: Array<Subjects>,
    teachers: Array<Teacher>,
    loading: boolean,
}

export enum ScheduleActionEnum {
    SET_SCHEDULE = 'SET_SCHEDULE',
    SET_LOADING = 'SET_LOADING',
    SET_TEACHERS = 'SET_TEACHERS',
    SET_NULL_SCHEDULE = 'SET_NULL_SCHEDULE',
    SET_SUBJECTS = 'SET_SUBJECTS',
    SET_NULL_SUBJECTS = 'SET_NULL_SUBJECTS',
}

export interface SetScheduleAction {
    type: ScheduleActionEnum.SET_SCHEDULE,
    payload: Array<Schedule>,
}

export interface SetLoadingAction {
    type: ScheduleActionEnum.SET_LOADING,
    payload: boolean,
}

export interface SetSubjectsAction {
    type: ScheduleActionEnum.SET_SUBJECTS,
    payload: Array<Subjects>,
}

export interface SetTeachersAction {
    type: ScheduleActionEnum.SET_TEACHERS,
    payload: Array<Teacher>,
}

export interface SetScheduleNullAction {
    type: ScheduleActionEnum.SET_NULL_SCHEDULE,
    payload: [],
}

export interface SetSubjectsNullAction {
    type: ScheduleActionEnum.SET_NULL_SUBJECTS,
    payload: [],
}

export type ScheduleAction = SetScheduleAction | SetScheduleNullAction | SetSubjectsNullAction | SetSubjectsAction | SetTeachersAction | SetLoadingAction;