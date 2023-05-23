import React, {FC, useEffect, useState} from 'react';
import './gradeKRPage.css'
import Loader from "../../components/Loader/Loader";
import {SubjectType} from "../../store/reducers/sheduleReducer/types";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";
import {isLogin} from "../../store/actions/authActions";
import {
    changeProgressAction,
    changeTotal,
    getExel,
    getOneSubjects, getStudents
} from "../../store/actions/scheduleActions";
import {scheduleActionClassesNull} from "../../store/reducers/sheduleReducer/sheduleReducer";
import OneRowKR from "../OneRowKR/OneRowKR";
import OneRowUnderKr from "../../components/OneRowUnderKr/OneRowUnderKr";

const GradeKrPage: FC = () => {
    const {loading, subject, students} = useAppSelector(state => state.schedule);
    const {me} = useAppSelector(state => state.auth);
    const nav = useNavigate();
    const dispatch = useAppDispatch();

    const [subId, setSubId] = useState('');
    const [progress, setProgress] = useState(false);
    const [childMark, setChildMark] = useState([])
    const [childBool, setChildBool] = useState([])
    const [res, setRes] = useState([])

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Успеваемость';
        const id = window.location.pathname.slice(9);
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

        return () => {
            dispatch(scheduleActionClassesNull([]));
        }
    }, [me])

    useEffect(() => {
        if (subject.length !== 0) {
            dispatch(getStudents(subject[0].group.id));
        }
    }, [subject])

    const changeProgress = (e) => {
        if (e.target.textContent === 'Режим проставления прогресса') {
            setProgress(true);
            e.target.textContent = 'Сохранить изменения';

            return
        }

        if (res.length !== 0) {
            res.forEach((item) => {
                dispatch(changeProgressAction(item.id, item.module, item.mark, subId))
            })
        }

        setProgress(false);
        e.target.textContent = 'Режим проставления прогресса';
    }

    const changeChild = (mark) => {
        setChildMark(prevState => [...prevState, mark])
    }

    const changeChildBool = (bool) => {
        setChildBool(prevState => [...prevState, bool])
    }

    const download = () => {
        dispatch(getExel(subId));
    }

    const changeMarkChild = (obj) => {
        setRes(prevState => [...prevState, obj])
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
                        <div style={{justifyContent: 'center'}} className='btn-grade-cont'>
                            {
                                progress
                                    ?
                                    <button onClick={(e) => changeProgress(e)} style={{width: '30%'}} className='btn-subj'>Сохранить изменения</button>
                                    :
                                    <button onClick={(e) => changeProgress(e)} style={{width: '30%'}} className='btn-subj'>Режим проставления прогресса</button>
                            }

                        </div>
                }
                {
                    students !== null &&
                    <>
                        {
                            students.length === 0
                                ?
                                <div style={{marginTop: 20}} className='main-name'>Студенты отсуствуют у данной группы</div>
                                :
                                <table style={{width: 950}} className='grade-table-cont'>
                                    <tbody>
                                    <tr className='grade-table-row'>
                                        <td style={{width: 150}} className='grade-table-column-fio'>ФИО</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 1</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 2</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 3</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 4</td>
                                    </tr>
                                    {
                                        students.map((item) => {
                                            return <OneRowKR changeChildBool={changeChildBool} changeChild={changeChild} edit={false} key={item.id} name={item.name} studId={item.id} subId={subId}/>
                                        })
                                    }
                                    </tbody>
                                </table>
                        }
                        {
                            students.length !== 0 &&
                                <table style={{width: 950}} className='grade-table-cont'>
                                    <tbody>
                                    <tr className='grade-table-row'>
                                        <td style={{width: 150}} className='grade-table-column-fio'>ФИО</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 1</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 2</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 3</td>
                                        <td style={{fontWeight: 'bold', width: 200}} className='grade-table-column-type'>Модуль 4</td>
                                        <td style={{fontWeight: 'bold', width: 200, backgroundColor: '#597EA7'}} className='grade-table-column-type'>Итого</td>
                                    </tr>
                                    {
                                        students.map((item) => {
                                            return <OneRowUnderKr changeMarkChild={changeMarkChild} edit={progress} studId={item.id} name={item.name}/>
                                        })
                                    }
                                    </tbody>
                                </table>
                        }
                    </>
                }
                <button style={{marginTop: 30}} onClick={download} className='btn-subj'>Скачать Excel</button>
            </div>
    );
};

export default GradeKrPage;