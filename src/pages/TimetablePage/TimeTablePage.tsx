import React, {FC, useEffect, useRef, useState} from 'react';
import './timetablePage.css'
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {
    addStudents,
    addSubjects, changeTypeSubjects,
    getGroupSubjects,
    getSchedule,
    getScheduleTeacher, getStudents,
    getTeachers
} from "../../store/actions/scheduleActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import OneTable from "../../components/OneTable/OneTable";
import {
    scheduleActionScheduleNull, scheduleActionStudentsNull,
    scheduleActionSubjectsNull
} from "../../store/reducers/sheduleReducer/sheduleReducer";
import Loader from "../../components/Loader/Loader";
import {SubjectType} from "../../store/reducers/sheduleReducer/types";
import ListElement from "../../components/ListElement/ListElement";
import SmallListElement from "../../components/SmallListElement/SmallListElement";
import {isLogin} from "../../store/actions/authActions";
import {Link} from "react-router-dom";

const TimeTablePage: FC = () => {
    const dispatch = useAppDispatch();
    const {schedule, students, loading, subject, teachers} = useAppSelector(state => state.schedule);
    const {me} = useAppSelector(state => state.auth);

    const refPopUp = useRef<HTMLDivElement>()
    const refPopUpBody = useRef<HTMLDivElement>();
    const refName = useRef<HTMLInputElement>();
    const refStud = useRef<HTMLInputElement>();
    const refError = useRef<HTMLDivElement>();
    const refHeadTeachList = useRef<HTMLDivElement>();
    const refTeachArrow = useRef<SVGSVGElement>();
    const refTeachUl = useRef<HTMLUListElement>();
    const refHeadTypeList = useRef<HTMLDivElement>();
    const refTypeArrow = useRef<SVGSVGElement>();
    const refTypeUl = useRef<HTMLUListElement>();
    const refChangeType = useRef<HTMLDivElement>();
    const refBtnAddStud = useRef<HTMLButtonElement>();

    const [day1, setDay1] = useState([])
    const [day2, setDay2] = useState([])
    const [day3, setDay3] = useState([])
    const [day4, setDay4] = useState([])
    const [day5, setDay5] = useState([])
    const [day6, setDay6] = useState([])

    const [name, setName] = useState('');
    const [studName, setStudName] = useState('');
    const [teachList, setTeachList] = useState('Выберите преподавателя');
    const [typeList, setTypeList] = useState('Выберите тип предмета');
    const [oneTypeList, setOneTypeList] = useState('');
    const [error, setError] = useState('');

    const [teach, setTeach] = useState(false);

    const [groupId, setGroupId] = useState('');
    const [teachId, setTeachId] = useState('');
    const [subjId, setSubjId] = useState('');
    const [change, setChange] = useState(false);

    const [tableId, setTableId] = useState('')

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Расписание группы'
        const id = window.location.pathname.slice(10);

        dispatch(getSchedule(id)).then((res) => {
            if (!res) {
                setTeach(true);
                setTableId(id)
                dispatch(getScheduleTeacher(id))
            }
        });

        return () => {
            dispatch(scheduleActionStudentsNull([]));
            dispatch(scheduleActionScheduleNull([]));
            dispatch(scheduleActionSubjectsNull([]));
        }
    }, [])

    useEffect(() => {
        const id = window.location.pathname.slice(10);

        if (Object.keys(me).length === 0) {
            dispatch(isLogin()).then(res => {
                if (res) {
                    dispatch(getStudents(id));
                }
            });
        } else {
            dispatch(getStudents(id));
        }
    }, [me])

    useEffect(() => {
        const id = window.location.pathname.slice(10);

        if (teach) {
            document.getElementsByTagName('title')[0].innerText = 'Расписание преподавателя'
        }

        if (!teach) {
            setGroupId(id)
            dispatch(getTeachers())
            dispatch(getGroupSubjects(id));
        }
    }, [teach])


    useEffect(() => {
        setDay1(schedule.filter((item) => {
            if (item.day === 1) {
                return item;
            }
        }))
        setDay2(schedule.filter((item) => {
            if (item.day === 2) {
                return item;
            }
        }))
        setDay3(schedule.filter((item) => {
            if (item.day === 3) {
                return item;
            }
        }))
        setDay4(schedule.filter((item) => {
            if (item.day === 4) {
                return item;
            }
        }))
        setDay5(schedule.filter((item) => {
            if (item.day === 5) {
                return item;
            }
        }))
        setDay6(schedule.filter((item) => {
            if (item.day === 6) {
                return item;
            }
        }))
    }, [schedule]);

    const openPopUp = (e) => {
        document.body.style.overflowY = 'hidden';
        e.preventDefault();

        refPopUp.current.classList.add('popUp-container-active');
        refPopUpBody.current.classList.add('popUp-active');
    }

    const closePopUp = (e) => {
        document.body.style.overflowY = 'visible';
        e.preventDefault();

        refPopUp.current.classList.remove('popUp-container-active');
        refPopUpBody.current.classList.remove('popUp-active');
    }

    const changeName = (value) => {
        setError('')
        setName(value)
    }

    const openTeachUl = () => {
        if (refTeachUl.current.classList.length === 2) {
            refHeadTeachList.current.classList.add('head-of-list-active');
            refHeadTeachList.current.classList.remove('head-of-list-error')
            refTeachUl.current.classList.remove('header-list-hidden');
            refTeachArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refTeachUl.current.classList.length === 1) {
            refHeadTeachList.current.classList.remove('head-of-list-active')
            refTeachUl.current.classList.add('header-list-hidden');
            refTeachArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectTeachList = (e, id) => {
        setError('')
        setTeachId(id)
        refHeadTeachList.current.classList.remove('head-of-list-active')
        refTeachUl.current.classList.add('header-list-hidden');
        refTeachArrow.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            setTeachList(e.target.textContent);

            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            setTeachList(e.target.textContent);

            return;
        }

        setTeachList(e.target.parentElement.textContent);
    }

    const openTypeUl = () => {
        if (refTypeUl.current.classList.length === 2) {
            refHeadTypeList.current.classList.add('head-of-list-active');
            refHeadTypeList.current.classList.remove('head-of-list-error')
            refTypeUl.current.classList.remove('header-list-hidden');
            refTypeArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refTypeUl.current.classList.length === 1) {
            refHeadTypeList.current.classList.remove('head-of-list-active')
            refTypeUl.current.classList.add('header-list-hidden');
            refTypeArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectTypeList = (e) => {
        setError('')
        refHeadTypeList.current.classList.remove('head-of-list-active')
        refTypeUl.current.classList.add('header-list-hidden');
        refTypeArrow.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            setTypeList(e.target.textContent);

            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            setTypeList(e.target.textContent);

            return;
        }

        setTypeList(e.target.parentElement.textContent);
    }

    const sumbit = (e) => {
        e.preventDefault();

        if (name === '') {
            setError('Введите название предмета')

            return
        }

        if (teachList === 'Выберите преподавателя') {
            setError('Введите преподавателя из списка')

            return
        }

        if (typeList === 'Выберите тип предмета') {
            setError('Введите тип предмета из списка')

            return
        }

        const type = Object.entries(SubjectType).filter((item) => {
            if (item[1] === typeList) {
                return item;
            }
        })[0][0];

        dispatch(addSubjects(name, groupId, teachId, type));

        closePopUp(e);

        setName('');
        setTeachList('Выберите преподавателя')
        setTypeList('Выберите тип предмета')
    }

    const changeType = (e) => {
        e.preventDefault();
        const allBtn = document.querySelectorAll('.type-btn');
        const openBtn = Array.from(allBtn).filter((item) => {
            if (item.classList.length === 2) {
                return item
            }
        })

        if (openBtn.length === 1) {
            return;
        }

        e.target.nextElementSibling.classList.remove('open-list-fac-hidden');
        e.target.classList.add('open-list-fac-hidden');
        e.target.previousElementSibling.classList.remove('open-list-fac-hidden');
        e.target.previousElementSibling.previousElementSibling.classList.add('open-list-fac-hidden');
    }

    const openOneTypeUl = (e) => {
        if (e.target.parentElement.nextElementSibling === null) {
            if (e.target.parentElement.parentElement.nextElementSibling.classList.length === 2) {
                e.target.parentElement.parentElement.classList.add('head-of-list-active');
                e.target.parentElement.parentElement.classList.remove('head-of-list-error')
                e.target.parentElement.parentElement.nextElementSibling.classList.remove('header-list-hidden');

                return
            }

            if (e.target.parentElement.parentElement.nextElementSibling.classList.length === 1) {
                e.target.parentElement.parentElement.classList.remove('head-of-list-active')
                e.target.parentElement.parentElement.nextElementSibling.classList.add('header-list-hidden');

                return
            }

            return;
        }

        if (e.target.nextElementSibling === null) {
            if (e.target.parentElement.nextElementSibling.classList.length === 2) {
                e.target.parentElement.classList.add('head-of-list-active');
                e.target.parentElement.classList.remove('head-of-list-error')
                e.target.parentElement.nextElementSibling.classList.remove('header-list-hidden');

                return
            }

            if (e.target.parentElement.nextElementSibling.classList.length === 1) {
                e.target.parentElement.classList.remove('head-of-list-active')
                e.target.parentElement.nextElementSibling.classList.add('header-list-hidden');

                return
            }

            return;
        }

        if (e.target.nextElementSibling.classList.length === 2) {
            e.target.classList.add('head-of-list-active');
            e.target.classList.remove('head-of-list-error')
            e.target.nextElementSibling.classList.remove('header-list-hidden');

            return
        }

        if (e.target.nextElementSibling.classList.length === 1) {
            e.target.classList.remove('head-of-list-active')
            e.target.nextElementSibling.classList.add('header-list-hidden');

            return
        }
    }

    const selectOneTypeList = (e, id) => {
        setSubjId(id)
        if (e.target.classList[0] === 'list-element') {
            e.target.parentElement.previousElementSibling.classList.remove('head-of-list-active')
            e.target.parentElement.classList.add('header-list-hidden');
            setOneTypeList(e.target.textContent);

            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            e.target.parentElement.parentElement.previousElementSibling.classList.remove('head-of-list-active')
            e.target.parentElement.parentElement.classList.add('header-list-hidden');
            setOneTypeList(e.target.textContent);

            return;
        }

        setOneTypeList(e.target.parentElement.textContent);
        e.target.parentElement.parentElement.parentElement.previousElementSibling.classList.remove('head-of-list-active')
        e.target.parentElement.parentElement.parentElement.classList.add('header-list-hidden');
    }

    const saveType = (e) => {
        e.target.classList.add('open-list-fac-hidden');
        e.target.previousElementSibling.classList.remove('open-list-fac-hidden');
        e.target.previousElementSibling.previousElementSibling.classList.add('open-list-fac-hidden');
        e.target.previousElementSibling.previousElementSibling.previousElementSibling.classList.remove('open-list-fac-hidden');

        if (oneTypeList !== '') {
            const type = Object.entries(SubjectType).filter((item) => {
                if (item[1] === oneTypeList) {
                    return item;
                }
            })[0][0];

            dispatch(changeTypeSubjects(subjId, groupId, type))
        }

        setOneTypeList('');
    }

    const changeTimeTable = (e) => {
        if (e.target.textContent === 'Редактировать') {
            e.target.textContent = 'Просмотр'
            setChange(true);

            return
        }

        e.target.textContent = 'Редактировать'
        setChange(false)
    }

    const addStudent = (e) => {
        if (e.target.textContent === 'Добавить студента') {
            refStud.current.classList.remove('open-list-fac-hidden');
            e.target.textContent = 'Отмена'

            return
        }

        if (e.target.textContent === 'Отмена') {
            refStud.current.classList.add('open-list-fac-hidden');
            e.target.textContent = 'Добавить студента'

            return;
        }

        dispatch(addStudents(studName, groupId));

        setStudName('');
        refStud.current.classList.add('open-list-fac-hidden');
        e.target.textContent = 'Добавить студента'
    }

    const keySubmit = (e) => {
        if (e.code === 'Enter' && studName !== '') {
            dispatch(addStudents(studName, groupId));

            setStudName('');
            refStud.current.classList.add('open-list-fac-hidden');
            e.target.textContent = 'Добавить студента'
        }
    }

    const changeStudInput = (value) => {
        setStudName(value);

        if (value !== '') {
            refBtnAddStud.current.textContent = 'Сохранить'

            return
        }

        refBtnAddStud.current.textContent = 'Отмена'
    }

    return (
        loading
        ?
            <Loader/>
        :
        <div className='main-container'>
            {
                !teach &&
                <>
                    {
                        Object.keys(me).length !== 0 &&
                        <>
                            <div className='main-name'>
                                Студенты
                            </div>
                            <div className='students-cont'>
                                {
                                    students.length !== 0 &&
                                    <>
                                        {
                                            students.map((item) => {
                                                return <div className='stud-row'>
                                                    <div className='stud-name'>{item.name}</div>
                                                </div>
                                            })
                                        }
                                    </>
                                }
                                <input onKeyDown={(e) => keySubmit(e)} ref={refStud} placeholder='ФИО студента' type='text' value={studName} className='input-form-stud open-list-fac-hidden' onChange={(e) => changeStudInput(e.target.value)}/>
                                {
                                    me.type === 'ADMIN' &&
                                    <button ref={refBtnAddStud} style={{marginTop: 20, marginBottom: 30, width: '39%'}} onClick={(e) => addStudent(e)} className='btn-subj'>Добавить студента</button>
                                }
                            </div>
                        </>
                    }
                    <div className='main-name'>
                        Предметы
                    </div>
                    <div className='subjects-cont'>
                        {
                            <>
                                {
                                    subject.map((item) => {
                                        return <div className='subj-row'>
                                            {
                                                Object.keys(me).length === 0
                                                    ?
                                                    <div className='subj-name'>{item.name}</div>
                                                    :
                                                    <>
                                                        {
                                                            SubjectType[item.type] === 'Практика' || SubjectType[item.type] === 'К.Р.'
                                                                ?
                                                                <Link to={`/gradekr/${item.id}`} className='subj-name subj-link'>{item.name}</Link>
                                                                :
                                                                <Link to={`/grade/${item.id}`} className='subj-name subj-link'>{item.name}</Link>
                                                        }
                                                    </>

                                            }
                                            <div className='teachname-cont'>
                                                <div className='subj-teach'>{item.teacher.name}</div>
                                                {
                                                    item.addTeacher !== null &&
                                                    <div className='subj-teach'>{item.addTeacher.name}</div>
                                                }

                                            </div>
                                            <div className='subj-type'>{SubjectType[item.type]}</div>
                                            {
                                                me.type === 'ADMIN' &&
                                                <>
                                                    <div ref={refChangeType} style={{width: '11%'}} className="open-list-fac open-list-fac-hidden">
                                                        <div style={{fontSize: 16, padding: 0, alignItems: 'center', justifyContent: 'center', height: '30px', borderRadius: '10px 10px 0 0'}} onClick={openOneTypeUl} className='head-of-list'>
                                                            {oneTypeList}
                                                        </div>
                                                        <ul style={{zIndex: '13', top: '30px'}} className='header-list header-list-hidden'>
                                                            {
                                                                Object.values(SubjectType).slice(1).map((el, index) => {
                                                                    return <SmallListElement select={(e) => selectOneTypeList(e, item.id)} choose={oneTypeList} key={index} name={el}/>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                    <button onClick={changeType} className='type-btn'>Изменить тип</button>
                                                    <button onClick={saveType} className='save-type-btn open-list-fac-hidden'>Сохранить тип</button>
                                                </>
                                            }
                                        </div>
                                    })
                                }
                            </>
                        }
                    </div>
                    {
                        me.type === 'ADMIN' &&
                        <button style={{marginBottom: 30}} onClick={openPopUp} className='btn-subj'>Добавить предмет</button>
                    }
                </>

            }
            <div className='main-name'>
                {
                    schedule[0] !== undefined ?
                    <>
                        {
                            teach ?
                                <>
                                    {
                                        tableId === schedule[0].addTeacherID
                                            ?
                                            <>
                                                Расписание преподавателя {schedule[0].addTeacher.name}
                                            </>
                                            :
                                            <>
                                                Расписание преподавателя {schedule[0].teacher.name}
                                            </>
                                    }

                                </>
                                :
                                <>
                                    Расписание группы {schedule[0].group.number}
                                </>
                        }
                    </>
                        :
                        <>
                            Для такой группы пока нет расписания
                        </>
                }
            </div>
            {
                me.type === 'ADMIN' && !teach &&
                <button onClick={changeTimeTable} className='edit-btn'>Редактировать</button>
            }
            {
                schedule[0] !== undefined &&
                <div className='table-container'>
                    <div className='left-tables'>
                        <div className='table-day'>
                            <div className='on-tbl'>
                                <div className='table-day'>Понедельник</div>

                            </div>
                            <OneTable changeTimeTable={changeTimeTable} groupId={groupId} subj={subject} change={change} day={1} teach={teach} key={1} schedule={day1}/>
                        </div>
                        <div className='table-day'>
                            <div className='on-tbl'>
                                <div className='table-day'>Среда</div>

                            </div>
                            <OneTable changeTimeTable={changeTimeTable} groupId={groupId} subj={subject} change={change} day={3} teach={teach} key={3} schedule={day3}/>
                        </div>
                        <div className='table-day'>
                            <div className='on-tbl'>
                                <div className='table-day'>Пятница</div>

                            </div>
                            <OneTable changeTimeTable={changeTimeTable} groupId={groupId} subj={subject} change={change} day={5} key={5} teach={teach} schedule={day5}/>
                        </div>
                    </div>
                    <div className='right-tables'>
                        <div className='table-day'>
                            <div className='on-tbl'>
                                <div className='table-day'>Вторник</div>

                            </div>
                            <OneTable changeTimeTable={changeTimeTable} groupId={groupId} subj={subject} change={change} day={2} key={2} teach={teach} schedule={day2}/>
                        </div>

                        <div className='table-day'>
                            <div className='on-tbl'>
                                <div className='table-day'>Четверг</div>

                            </div>
                            <OneTable changeTimeTable={changeTimeTable} groupId={groupId} subj={subject} change={change} day={4} key={4} teach={teach} schedule={day4}/>
                        </div>

                        <div className='table-day'>
                            <div className='on-tbl'>
                                <div className='table-day'>Суббота</div>

                            </div>
                            <OneTable changeTimeTable={changeTimeTable} groupId={groupId} subj={subject} change={change} day={6} key={6} teach={teach} schedule={day6}/>
                        </div>
                    </div>
                </div>
            }
            {
                schedule[0] !== undefined ?
                    <>
                        {
                            teach ?
                                <>

                                </>
                                :
                                <>
                                    <div ref={refPopUp} className='popUp-container'>
                                        <div ref={refPopUpBody} className='popUp'>
                                            <svg onClick={closePopUp} className='close-popup' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                                <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                                            </svg>
                                            <form className="menu-form" method="post" action="/" noValidate encType="application/json">
                                                <div className='form-input-cont'>
                                                    <div className='input-text'>Предмет</div>
                                                    <input ref={refName} type='text' value={name} className='input-form' onChange={(e) => changeName(e.target.value)}/>
                                                </div>
                                                <div className='form-input-cont'>
                                                    <div className='input-text'>Преподаватель</div>
                                                    <div style={{width: '100%'}} className="open-list-fac">
                                                        <div ref={refHeadTeachList} onClick={openTeachUl} className='head-of-list'>
                                                            {teachList}
                                                            <svg ref={refTeachArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill="#000000"
                                                                      d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                                            </svg>
                                                        </div>
                                                        <ul style={{zIndex: '13'}} ref={refTeachUl} className='header-list header-list-hidden'>
                                                            {
                                                                teachers.map((item) => {
                                                                    return <ListElement select={(e) => selectTeachList(e, item.id)} choose={teachList} key={item.id} id={item.id} name={item.name}/>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className='form-input-cont'>
                                                    <div className='input-text'>Тип предмета</div>
                                                    <div style={{width: '100%'}} className="open-list-fac">
                                                        <div ref={refHeadTypeList} onClick={openTypeUl} className='head-of-list'>
                                                            {typeList}
                                                            <svg ref={refTypeArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                                                <path fill="#000000"
                                                                      d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                                            </svg>
                                                        </div>
                                                        <ul style={{zIndex: '10'}} ref={refTypeUl} className='header-list header-list-hidden'>
                                                            {
                                                                Object.values(SubjectType).slice(1).map((item, index) => {
                                                                    return <ListElement select={selectTypeList} choose={typeList} key={index} name={item}/>
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className='form-input-cont'>
                                                    <div className='input-text'>Группа</div>
                                                    <input type='text' value={schedule[0].group.number} disabled={true} style={{backgroundColor: 'lightgray', border: 0}} className='input-form'/>
                                                </div>
                                                <div className='error' ref={refError}>{error}</div>
                                                <button onClick={sumbit} className='btn-form'>Создать предмет</button>
                                            </form>
                                        </div>
                                    </div>
                                </>
                        }
                    </>
                    :
                    <>

                    </>
            }
        </div>
    );
};

export default TimeTablePage;