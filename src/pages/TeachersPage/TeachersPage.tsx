import React, {FC, useEffect} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getTeachers} from "../../store/actions/scheduleActions";
import './teachersPage.css'

const TeachersPage: FC = () => {
    const dispatch = useAppDispatch();
    const {teachers} = useAppSelector(state => state.schedule)

    useEffect(() => {
        dispatch(getTeachers())
    }, [])

    console.log(teachers)

    return (
        <div className='main-container'>
            <div className='main-name'>
                Все преподаватели МГТУ
            </div>
            <div className='teachers-cont'>
                {
                    teachers.map((item) => {
                        return <div key={item.id} className='teacher-name'>{item.name}</div>
                    })
                }
            </div>
        </div>
    );
};

export default TeachersPage;