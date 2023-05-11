export interface Faculties {
    departments: Array<Departments>,
    id: string,
    name: string,
    number: string,
}

export interface Departments {
    id: string,
    name: string,
    number: string,
}

export interface Groups {
    id: string,
    number: string,
    course: number,
    students: Array<Students>
}

export interface Students {
    id: string,
    name: string,
    login: string,
    number: string
}

export interface FacState {
    faculties: Array<Faculties>,
    groups: Array<Groups>,
    course1: Array<Groups>
    course2: Array<Groups>
    course3: Array<Groups>
    course4: Array<Groups>
    course5: Array<Groups>
    course6: Array<Groups>
}

export enum FacActionEnum {
    SET_FACULTIES = "SET_FACULTIES",
    SET_GROUPS = "SET_GROUPS",
    SET_COURSE1 = "SET_COURSE1",
    SET_COURSE2 = "SET_COURSE2",
    SET_COURSE3 = "SET_COURSE3",
    SET_COURSE4 = "SET_COURSE4",
    SET_COURSE5 = "SET_COURSE5",
    SET_COURSE6 = "SET_COURSE6",
}

export interface SetFacAction {
    type: FacActionEnum.SET_FACULTIES,
    payload: Array<Faculties>
}

export interface SetGroupAction {
    type: FacActionEnum.SET_GROUPS,
    payload: Array<Groups>
}

export interface SetCourse1Action {
    type: FacActionEnum.SET_COURSE1,
    payload: Array<Groups>
}

export interface SetCourse2Action {
    type: FacActionEnum.SET_COURSE2,
    payload: Array<Groups>
}

export interface SetCourse3Action {
    type: FacActionEnum.SET_COURSE3,
    payload: Array<Groups>
}

export interface SetCourse4Action {
    type: FacActionEnum.SET_COURSE4,
    payload: Array<Groups>
}

export interface SetCourse5Action {
    type: FacActionEnum.SET_COURSE5,
    payload: Array<Groups>
}

export interface SetCourse6Action {
    type: FacActionEnum.SET_COURSE6,
    payload: Array<Groups>
}

export type FacAction = SetFacAction | SetGroupAction | SetCourse6Action | SetCourse5Action | SetCourse4Action | SetCourse3Action | SetCourse2Action | SetCourse1Action