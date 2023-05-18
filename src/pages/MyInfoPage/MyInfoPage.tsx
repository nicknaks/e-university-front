import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {isLogin} from "../../store/actions/authActions";
import {Link, useNavigate} from "react-router-dom";
import {getMySchedule, getSubjects, getSubjectsResult} from "../../store/actions/scheduleActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import './myInfoPage.css'
import OneTable from "../../components/OneTable/OneTable";
import {
    scheduleActionScheduleNull,
    scheduleActionSubjectResultNull
} from "../../store/reducers/sheduleReducer/sheduleReducer";
import Loader from "../../components/Loader/Loader";
import {LessonType, SubjectType} from "../../store/reducers/sheduleReducer/types";

const MyInfoPage: FC = () => {
    const dispatch = useAppDispatch();

    const {me} = useAppSelector(state => state.auth)
    const {subject, subjectResults, schedule, loading} = useAppSelector(state => state.schedule);

    const [teach, setTeach] = useState(false);
    const nav = useNavigate();

    const [day1, setDay1] = useState([])
    const [day2, setDay2] = useState([])
    const [day3, setDay3] = useState([])
    const [day4, setDay4] = useState([])
    const [day5, setDay5] = useState([])
    const [day6, setDay6] = useState([]);

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Профиль'

        if (Object.keys(me).length === 0) {
            dispatch(isLogin()).then(res => {
                if (!res) {
                    nav('/')

                    return;
                }
            });
        }

        if (me.type === 'ADMIN') {
            nav('/')

            return 
        }

        if (me.type === 'TEACHER') {
            setTeach(true);
            dispatch(getSubjects(me.owner_id))
        } else {
            dispatch(getSubjectsResult(me.owner_id))
        }

            dispatch(getMySchedule())

        return () => {
            dispatch(scheduleActionSubjectResultNull([]))
            dispatch(scheduleActionScheduleNull([]));
        }
    }, [me])

    useEffect(() => {
        if (schedule) {
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
        }
    }, [schedule])

    return (
        loading
        ?
            <Loader/>
        :
        <div className='main-container'>
            <div className='main-name'>
                Предметы
            </div>
            <div className='subjects-cont'>
                {
                    me.type === 'TEACHER'
                        ?
                        <>
                            {
                                subject.map((item) => {
                                    return <div className='subj-row'>
                                        <div className='subj-name'>{item.name}</div>
                                        <div className='subj-group'>{item.group.number}</div>
                                        <div className='subj-type'>{SubjectType[item.type]}</div>
                                    </div>
                                })
                            }
                        </>
                        :
                        <>

                            {
                                subjectResults.map((item) => {
                                    return <div className='subj-row'>
                                        {
                                            SubjectType[item.subject[0].type] === 'К.Р.' || SubjectType[item.subject[0].type] === 'Практика'
                                                ?
                                                <Link to={`/gradekr/${item.subject[0].id}`} className='subj-name subj-link'>{item.subject[0].name}</Link>
                                                :
                                                <Link to={`/grade/${item.subject[0].id}`} className='subj-name subj-link'>{item.subject[0].name}</Link>
                                        }
                                        <div className='teachname-cont'>
                                            <div className='subj-teach'>{item.subject[0].teacher.name}</div>
                                            {
                                                item.subject[0].addTeacher !== null &&
                                                <div className='subj-teach'>{item.subject[0].addTeacher.name}</div>
                                            }

                                        </div>
                                        <div className='subj-type'>{SubjectType[item.subject[0].type]}</div>
                                        {
                                            item.mark < 60 && (item.firstModuleMark < 18 || item.secondModuleMark < 18 || item.thirdModuleMark < 18) &&
                                            <>
                                                {
                                                    SubjectType[item.subject[0].type] === 'Зачет'
                                                        ?
                                                            <div style={{color: 'red'}} className='subj-group'>Незачет</div>
                                                        :
                                                            <div style={{color: 'red'}} className='subj-group'>2</div>
                                                }
                                            </>
                                        }
                                        {
                                            (item.mark >= 60 && item.mark <= 70) && (item.firstModuleMark >= 18 && item.secondModuleMark >= 18 && item.thirdModuleMark >= 18) &&
                                            <>
                                                {
                                                    SubjectType[item.subject[0].type] === 'Зачет'
                                                        ?
                                                        <div style={{color: '#388E3C'}} className='subj-group'>Зачет</div>
                                                        :
                                                        <div style={{color: '#FFB74D'}} className='subj-group'>3</div>
                                                }
                                            </>
                                        }
                                        {
                                            (item.mark >= 71 && item.mark <= 84) && (item.firstModuleMark >= 18 && item.secondModuleMark >= 18 && item.thirdModuleMark >= 18) &&
                                            <>
                                                {
                                                    SubjectType[item.subject[0].type] === 'Зачет'
                                                        ?
                                                        <div style={{color: '#388E3C'}} className='subj-group'>Зачет</div>
                                                        :
                                                        <div style={{color: '#7CB342'}} className='subj-group'>4</div>
                                                }
                                            </>
                                        }
                                        {
                                            (item.mark >= 85) && (item.firstModuleMark >= 18 && item.secondModuleMark >= 18 && item.thirdModuleMark >= 18) &&
                                            <>
                                                {
                                                    SubjectType[item.subject[0].type] === 'Зачет'
                                                        ?
                                                        <div style={{color: '#388E3C'}} className='subj-group'>Зачет</div>
                                                        :
                                                        <div style={{color: '#388E3C'}} className='subj-group'>5</div>
                                                }
                                            </>
                                        }
                                    </div>
                                })
                            }
                        </>
                }
            </div>
            <div className='table-container'>
                <div className='left-tables'>
                    <div className='table-day'>
                        <div className='table-day'>Понедельник</div>
                        <OneTable change={false} teach={teach} key={1} schedule={day1}/>
                    </div>
                    <div className='table-day'>
                        <div className='table-day'>Среда</div>
                        <OneTable change={false} key={3} teach={teach} schedule={day3}/>
                    </div>
                    <div className='table-day'>
                        <div className='table-day'>Пятница</div>
                        <OneTable change={false} key={5} teach={teach} schedule={day5}/>
                    </div>
                </div>
                <div className='right-tables'>
                    <div className='table-day'>
                        <div className='table-day'>Вторник</div>
                        <OneTable change={false} key={2} teach={teach} schedule={day2}/>
                    </div>

                    <div className='table-day'>
                        <div className='table-day'>Четверг</div>
                        <OneTable change={false} key={4} teach={teach} schedule={day4}/>
                    </div>

                    <div className='table-day'>
                        <div className='table-day'>Суббота</div>
                        <OneTable change={false} key={6} teach={teach} schedule={day6}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfoPage;