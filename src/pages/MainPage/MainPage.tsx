import React, {useEffect} from 'react';
import {facultiesList} from "../../store/actions/facultyActions";
import FacList from "../../components/FacList/FacList";
import {FC} from "react";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import './mainPage.css'

const MainPage: FC = () => {
    const dispatch = useAppDispatch();
    const {faculties} = useAppSelector(state => state.faculty);

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Факультеты'


        if (faculties.length === 0) {
            dispatch(facultiesList());
        }
    }, [])

    return (
        <div className='main-container'>
            <div className='main-name'>
                Факультеты
            </div>
            <div className='all-fac'>
                <div className='left-col'>
                    {
                        faculties.slice(0, faculties.length / 2).map(item => {
                            return <FacList key={item.id} number={item.number} name={item.name} depList={item.departments}/>
                        })
                    }
                </div>
                <div className='right-col'>
                    {
                        faculties.slice(faculties.length / 2).map(item => {
                            return <FacList key={item.id}  number={item.number} name={item.name} depList={item.departments}/>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default MainPage;