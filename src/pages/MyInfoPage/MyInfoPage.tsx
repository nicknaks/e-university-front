import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {isLogin} from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import {getMySchedule, getSubjects} from "../../store/actions/scheduleActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import './myInfoPage.css'
import OneTable from "../../components/OneTable/OneTable";

const MyInfoPage: FC = () => {
    const dispatch = useAppDispatch();

    const {me} = useAppSelector(state => state.auth)
    const {subject, schedule} = useAppSelector(state => state.schedule)

    const nav = useNavigate();

    const [day1, setDay1] = useState([])
    const [day2, setDay2] = useState([])
    const [day3, setDay3] = useState([])
    const [day4, setDay4] = useState([])
    const [day5, setDay5] = useState([])
    const [day6, setDay6] = useState([])

    useEffect(() => {
        if (Object.keys(me).length === 0) {
            dispatch(isLogin()).then(res => {
                if (!res) {
                    nav('/')

                    return;
                }
            });
        }

        dispatch(getSubjects(me.owner_id))
        dispatch(getMySchedule())
    }, [me])

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
    }, [schedule])



    return (
        <div className='main-container'>
            <div className='main-name'>
                Предметы
            </div>
            <div className='subjects-cont'>
                {
                    subject.map((item) => {
                        return <div className='subj-row'>
                            <div className='subj-name'>{item.name}</div>
                            <div className='subj-group'>{item.group.number}</div>
                        </div>
                    })
                }
            </div>
            <div className='table-container'>
                <div className='left-tables'>
                    <div className='table-day'>
                        <div className='table-day'>Понедельник</div>
                        <OneTable key={1} schedule={day1}/>
                    </div>
                    <div className='table-day'>
                        <div className='table-day'>Среда</div>
                        <OneTable key={3} schedule={day3}/>
                    </div>
                    <div className='table-day'>
                        <div className='table-day'>Пятница</div>
                        <OneTable key={5} schedule={day5}/>
                    </div>
                </div>
                <div className='right-tables'>
                    <div className='table-day'>
                        <div className='table-day'>Вторник</div>
                        <OneTable key={2} schedule={day2}/>
                    </div>

                    <div className='table-day'>
                        <div className='table-day'>Четверг</div>
                        <OneTable key={4} schedule={day4}/>
                    </div>

                    <div className='table-day'>
                        <div className='table-day'>Суббота</div>
                        <OneTable key={6} schedule={day6}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfoPage;