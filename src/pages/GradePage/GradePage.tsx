import React, {FC, useEffect, useRef, useState} from 'react';
import './gradePage.css'
import Loader from "../../components/Loader/Loader";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {isLogin} from "../../store/actions/authActions";
import {useNavigate} from "react-router-dom";
import {
    changeAbsentAction, changeAbsentFalseAction,
    getClasses,
    getOneSubjects,
    getStudents
} from "../../store/actions/scheduleActions";
import {LessonType, SubjectType} from "../../store/reducers/sheduleReducer/types";
import OneRowTable from "../../components/OneRowTable/OneRowTable";
import {scheduleActionClassesNull} from "../../store/reducers/sheduleReducer/sheduleReducer";

const GradePage: FC = () => {
    const {loading, classes, subject, students} = useAppSelector(state => state.schedule)
    const {me} = useAppSelector(state => state.auth)
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const [module1, setModule1] = useState([]);
    const [module2, setModule2] = useState([]);
    const [module3, setModule3] = useState([]);

    const [subId, setSubId] = useState('');
    const [absent, setAbsent] = useState(false);
    const [mark, setMark] = useState(false);
    const [exam, setExam] = useState(false);
    const [checkAll, setCheckAll] = useState([]);
    const [tempClasses, setTempClasses] = useState([]);
    const [checkFirst, setCheckFirst] = useState(false);
    const [checkSecond, setCheckSecond] = useState(false);
    const [checkThird, setCheckThird] = useState(false);

    const [scroll, setScroll] = useState(0);

    const tableHead = useRef<HTMLDivElement>();

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Успеваемость';
        const id = window.location.pathname.slice(7);
        setSubId(id)

        if (Object.keys(me).length === 0) {
            dispatch(isLogin()).then(res => {
                if (!res) {
                    nav('/')

                    return;
                }
            });
        }

        dispatch(getOneSubjects(id));
        dispatch(getClasses(id));

        return () => {
            dispatch(scheduleActionClassesNull([]));
        }
    }, [me])

    useEffect(() => {
        if (subject.length !== 0) {
            dispatch(getStudents(subject[0].group.id));
        }
    }, [subject])

    useEffect(() => {
        if ((module1.length === 0 && module2.length === 0 && module3.length === 0)) {
            if (classes.length !== 0) {
                setTempClasses(classes);
                classes.forEach((item) => {
                    if (item.module === 1) {
                        setModule1(prevState => [...prevState, item])
                    }
                    if (item.module === 2) {
                        setModule2(prevState => [...prevState, item])
                    }
                    if (item.module === 3) {
                        setModule3(prevState => [...prevState, item])
                    }
                })
            }
        }

        if (scroll !== 0) {
            tableHead.current.scrollLeft = scroll;
        }
    }, [classes]);

    useEffect(() => {
        if (!checkThird && !checkFirst && !checkSecond) {
            setModule2([])
            setModule1([])
            setModule3([])
            setTempClasses(classes);
            classes.forEach((item) => {
                if (item.module === 1) {
                    setModule1(prevState => [...prevState, item])
                }
                if (item.module === 2) {
                    setModule2(prevState => [...prevState, item])
                }
                if (item.module === 3) {
                    setModule3(prevState => [...prevState, item])
                }
            })
        }

        if (checkFirst) {
            setTempClasses(classes.filter((item) => {
                if (item.module === 1) {
                    return item
                }
            }));
            setModule2([])
            setModule3([])

            return
        }
        if (checkSecond) {
            setTempClasses(classes.filter((item) => {
                if (item.module === 2) {
                    return item
                }
            }))
            setModule1([])
            setModule3([])

            return;
        }
        if (checkThird) {
            setTempClasses(classes.filter((item) => {
                if (item.module === 3) {
                    return item
                }
            }))
            setModule2([])
            setModule1([])

            return;
        }
    }, [checkThird, checkFirst, checkSecond])

    const changeAbsent = (e) => {
        if (e.target.textContent === 'Режим проставления пропусков' && !mark) {
            setAbsent(true);
            e.target.textContent = 'Сохранить изменения';

            return
        }

        if (checkAll.length !== 0) {
            const allTrue = checkAll.filter((item) => {
                if (item.value === true) {
                    return item;
                }
            }).map((item) => {
                return item.id
            });
            dispatch(changeAbsentAction(allTrue, subId));

            const allFalse = checkAll.filter((item) => {
                if (item.value === false) {
                    return item;
                }
            }).map((item) => {
                return item.id
            });

            if (allFalse.length !== 0) {
                dispatch(changeAbsentFalseAction(allFalse, subId));
            }
        }

        setAbsent(false);
        e.target.textContent = 'Режим проставления пропусков';
        setCheckAll([]);
    }

    const checkAllAbsent = (id, double) => {
        if (double) {
            setCheckAll(prevState => prevState.filter((item) => {
                if (item.id !== id) {
                    return item
                }
            }))
        } else {
            setCheckAll(prevState => [...prevState, id]);
        }
    }

    const changeMark = (e) => {
        if (e.target.textContent === 'Режим проставления оценок' && !absent) {
            setMark(true);
            e.target.textContent = 'Выйти из режима';

            return
        }

        setMark(false);
        e.target.textContent = 'Режим проставления оценок';
    }

    const changeExam = (e) => {
        if (e.target.textContent === 'Режим проставления экзамена') {
            setExam(true);
            e.target.textContent = 'Выйти из режима экзамена';

            return
        }

        setExam(false);
        e.target.textContent = 'Режим проставления экзамена';
    }

    const changeFirstCheck = (e) => {
        if (checkThird || checkSecond) {
            return
        }

        setCheckFirst(e.target.checked);
    }

    const changeSecondCheck = (e) => {
        if (checkFirst || checkThird) {
            return
        }

        setCheckSecond(e.target.checked);
    }

    const changeThirdCheck = (e) => {
        if (checkFirst || checkSecond) {
            return
        }

        setCheckThird(e.target.checked);
    }

    const scrollDiv = (e) => {
        setScroll(e.target.scrollLeft)
    }

    return (
        loading
            ?
            <Loader/>
            :
            <div className='main-container'>
                <div className='main-name'>
                    Успеваемость
                </div>
                {
                    subject.length !== 0 &&
                    <div style={{marginTop: 20, width: '70%'}} className='subj-row'>
                        <div className='subj-name'>{subject[0].name}</div>
                        <div className='subj-teach'>{subject[0].teacher.name}</div>
                        <div style={{paddingLeft: 10, width: '15%'}} className='subj-group'>{subject[0].group.number}</div>
                        <div className='subj-type'>{SubjectType[subject[0].type]}</div>
                    </div>
                }
                {
                    Object.keys(me).length !== 0 && me.type !== 'STUDENT' &&
                    <>
                        {
                            checkFirst || checkThird || checkSecond
                            ?
                                <div className='btn-grade-cont'>
                                    <button style={{width: '30%'}} className='btn-subj check-btn'>Режим проставления пропусков</button>
                                    {
                                        mark
                                            ?
                                            <button style={{width: '30%'}} className='btn-subj check-btn'>Выйти из режима</button>
                                            :
                                            <button style={{width: '30%'}} className='btn-subj check-btn'>Режим проставления оценок</button>
                                    }
                                    {
                                        subject.length !== 0 && SubjectType[subject[0].type] === 'Экзамен' &&
                                        <>
                                            {
                                                exam
                                                    ?
                                                    <button style={{width: '30%'}} className='btn-subj check-btn'>Выйти из режима экзамена</button>
                                                    :
                                                    <button style={{width: '30%'}} className='btn-subj check-btn'>Режим проставления экзамена</button>
                                            }
                                        </>
                                    }
                                </div>
                            :
                                <div className='btn-grade-cont'>
                                    <button onClick={(e) => changeAbsent(e)} style={{width: '30%'}} className='btn-subj'>Режим проставления пропусков</button>
                                    {
                                        mark
                                            ?
                                            <button onClick={(e) => changeMark(e)} style={{width: '30%'}} className='btn-subj'>Выйти из режима</button>
                                            :
                                            <button onClick={(e) => changeMark(e)} style={{width: '30%'}} className='btn-subj'>Режим проставления оценок</button>
                                    }
                                    {
                                        subject.length !== 0 && SubjectType[subject[0].type] === 'Экзамен' &&
                                        <>
                                            {
                                                exam
                                                    ?
                                                    <button onClick={(e) => changeExam(e)} style={{width: '30%'}} className='btn-subj'>Выйти из режима экзамена</button>
                                                    :
                                                    <button onClick={(e) => changeExam(e)} style={{width: '30%'}} className='btn-subj'>Режим проставления экзамена</button>
                                            }
                                        </>
                                    }
                                </div>
                        }
                    </>

                }
                <div className='filter-cont'>
                    <div style={{fontWeight: "bold", width: '16%'}} className='subj-group'>Фильтр по модулям:</div>
                    <label className="checkbox style-e">
                        <input onChange={(e) => changeFirstCheck(e)} checked={checkFirst} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только 1 модуль</div>
                    </label>
                    <label style={{marginLeft: 50}} className="checkbox style-e">
                        <input onChange={(e) => changeSecondCheck(e)} checked={checkSecond} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только 2 модуль</div>
                    </label>
                    <label style={{marginLeft: 50}} className="checkbox style-e">
                        <input onChange={(e) => changeThirdCheck(e)} checked={checkThird} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только 3 модуль</div>
                    </label>
                </div>
                {
                    students !== null &&
                    <>
                        {
                            students.length === 0
                                ?
                                <div style={{marginTop: 20}} className='main-name'>Студенты отсуствуют у данной группы</div>
                                :
                                <div ref={tableHead} onScroll={(e) => scrollDiv(e)} className='scroll-table'>
                                    <table style={{width: `${tempClasses.length * 100 + 150 + 600}px`}} className='grade-table-cont'>
                                        <tbody>
                                        <tr className='grade-table-row'>
                                            <td className='grade-table-column-fio'>ФИО</td>
                                            {
                                                module1.length !== 0 &&
                                                <>
                                                    {
                                                        module1.map((item) => {
                                                            return <td className='grade-table-column-type'>{LessonType[item.type]}<p></p> {item.name}<p></p> {item.day}</td>
                                                        })
                                                    }
                                                </>
                                            }
                                            <td style={{fontWeight: 'bold'}} className='grade-table-column-type'>Модуль 1</td>
                                            {
                                                module2.length !== 0 &&
                                                <>
                                                    {
                                                        module2.map((item) => {
                                                            return <td className='grade-table-column-type'>{LessonType[item.type]}<p></p> {item.name}<p></p> {item.day}</td>
                                                        })
                                                    }
                                                </>
                                            }
                                            <td style={{fontWeight: 'bold'}} className='grade-table-column-type'>Модуль 2</td>
                                            {
                                                module3.length !== 0 &&
                                                <>
                                                    {
                                                        module3.map((item) => {
                                                            return <td className='grade-table-column-type'>{LessonType[item.type]}<p></p> {item.name}<p></p> {item.day}</td>
                                                        })
                                                    }
                                                </>
                                            }
                                            <td style={{fontWeight: 'bold'}} className='grade-table-column-type'>Модуль 3</td>
                                            {
                                                subject.length !== 0 && SubjectType[subject[0].type] === 'Экзамен' &&
                                                <td style={{fontWeight: 'bold'}} className='grade-table-column-type'>Экзамен</td>
                                            }
                                            <td style={{fontWeight: 'bold'}} className='grade-table-column-type'>Результат</td>
                                            <td style={{fontWeight: 'bold'}} className='grade-table-column-type'>Итог</td>
                                        </tr>
                                        {
                                            <>
                                                {
                                                    students.map((item, index) => {
                                                        return <OneRowTable exam={exam}
                                                                            key={item.id}
                                                                            mark={mark}
                                                                            checkAllAbsent={checkAllAbsent}
                                                                            absent={absent}
                                                                            name={item.name}
                                                                            classes={classes}
                                                                            subId={subId}
                                                                            checkFirst={checkFirst}
                                                                            checkSecond={checkSecond}
                                                                            checkThird={checkThird}
                                                                            studId={item.id}/>
                                                    })
                                                }
                                            </>
                                        }
                                        </tbody>
                                    </table>
                                </div>
                        }
                    </>
                }
            </div>
    );
};

export default GradePage;