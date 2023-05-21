import React, {FC, useEffect, useRef, useState} from 'react';
import './gradePage.css'
import Loader from "../../components/Loader/Loader";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {isLogin} from "../../store/actions/authActions";
import {useNavigate} from "react-router-dom";
import {
    changeAbsentAction, changeAbsentFalseAction, changeMarkAction, changeName,
    getClasses,
    getOneSubjects,
    getStudents
} from "../../store/actions/scheduleActions";
import {LessonType, SubjectType} from "../../store/reducers/sheduleReducer/types";
import OneRowTable from "../../components/OneRowTable/OneRowTable";
import ChangeName from "../../components/changeName/ChangeName";

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
    const [checkTotal, setCheckTotal] = useState(false);
    const [checkLek, setCheckLek] = useState(false);
    const [checkSem, setCheckSem] = useState(false);
    const [checkLab, setCheckLab] = useState(false);
    const [childnName, setChildnName] = useState([]);
    const [childnMark, setChildnMark] = useState([]);

    const [scroll, setScroll] = useState(0);

    const tableHead = useRef<HTMLDivElement>();
    const absentBtn = useRef<HTMLButtonElement>();
    const markBtn = useRef<HTMLButtonElement>();
    const examBtn = useRef<HTMLButtonElement>();

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
            //dispatch(scheduleActionClassesNull([]));
        }
    }, [me])

    useEffect(() => {
        if (subject.length !== 0) {
            dispatch(getStudents(subject[0].group.id));
        }
    }, [subject])

    useEffect(() => {
        if ((module1.length === 0 && module2.length === 0 && module3.length === 0) || (classes[0].type !== tempClasses[0].type) || (classes.length !== tempClasses.length)) {

            if (classes.length !== 0) {
                setTempClasses(classes);

                setModule1(classes.filter((item) => {
                    if (item.module === 1) {
                        return item
                    }
                }))
                setModule2(classes.filter((item) => {
                    if (item.module === 2) {
                        return item
                    }
                }))
                setModule3(classes.filter((item) => {
                    if (item.module === 3) {
                        return item
                    }
                }))
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
            if (checkLek) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 1 && LessonType[item.type] === 'лек') {
                        return item
                    }
                }));
                setModule1(classes.filter((item) => {
                    if (LessonType[item.type] === 'лек' && item.module === 1) {
                        return item
                    }
                }))

                setModule2([])
                setModule3([])

                return;
            }

            if (checkLab) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 1 && LessonType[item.type] === 'лаб') {
                        return item
                    }
                }));
                setModule1(classes.filter((item) => {
                    if (LessonType[item.type] === 'лаб' && item.module === 1) {
                        return item
                    }
                }))

                setModule2([])
                setModule3([])

                return;
            }

            if (checkSem) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 1 && LessonType[item.type] === 'сем') {
                        return item
                    }
                }));
                setModule1(classes.filter((item) => {
                    if (LessonType[item.type] === 'сем' && item.module === 1) {
                        return item
                    }
                }))

                setModule2([])
                setModule3([])

                return;
            }

            setTempClasses(classes.filter((item) => {
                if (item.module === 1) {
                    return item
                }
            }));
            setModule1(classes.filter((item) => {
                if (item.module === 1) {
                    return item
                }
            }))
            setModule2([])
            setModule3([])

            return
        }
        if (checkSecond) {
            if (checkLab) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 2 && LessonType[item.type] === 'лаб') {
                        return item
                    }
                }));
                setModule2(classes.filter((item) => {
                    if (LessonType[item.type] === 'лаб' && item.module === 2) {
                        return item
                    }
                }))

                setModule1([])
                setModule3([])

                return;
            }

            if (checkLek) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 2 && LessonType[item.type] === 'лек') {
                        return item
                    }
                }));
                setModule2(classes.filter((item) => {
                    if (LessonType[item.type] === 'лек' && item.module === 2) {
                        return item
                    }
                }))

                setModule1([])
                setModule3([])

                return;
            }

            if (checkSem) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 2 && LessonType[item.type] === 'сем') {
                        return item
                    }
                }));
                setModule2(classes.filter((item) => {
                    if (LessonType[item.type] === 'сем' && item.module === 2) {
                        return item
                    }
                }))

                setModule1([])
                setModule3([])

                return;
            }

            setTempClasses(classes.filter((item) => {
                if (item.module === 2) {
                    return item
                }
            }))
            setModule2(classes.filter((item) => {
                if (item.module === 2) {
                    return item
                }
            }))
            setModule1([])
            setModule3([])

            return;
        }
        if (checkThird) {
            if (checkLab) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 3 && LessonType[item.type] === 'лаб') {
                        return item
                    }
                }));
                setModule3(classes.filter((item) => {
                    if (LessonType[item.type] === 'лаб' && item.module === 3) {
                        return item
                    }
                }))

                setModule2([])
                setModule1([])

                return;
            }

            if (checkLek) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 3 && LessonType[item.type] === 'лек') {
                        return item
                    }
                }));
                setModule3(classes.filter((item) => {
                    if (LessonType[item.type] === 'лек' && item.module === 3) {
                        return item
                    }
                }))

                setModule2([])
                setModule1([])

                return;
            }

            if (checkSem) {
                setTempClasses(classes.filter((item) => {
                    if (item.module === 3 && LessonType[item.type] === 'сем') {
                        return item
                    }
                }));
                setModule3(classes.filter((item) => {
                    if (LessonType[item.type] === 'сем' && item.module === 3) {
                        return item
                    }
                }))

                setModule2([])
                setModule1([])

                return;
            }

            setTempClasses(classes.filter((item) => {
                if (item.module === 3) {
                    return item
                }
            }))
            setModule3(classes.filter((item) => {
                if (item.module === 3) {
                    return item
                }
            }))
            setModule2([])
            setModule1([])

            return;
        }

        if (checkTotal) {
            setTempClasses([])
            setModule2([])
            setModule1([])
            setModule3([])

            return;
        }

        if (checkLab) {
            setTempClasses(classes.filter((item) => {
                if (LessonType[item.type] === 'лаб') {
                    return item
                }
            }))
            setModule2(classes.filter((item) => {
                if (LessonType[item.type] === 'лаб' && item.module === 2) {
                    return item
                }
            }))
            setModule3(classes.filter((item) => {
                if (LessonType[item.type] === 'лаб' && item.module === 3) {
                    return item
                }
            }))
            setModule1(classes.filter((item) => {
                if (LessonType[item.type] === 'лаб' && item.module === 1) {
                    return item
                }
            }))

            return;
        }
        if (checkLek) {
            setTempClasses(classes.filter((item) => {
                if (LessonType[item.type] === 'лек') {
                    return item
                }
            }))
            setModule2(classes.filter((item) => {
                if (LessonType[item.type] === 'лек' && item.module === 2) {
                    return item
                }
            }))
            setModule3(classes.filter((item) => {
                if (LessonType[item.type] === 'лек' && item.module === 3) {
                    return item
                }
            }))
            setModule1(classes.filter((item) => {
                if (LessonType[item.type] === 'лек' && item.module === 1) {
                    return item
                }
            }))

            return;
        }
        if (checkSem) {
            setTempClasses(classes.filter((item) => {
                if (LessonType[item.type] === 'сем') {
                    return item
                }
            }))
            setModule2(classes.filter((item) => {
                if (LessonType[item.type] === 'сем' && item.module === 2) {
                    return item
                }
            }))
            setModule3(classes.filter((item) => {
                if (LessonType[item.type] === 'сем' && item.module === 3) {
                    return item
                }
            }))
            setModule1(classes.filter((item) => {
                if (LessonType[item.type] === 'сем' && item.module === 1) {
                    return item
                }
            }))

            return;
        }
    }, [checkThird, checkFirst, checkSecond, checkTotal, checkSem, checkLek, checkLab])

    const changeAbsent = (e) => {
        if (e.target.textContent === 'Режим проставления пропусков' && !mark) {
            markBtn.current.classList.add('check-btn');
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
        markBtn.current.classList.remove('check-btn');
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

    const changeChild = (name) => {
        setChildnName(prevState => [...prevState, name]);
    }

    const changeChildMark = (mark) => {
        setChildnMark(prevState => [...prevState, mark]);
    }

    const changeMark = (e) => {
        if (e.target.textContent === 'Режим редактирования' && !absent) {
            setMark(true);
            absentBtn.current.classList.add('check-btn');
            e.target.textContent = 'Выйти из режима';

            return
        }

        if (childnName.length !== 0) {
            childnName.forEach((item) => {
                dispatch(changeName(item.id, item.value, subId))
            })
            setModule2([])
            setModule1([])
            setModule3([])
        }
        if (childnMark.length !== 0) {
            childnMark.forEach((item) => {
                dispatch(changeMarkAction(item.id, Number(item.value), subId))
            })

        }

        absentBtn.current.classList.remove('check-btn');
        setMark(false);
        e.target.textContent = 'Режим редактирования';
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
        if (checkThird || checkSecond || checkTotal || exam || absent || mark) {
            return
        }

        setCheckFirst(e.target.checked);
    }

    const changeSecondCheck = (e) => {
        if (checkFirst || checkThird || checkTotal || exam || absent || mark) {
            return
        }

        setCheckSecond(e.target.checked);
    }

    const changeThirdCheck = (e) => {
        if (checkFirst || checkSecond || checkTotal || exam || absent || mark) {
            return
        }

        setCheckThird(e.target.checked);
    }

    const changeTotalCheck = (e) => {
        if (checkFirst || checkThird || checkLek || checkSem || checkLab || checkSecond || exam || absent || mark) {
            return
        }

        setCheckTotal(e.target.checked);
    }

    const changeLekCheck = (e) => {
        if (checkTotal || checkSem || checkLab ||exam || absent || mark) {
            return
        }

        setCheckLek(e.target.checked);
    }

    const changeSemCheck = (e) => {
        if (checkTotal || checkLek || checkLab || exam || absent || mark) {
            return
        }

        setCheckSem(e.target.checked);
    }

    const changeLabCheck = (e) => {
        if (checkTotal || checkLek || checkSem || exam || absent || mark) {
            return
        }

        setCheckLab(e.target.checked);
    }

    const scrollDiv = (e) => {
        setScroll(e.target.scrollLeft)
    }


    console.log('temp', tempClasses)
    console.log('classes', classes)

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
                        <div className='teachname-cont'>
                            <div className='subj-teach'>{subject[0].teacher.name}</div>
                            {
                                subject[0].addTeacher !== null &&
                                <div className='subj-teach'>{subject[0].addTeacher.name}</div>
                            }

                        </div>
                        <div style={{paddingLeft: 10, width: '15%'}} className='subj-group'>{subject[0].group.number}</div>
                        <div className='subj-type'>{SubjectType[subject[0].type]}</div>
                    </div>
                }
                {
                    ((Object.keys(me).length !== 0 && subject.length !== 0) && ((me.type !== 'STUDENT' && (subject[0].teacher.id === me.owner_id.toString() || (subject[0].addTeacher !== null && subject[0].addTeacher.id === me.owner_id.toString()))) || me.type === 'ADMIN')) &&
                    <>
                        {
                            checkFirst || checkThird || checkSecond || checkTotal || checkLek || checkSem || checkLab
                            ?
                                <div className='btn-grade-cont'>
                                    <button style={{width: '30%'}} className='btn-subj check-btn'>Режим проставления пропусков</button>
                                    {
                                        mark
                                            ?
                                            <button style={{width: '30%'}} className='btn-subj check-btn'>Выйти из режима</button>
                                            :
                                            <button style={{width: '30%'}} className='btn-subj check-btn'>Режим редактирования</button>
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
                                    <button ref={absentBtn} onClick={(e) => changeAbsent(e)} style={{width: '30%'}} className='btn-subj'>Режим проставления пропусков</button>
                                    {
                                        mark
                                            ?
                                            <button onClick={(e) => changeMark(e)} style={{width: '30%'}} className='btn-subj'>Выйти из режима</button>
                                            :
                                            <button ref={markBtn} onClick={(e) => changeMark(e)} style={{width: '30%'}} className='btn-subj'>Режим редактирования</button>
                                    }
                                    {
                                        subject.length !== 0 && SubjectType[subject[0].type] === 'Экзамен' &&
                                        <>
                                            {
                                                exam
                                                    ?
                                                    <button onClick={(e) => changeExam(e)} style={{width: '30%'}} className='btn-subj'>Выйти из режима экзамена</button>
                                                    :
                                                    <button ref={examBtn} onClick={(e) => changeExam(e)} style={{width: '30%'}} className='btn-subj'>Режим проставления экзамена</button>
                                            }
                                        </>
                                    }
                                </div>
                        }
                    </>

                }
                <div className='filter-cont'>
                    <div style={{fontWeight: "bold", width: '210px'}} className='subj-group'>Фильтр по модулям:</div>
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
                    <label style={{marginLeft: 50}} className="checkbox style-e">
                        <input onChange={(e) => changeTotalCheck(e)} checked={checkTotal} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только итог</div>
                    </label>
                </div>
                <div className='filter-cont-two'>
                    <div style={{fontWeight: "bold", width: '210px'}} className='subj-group'>Фильтр по типам пар:</div>
                    <label className="checkbox style-e">
                        <input onChange={(e) => changeLekCheck(e)} checked={checkLek} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только лекции</div>
                    </label>
                    <label style={{marginLeft: 60}} className="checkbox style-e">
                        <input onChange={(e) => changeSemCheck(e)} checked={checkSem} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только семинар</div>
                    </label>
                    <label style={{marginLeft: 60}} className="checkbox style-e">
                        <input onChange={(e) => changeLabCheck(e)} checked={checkLab} type="checkbox"/>
                        <div className="checkbox__checkmark"></div>
                        <div style={{marginLeft: 15, marginRight: 0}} className="checkbox__body">Только лабораторные</div>
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
                                <div className='tables'>
                                    <table className='grade-table-cont'>
                                        <tbody>
                                        {
                                            mark
                                                ?
                                                <tr style={{height: 78}} className='grade-table-row'>
                                                    <td className='grade-table-column-fio'>ФИО</td>
                                                </tr>
                                                :
                                                <tr className='grade-table-row'>
                                                    <td className='grade-table-column-fio'>ФИО</td>
                                                </tr>
                                        }
                                        {
                                            students.map((item) => {
                                                return  <tr className='grade-table-row'>
                                                    <td className='grade-table-column-fio'>{item.name}</td>
                                                </tr>
                                            })

                                        }
                                        </tbody>
                                    </table>
                                    <div ref={tableHead} onScroll={(e) => scrollDiv(e)} className='scroll-table'>
                                        <table style={{width: `${tempClasses.length * 100 + 150 + 600}px`}} className='grade-table-cont'>
                                            <tbody>
                                            <tr className='grade-table-row'>
                                                {
                                                    module1.length !== 0 &&
                                                    <>
                                                        {
                                                            module1.map((item) => {
                                                                return <>
                                                                    {
                                                                        mark
                                                                            ?
                                                                            <ChangeName type={LessonType[item.type]} key={item.id}  date={item.day} changeChild={changeChild} item={item}/>
                                                                            :
                                                                            <td className='grade-table-column-type'>{LessonType[item.type]}<p></p><span className='name-class'>{item.name}</span><p></p>{item.day}</td>
                                                                    }
                                                                </>
                                                            })
                                                        }
                                                    </>
                                                }
                                                <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Модуль 1</td>
                                                {
                                                    module2.length !== 0 &&
                                                    <>
                                                        {
                                                            module2.map((item) => {
                                                                return <>
                                                                    {
                                                                        mark
                                                                            ?
                                                                            <ChangeName type={LessonType[item.type]} key={item.id}  date={item.day} changeChild={changeChild} item={item}/>
                                                                            :
                                                                            <td className='grade-table-column-type'>{LessonType[item.type]}<p></p><span className='name-class'>{item.name}</span><p></p>{item.day}</td>
                                                                    }
                                                                </>
                                                            })
                                                        }
                                                    </>
                                                }
                                                <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Модуль 2</td>
                                                {
                                                    module3.length !== 0 &&
                                                    <>
                                                        {
                                                            module3.map((item) => {
                                                                return <>
                                                                    {
                                                                        mark
                                                                            ?
                                                                            <ChangeName type={LessonType[item.type]} key={item.id} date={item.day} changeChild={changeChild} item={item}/>
                                                                            :
                                                                            <td className='grade-table-column-type'>{LessonType[item.type]}<p></p><span className='name-class'>{item.name}</span><p></p>{item.day}</td>
                                                                    }
                                                                </>
                                                            })
                                                        }
                                                    </>
                                                }
                                                <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Модуль 3</td>
                                                {
                                                    subject.length !== 0 && SubjectType[subject[0].type] === 'Экзамен' &&
                                                    <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Экзамен</td>
                                                }
                                                <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Результат</td>
                                                <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Итог</td>
                                                <td style={{fontWeight: 'bold', backgroundColor: '#6aa1f1'}} className='grade-table-column-type'>Кол-во пропусков</td>
                                            </tr>
                                            {
                                                <>
                                                    {
                                                        students.map((item, index) => {
                                                            return <OneRowTable exam={exam}
                                                                                key={item.id}
                                                                                mark={mark}
                                                                                changeChildMark={changeChildMark}
                                                                                checkLek={checkLek}
                                                                                checkSem={checkSem}
                                                                                checkAllAbsent={checkAllAbsent}
                                                                                absent={absent}
                                                                                checkLab={checkLab}
                                                                                name={item.name}
                                                                                classes={classes}
                                                                                subId={subId}
                                                                                checkFirst={checkFirst}
                                                                                checkSecond={checkSecond}
                                                                                checkThird={checkThird}
                                                                                checkTotal={checkTotal}
                                                                                studId={item.id}/>
                                                        })
                                                    }
                                                </>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                        }
                    </>
                }
            </div>
    );
};

export default GradePage;