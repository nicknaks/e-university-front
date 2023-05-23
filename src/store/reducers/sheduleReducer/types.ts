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
    groupId: string
}

export enum LessonType {
    DEFAULT = '',
    LAB = 'лаб',
    LEC = 'лек',
    SEM = 'сем',
}

export enum SubjectType {
    UNKNOWN = '',
    CREDIT = 'Зачет',
    EXAM = 'Экзамен',
    COURSE_WORK = 'К.Р.',
    PRACTICAL = 'Практика',
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
    addTeacherID: string,
    addTeacher: Teacher,
}

export interface Subjects {
    id: string,
    teacherID: string,
    groupID: string,
    name: string,
    group: Group
    teacher: Teacher,
    type: SubjectType,
    addTeacherID: string,
    addTeacher: Teacher
}

export interface SubjectResults {
    id: string,
    studentID: string,
    subjectID: string,
    subject: Array<Subjects>
    firstModuleMark: number,
    secondModuleMark: number,
    thirdModuleMark: number,
    mark: number,
    total: number,
    examResult: number,
    countAbsent: number,
    firstModuleMarkComment: string,
    secondModuleMarkComment: string,
    thirdModuleMarkComment: string,
    examResultComment: string,
}

export interface ClassProgress {
    id: string,
    classID: string,
    studentID: string,
    isAbsent: boolean,
    teacherID: string,
    mark: number,
}

export interface Class {
    id: string,
    day: string,
    type: LessonType,
    comment: string,
    name: string,
    module: number,
    subjectID: string,
    lessonID: string,
    groupID: string,
    studentProgress: Array<ClassProgress>
}

export interface ScheduleState {
    schedule: Array<Schedule>,
    subject: Array<Subjects>,
    teachers: Array<Teacher>,
    loading: boolean,
    subjectResults: Array<SubjectResults>
    students: Array<Student>,
    classes: Array<Class>
}

export enum ScheduleActionEnum {
    SET_SCHEDULE = 'SET_SCHEDULE',
    SET_SUBJECT_RESULTS = 'SET_SUBJECT_RESULTS',
    SET_SUBJECT_RESULTS_NULL = 'SET_SUBJECT_RESULTS_NULL',
    SET_LOADING = 'SET_LOADING',
    SET_TEACHERS = 'SET_TEACHERS',
    SET_STUDENTS = 'SET_STUDENTS',
    SET_NULL_STUDENTS = 'SET_NULL_STUDENTS',
    SET_NULL_SCHEDULE = 'SET_NULL_SCHEDULE',
    SET_SUBJECTS = 'SET_SUBJECTS',
    SET_NULL_SUBJECTS = 'SET_NULL_SUBJECTS',
    SET_CLASSES = 'SET_CLASSES',
    SET_CLASSES_NULL = 'SET_CLASSES_NULL',
}

export interface SetScheduleAction {
    type: ScheduleActionEnum.SET_SCHEDULE,
    payload: Array<Schedule>,
}

export interface SetSubjectResultAction {
    type: ScheduleActionEnum.SET_SUBJECT_RESULTS,
    payload: Array<SubjectResults>,
}

export interface SetSubjectResultNullAction {
    type: ScheduleActionEnum.SET_SUBJECT_RESULTS_NULL,
    payload: [],
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

export interface SetStudentsAction {
    type: ScheduleActionEnum.SET_STUDENTS,
    payload: Array<Student>,
}

export interface SetStudentsNullAction {
    type: ScheduleActionEnum.SET_NULL_STUDENTS,
    payload: [],
}

export interface SetClassesNullAction {
    type: ScheduleActionEnum.SET_CLASSES_NULL,
    payload: [],
}

export interface SetClassesAction {
    type: ScheduleActionEnum.SET_CLASSES,
    payload: Array<Class>,
}

export type ScheduleAction = SetClassesNullAction | SetClassesAction | SetSubjectResultAction | SetSubjectResultNullAction | SetScheduleAction | SetScheduleNullAction | SetSubjectsNullAction | SetSubjectsAction | SetTeachersAction | SetLoadingAction | SetStudentsAction | SetStudentsNullAction;