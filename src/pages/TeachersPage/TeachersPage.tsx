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

    const [value, setValue] = useState('')
    const [filter, setFilter] = useState([])
    const [write, setWrite] = useState(false)

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Преподаватели'

        dispatch(getTeachers())
    }, [])

    useEffect(() => {
        setFilter(teachers);
    }, [teachers])

    const changeValue = (value) => {
        if (!write) {
            setWrite(true);
        }

        setValue(value);

        if (value === '') {
            setFilter(teachers)

            return;
        }

        setFilter(teachers.filter((item) => {
            if (item.name.includes(value)) {
                return item
            }
        }))
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