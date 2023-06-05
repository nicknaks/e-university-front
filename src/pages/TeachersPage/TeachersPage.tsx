import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {getTeachers} from "../../store/actions/scheduleActions";
import './teachersPage.css'
import Loader from "../../components/Loader/Loader";
import {Link} from "react-router-dom";

const TeachersPage: FC = () => {
    const dispatch = useAppDispatch();
    const {teachers, loading} = useAppSelector(state => state.schedule);

    const [value, setValue] = useState(localStorage.getItem('input') === null || localStorage.getItem('input') === '' ? '' : localStorage.getItem('input'))
    const [filter, setFilter] = useState([])
    const [write, setWrite] = useState(false)

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Преподаватели';

        dispatch(getTeachers());
    }, [])

    useEffect(() => {
        if (value === ''){
            setFilter(teachers);
        }

        if (value !== '') {
            console.log(value)
            if (teachers !== null) {
                setFilter(teachers.filter((item) => {
                    if (item.name.toLowerCase().includes(value.toLowerCase())) {
                        return item
                    }
                }))
            }
        }
    }, [teachers])

    const changeValue = (value) => {
        if (!write) {
            setWrite(true);
        }

        setValue(value);

        if (value === '') {
            setFilter(teachers)
            localStorage.setItem('input', value);

            return;
        }

        if (teachers !== null) {
            setFilter(teachers.filter((item) => {
                if (item.name.toLowerCase().includes(value.toLowerCase())) {
                    return item
                }
            }))
        }

        localStorage.setItem('input', value);
    }

    return (
        <div className='main-container'>
            <div className='main-name'>
                Все преподаватели МГТУ
            </div>
            <input type='text' className='input-teachers' placeholder='Поиск преподавателя по фамилии' onChange={(e) => changeValue(e.target.value)} value={value}/>
            <div className='teachers-cont'>
                {
                    loading ?
                        <Loader/>
                        :
                        <>
                            {
                                filter.length === 0 && write
                                    ?
                                    <div className='no-teachers'>По такому фильтру преподавателей нет</div>
                                    :
                                    filter.map((item) => {
                                        return <Link to={`/schedule/${item.id}`} key={item.id} className='teacher-name'>{item.name}</Link>
                                    })
                            }
                        </>

                }
            </div>
        </div>
    );
};

export default TeachersPage;