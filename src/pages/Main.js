import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {facultiesList} from "../store/facultyActions";
import FacList from "../components/facList/FacList";

const Main = () => {
    const dispatch = useDispatch()
    const {faculties} = useSelector(state => state.faculty)

    useEffect(() => {
        dispatch(facultiesList())
    }, [])

    return (
        <>
            <div>
                ФАКУЛЬТЕТЫ
            </div>
            <>
                {
                    faculties.map(item => {
                        return <FacList key={item.id}  name={item.name} depList={item.departments}/>
                    })
                }
            </>
        </>
    );
};

export default Main;