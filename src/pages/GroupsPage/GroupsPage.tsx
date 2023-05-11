import React, {FC, useEffect, useRef, useState} from 'react';
import './groupsPage.css';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {useAppSelector} from "../../hooks/useAppSelector";
import {facultiesList, groupsList, groupsNullList} from "../../store/actions/facultyActions";
import ListElement from "../../components/ListElement/ListElement"
import {Faculties} from "../../store/reducers/facultyReducer/types";
import CourseDep from "../../components/CourseDep/CourseDep";
import {translate} from "../../utils/translate";

const GroupsPage: FC = () => {
    const dispatch = useAppDispatch();
    const {faculties, groups, course1, course3, course2, course4, course5, course6} = useAppSelector(state => state.faculty);

    const [getFac, setGetFac] = useState('');

    const [facList, setFacList] = useState('Выберите факультет');
    const [facDep, setFacDep] = useState({} as Faculties);

    const [depList, setDepList] = useState('Выберите кафедру');
    const [prevDep, setPrevDep] = useState(null);

    const [checkMag, setCheckMag] = useState(false);

    const refHeadDepList = useRef<HTMLDivElement>();
    const refDepArrow = useRef<SVGSVGElement>();
    const refDepUl = useRef<HTMLUListElement>();

    const refHeadFacList = useRef<HTMLDivElement>();
    const refFacArrow = useRef<SVGSVGElement>();
    const refFacUl = useRef<HTMLUListElement>();

    const refCourse1 = useRef<HTMLDivElement>();
    const refCourse2 = useRef<HTMLDivElement>();
    const refCourse3 = useRef<HTMLDivElement>();
    const refCourse4 = useRef<HTMLDivElement>();
    const refCourse5 = useRef<HTMLDivElement>();
    const refCourse6 = useRef<HTMLDivElement>();

    const refCourseBox1 = useRef<HTMLDivElement>();
    const refCourseBox2 = useRef<HTMLDivElement>();
    const refCourseBox3 = useRef<HTMLDivElement>();
    const refCourseBox4 = useRef<HTMLDivElement>();
    const refCourseBox5 = useRef<HTMLDivElement>();
    const refCourseBox6 = useRef<HTMLDivElement>();

    const refCheckMag = useRef<HTMLInputElement>();

    useEffect(() => {
        document.getElementsByTagName('title')[0].innerText = 'Списки групп'

        if (faculties.length === 0) {
            dispatch(facultiesList());
        }

        if (depList !== 'Выберите кафедру') {
            refCourse1.current.classList.remove('course-inactive');
            refCourse2.current.classList.remove('course-inactive');
            refCourse3.current.classList.remove('course-inactive');
            refCourse4.current.classList.remove('course-inactive');
            refCourse5.current.classList.remove('course-inactive');
            refCourse6.current.classList.remove('course-inactive');
        }

        return () => {
            dispatch(groupsNullList())
        }
    }, []);

    useEffect(() => {
        const pathGet = window.location.search.replace( '?', '').split('&');

        if (pathGet[0] !== '') {
            const facGet = Object.keys(translate).find(key => translate[key] === pathGet[0].slice(4))

            if (faculties.length !== 0) {
                const findFac = faculties.filter((item) => {
                    if (item.number === facGet) {
                        return item
                    }
                })[0];

                setFacList(findFac.number + " " + findFac.name);
                setFacDep(findFac);

                if (pathGet.length === 1) {
                    return;
                }

                const depGet = facGet + +/\d+/.exec(pathGet[1].slice(4));

                const findDep = findFac.departments.filter((item) => {
                    if (item.number === depGet) {
                        return item
                    }
                })[0];

                setDepList(findDep.number + ' ' + findDep.name)

                const res = dispatch(groupsList(findDep.id));
            }
        }
    }, [faculties])

    useEffect(() => {
        if (course1.length === 0) {
            refCourse1.current.classList.add('course-inactive');
        } else {
            refCourse1.current.classList.remove('course-inactive');
        }

        if (course2.length === 0) {
            refCourse2.current.classList.add('course-inactive');
        } else {
            refCourse2.current.classList.remove('course-inactive');
        }

        if (course3.length === 0) {
            refCourse3.current.classList.add('course-inactive');
        } else {
            refCourse3.current.classList.remove('course-inactive');
        }

        if (course4.length === 0) {
            refCourse4.current.classList.add('course-inactive');
        } else {
            refCourse4.current.classList.remove('course-inactive');
        }

        if (course5.length === 0) {
            refCourse5.current.classList.add('course-inactive');
        } else {
            refCourse5.current.classList.remove('course-inactive');
        }

        if (course6.length === 0) {
            refCourse6.current.classList.add('course-inactive');
        } else {
            refCourse6.current.classList.remove('course-inactive');
        }
    }, [groups])

    const openFacUl = () => {
        if (refFacUl.current.classList.length === 2) {
            refHeadFacList.current.classList.add('head-of-list-active');
            refHeadFacList.current.classList.remove('head-of-list-error')
            refFacUl.current.classList.remove('header-list-hidden');
            refFacArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refFacUl.current.classList.length === 1) {
            refHeadFacList.current.classList.remove('head-of-list-active')
            refFacUl.current.classList.add('header-list-hidden');
            refFacArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectFacList = (e, id) => {
        refHeadFacList.current.classList.remove('head-of-list-active')
        refFacUl.current.classList.add('header-list-hidden');
        refFacArrow.current.classList.remove('list-arrow-active');

        if (facList !== 'Выберите факультет') {
            dispatch(groupsNullList());
        }

        if (e.target.classList[0] === 'list-element') {
            setFacList(e.target.textContent);

            setFacDep(faculties.filter((item) => {
                if (item.number === e.target.textContent.split(' ')[0]) {
                    return item
                }
            })[0]);
            setDepList('Выберите кафедру')


            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            setFacList(e.target.textContent);

            setFacDep(faculties.filter((item) => {
                if (item.number === e.target.textContent.split(' ')[0]) {
                    return item
                }
            })[0]);
            setDepList('Выберите кафедру')


            return;
        }

        setFacList(e.target.parentElement.textContent);

        setFacDep(faculties.filter((item) => {
            if (item.number === e.target.parentElement.textContent.split(' ')[0]) {
                return item
            }
        })[0]);
        setDepList('Выберите кафедру')
    }

    const openDepUl = () => {
        if (refDepUl.current.classList.length === 2) {
            refHeadDepList.current.classList.add('head-of-list-active');
            refHeadDepList.current.classList.remove('head-of-list-error')
            refDepUl.current.classList.remove('header-list-hidden');
            refDepArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refDepUl.current.classList.length === 1) {
            refHeadDepList.current.classList.remove('head-of-list-active')
            refDepUl.current.classList.add('header-list-hidden');
            refDepArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectDepList = async (e, id) => {
        refHeadDepList.current.classList.remove('head-of-list-active')
        refDepUl.current.classList.add('header-list-hidden');
        refDepArrow.current.classList.remove('list-arrow-active');

        const res = await dispatch(groupsList(id));

        if (res) {
            refCourse1.current.classList.remove('course-inactive');
            refCourse2.current.classList.remove('course-inactive');
            refCourse3.current.classList.remove('course-inactive');
            refCourse4.current.classList.remove('course-inactive');
        }

        if (!res) {
            refCourse1.current.classList.add('course-inactive');
            refCourse2.current.classList.add('course-inactive');
            refCourse3.current.classList.add('course-inactive');
            refCourse4.current.classList.add('course-inactive');
            refCourse5.current.classList.add('course-inactive');
            refCourse6.current.classList.add('course-inactive');
        }

        if (e.target.classList[0] === 'list-element') {
            setDepList(e.target.textContent);

            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            setDepList(e.target.textContent);

            return;
        }

        setDepList(e.target.parentElement.textContent);
    }

    const changeFirstCheck = (e) => {
        if (course1.length === 0
            || refCourse1.current.classList[1] === 'course-number-active'
            || refCourse2.current.classList[1] === 'course-number-active'
            || refCourse3.current.classList[1] === 'course-number-active'
            || refCourse4.current.classList[1] === 'course-number-active'
            || refCourse5.current.classList[1] === 'course-number-active'
            || refCourse6.current.classList[1] === 'course-number-active') {
            return;
        }

        setCheckMag(e.target.checked);

        if (!checkMag) {
            refCourse3.current.classList.add('course-inactive');
            refCourse4.current.classList.add('course-inactive');
            refCourse5.current.classList.add('course-inactive');
            refCourse6.current.classList.add('course-inactive');

            return
        }

        refCourse3.current.classList.remove('course-inactive');
        refCourse4.current.classList.remove('course-inactive');

        if (course5.length !== 0) {
            refCourse5.current.classList.remove('course-inactive');
            refCourse6.current.classList.remove('course-inactive');
        }
    }

    const changeCourse = (e) => {
        if (e.target === refCourse1.current && refCourse1.current.classList[1] !== 'course-inactive') {
            refCourse1.current.classList.toggle('course-number-active');
            refCourse2.current.classList.remove('course-number-active');
            refCourse3.current.classList.remove('course-number-active');
            refCourse4.current.classList.remove('course-number-active');
            refCourse5.current.classList.remove('course-number-active');
            refCourse6.current.classList.remove('course-number-active');

            refCourse2.current.classList.toggle('course-inactive');
            refCourse3.current.classList.toggle('course-inactive');
            refCourse4.current.classList.toggle('course-inactive');

            if (course5.length !== 0) {
                 refCourse5.current.classList.toggle('course-inactive');
                 refCourse6.current.classList.toggle('course-inactive');
            }

            if (refCourseBox2.current !== undefined) {
                refCourseBox2.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox3.current !== undefined) {
                refCourseBox3.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox4.current !== undefined) {
                refCourseBox4.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox5.current !== undefined) {
                refCourseBox5.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox6.current !== undefined) {
                refCourseBox6.current.classList.toggle('course-box-hidden');
            }

        }

        if (e.target === refCourse2.current && refCourse2.current.classList[1] !== 'course-inactive') {
            refCourse1.current.classList.remove('course-number-active');
            refCourse2.current.classList.toggle('course-number-active');
            refCourse3.current.classList.remove('course-number-active');
            refCourse4.current.classList.remove('course-number-active');
            refCourse5.current.classList.remove('course-number-active');
            refCourse6.current.classList.remove('course-number-active');

            refCourse1.current.classList.toggle('course-inactive');
            refCourse3.current.classList.toggle('course-inactive');
            refCourse4.current.classList.toggle('course-inactive');

            if (course5.length !== 0) {
                refCourse5.current.classList.toggle('course-inactive');
                refCourse6.current.classList.toggle('course-inactive');
            }

            if (refCourseBox1.current !== undefined) {
                refCourseBox1.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox3.current !== undefined) {
                refCourseBox3.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox4.current !== undefined) {
                refCourseBox4.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox5.current !== undefined) {
                refCourseBox5.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox6.current !== undefined) {
                refCourseBox6.current.classList.toggle('course-box-hidden');
            }

        }

        if (e.target === refCourse3.current && refCourse3.current.classList[1] !== 'course-inactive') {
            refCourse1.current.classList.remove('course-number-active');
            refCourse2.current.classList.remove('course-number-active');
            refCourse3.current.classList.toggle('course-number-active');
            refCourse4.current.classList.remove('course-number-active');
            refCourse5.current.classList.remove('course-number-active');
            refCourse6.current.classList.remove('course-number-active');

            refCourse1.current.classList.toggle('course-inactive');
            refCourse2.current.classList.toggle('course-inactive');
            refCourse4.current.classList.toggle('course-inactive');

            if (course5.length !== 0) {
                refCourse5.current.classList.toggle('course-inactive');
                refCourse6.current.classList.toggle('course-inactive');
            }

            if (refCourseBox1.current !== undefined) {
                refCourseBox1.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox2.current !== undefined) {
                refCourseBox2.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox4.current !== undefined) {
                refCourseBox4.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox5.current !== undefined) {
                refCourseBox5.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox6.current !== undefined) {
                refCourseBox6.current.classList.toggle('course-box-hidden');
            }

        }

        if (e.target === refCourse4.current && refCourse4.current.classList[1] !== 'course-inactive') {
            refCourse1.current.classList.remove('course-number-active');
            refCourse2.current.classList.remove('course-number-active');
            refCourse3.current.classList.remove('course-number-active');
            refCourse4.current.classList.toggle('course-number-active');
            refCourse5.current.classList.remove('course-number-active');
            refCourse6.current.classList.remove('course-number-active');

            refCourse1.current.classList.toggle('course-inactive');
            refCourse2.current.classList.toggle('course-inactive');
            refCourse3.current.classList.toggle('course-inactive');

            if (course5.length !== 0) {
                refCourse5.current.classList.toggle('course-inactive');
                refCourse6.current.classList.toggle('course-inactive');
            }

            if (refCourseBox1.current !== undefined) {
                refCourseBox1.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox2.current !== undefined) {
                refCourseBox2.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox3.current !== undefined) {
                refCourseBox3.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox5.current !== undefined) {
                refCourseBox5.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox6.current !== undefined) {
                refCourseBox6.current.classList.toggle('course-box-hidden');
            }

        }

        if (e.target === refCourse5.current && refCourse5.current.classList[1] !== 'course-inactive') {
            refCourse1.current.classList.remove('course-number-active');
            refCourse2.current.classList.remove('course-number-active');
            refCourse3.current.classList.remove('course-number-active');
            refCourse4.current.classList.remove('course-number-active');
            refCourse5.current.classList.toggle('course-number-active');
            refCourse6.current.classList.remove('course-number-active');

            refCourse1.current.classList.toggle('course-inactive');
            refCourse2.current.classList.toggle('course-inactive');
            refCourse3.current.classList.toggle('course-inactive');
            refCourse4.current.classList.toggle('course-inactive');

            if (course6.length !== 0) {
                refCourse6.current.classList.toggle('course-inactive');
            }

            if (refCourseBox1.current !== undefined) {
                refCourseBox1.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox2.current !== undefined) {
                refCourseBox2.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox3.current !== undefined) {
                refCourseBox3.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox4.current !== undefined) {
                refCourseBox4.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox6.current !== undefined) {
                refCourseBox6.current.classList.toggle('course-box-hidden');
            }
        }

        if (e.target === refCourse6.current && refCourse6.current.classList[1] !== 'course-inactive') {
            refCourse1.current.classList.remove('course-number-active');
            refCourse2.current.classList.remove('course-number-active');
            refCourse3.current.classList.remove('course-number-active');
            refCourse4.current.classList.remove('course-number-active');
            refCourse5.current.classList.remove('course-number-active');
            refCourse6.current.classList.toggle('course-number-active');

            refCourse1.current.classList.toggle('course-inactive');
            refCourse2.current.classList.toggle('course-inactive');
            refCourse3.current.classList.toggle('course-inactive');
            refCourse4.current.classList.toggle('course-inactive');
            refCourse5.current.classList.toggle('course-inactive');

            if (refCourseBox1.current !== undefined) {
                refCourseBox1.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox2.current !== undefined) {
                refCourseBox2.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox3.current !== undefined) {
                refCourseBox3.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox4.current !== undefined) {
                refCourseBox4.current.classList.toggle('course-box-hidden');
            }

            if (refCourseBox5.current !== undefined) {
                refCourseBox5.current.classList.toggle('course-box-hidden');
            }
        }
    }

    return (
        <div className='main-container'>
            <div style={{marginBottom: '10px'}} className='main-name'>Группы</div>
            <div className='fac-input'>
                <div className='fac-input-text'> Факультет:</div>
                <div className="open-list-fac">
                    <div ref={refHeadFacList} onClick={openFacUl} className='head-of-list'>
                        {facList}
                        <svg ref={refFacArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000"
                                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                        </svg>
                    </div>
                    <ul style={{zIndex: '13'}} ref={refFacUl} className='header-list header-list-hidden'>
                        {
                            faculties.map((item) => {
                                return <ListElement select={selectFacList} choose={facList} key={item.id} id={item.id} number={item.number} name={item.name}/>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='fac-input'>
                <div className='fac-input-text'> Кафедра:</div>
                <div className="open-list-fac">
                    <div ref={refHeadDepList} onClick={openDepUl} className='head-of-list'>
                        <div className='head-list-text'> {depList}</div>
                        <svg ref={refDepArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000"
                                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                        </svg>
                    </div>
                    <ul ref={refDepUl} className='header-list header-list-hidden'>
                        {
                            facDep.departments !== undefined && facDep.departments !== null
                                ?
                                    facDep.departments.map((item) => {
                                        return <ListElement select={selectDepList} choose={depList} key={item.id} id={item.id} number={item.number} name={item.name}/>
                                    })
                                :
                                    <ListElement number='' name='Сначала нужно выбрать факультет'/>
                        }
                    </ul>
                </div>
            </div>
            <div className='fac-input'>
                <div className='fac-input-text'> Курс:</div>
                <div onClick={changeCourse} className='choose-course-cont'>
                    <div ref={refCourse1} className='course-number course-inactive'>1</div>
                    <div ref={refCourse2} className='course-number course-inactive'>2</div>
                    <div ref={refCourse3} className='course-number course-inactive'>3</div>
                    <div ref={refCourse4} className='course-number course-inactive'>4</div>
                    <div ref={refCourse5} className='course-number course-inactive'>5</div>
                    <div ref={refCourse6} className='course-number course-inactive'>6</div>
                </div>
            </div>
            <div className='fac-input'>
                <div className='fac-input-text'> Магистратура:</div>
                <div className='check-mag-cont'>
                    <label className="checkbox style-e">
                        <input onChange={(e) => changeFirstCheck(e)} checked={checkMag} type="checkbox"/>
                        <div ref={refCheckMag} className="checkbox__checkmark">

                        </div>
                    </label>
                </div>
            </div>
            <div className='timetable-container'>
                {
                    course1.length !== 0
                        ?
                        <div ref={refCourseBox1} className='course-box'>
                            <div className='time-course-number'> 1 Курс </div>
                            <div className='course-container'>
                                {
                                    course1.map((item) => {
                                        return <CourseDep key={item.id} href={item.id} numberCourse={item.number}/>
                                    })
                                }
                            </div>
                        </div>
                        :
                        <div className='no-groups-time'>По такому фильтру нет групп</div>
                }
                {
                    course2.length !== 0 &&
                        <div ref={refCourseBox2} className='course-box'>
                            <div className='time-course-number'> 2 Курс </div>
                            <div className='course-container'>
                                {
                                    course2.map((item) => {
                                        return <CourseDep key={item.id} href={item.id} numberCourse={item.number}/>
                                    })
                                }
                            </div>
                        </div>
                }
                {
                    course3.length !== 0 &&
                    <div ref={refCourseBox3} className='course-box'>
                        <div className='time-course-number'> 3 Курс </div>
                        <div className='course-container'>
                            {
                                course3.map((item) => {
                                    return <CourseDep key={item.id} href={item.id} numberCourse={item.number}/>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    course4.length !== 0 &&
                    <div  ref={refCourseBox4} className='course-box'>
                        <div className='time-course-number'> 4 Курс </div>
                        <div className='course-container'>
                            {
                                course4.map((item) => {
                                    return <CourseDep key={item.id} href={item.id} numberCourse={item.number}/>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    course5.length !== 0 &&
                    <div ref={refCourseBox5} className='course-box'>
                        <div className='time-course-number'> 5 Курс </div>
                        <div className='course-container'>
                            {
                                course5.map((item) => {
                                    return <CourseDep key={item.id} href={item.id} numberCourse={item.number}/>
                                })
                            }
                        </div>
                    </div>
                }
                {
                    course6.length !== 0 &&
                    <div  ref={refCourseBox6} className='course-box'>
                        <div className='time-course-number'> 6 Курс </div>
                        <div className='course-container'>
                            {
                                course6.map((item) => {
                                    return <CourseDep key={item.id} href={item.id}  numberCourse={item.number}/>
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default GroupsPage;