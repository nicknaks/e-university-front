import React, {FC, useEffect, useRef, useState} from 'react';
import {LessonType, Schedule, Subjects} from "../../store/reducers/sheduleReducer/types";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import './oneTable.css'
import ListElement from "../ListElement/ListElement";
import {addLesson} from "../../store/actions/scheduleActions";

interface OneTableProps {
    schedule: Array<Schedule>,
    teach: boolean,
    change: boolean,
    subj?: Subjects[],
    day?: number,
    changeTimeTable?: (e) => void;
    groupId?: string
}

const OneTable: FC<OneTableProps> = ({changeTimeTable, groupId, day, subj, change, schedule, teach}) => {
    const [couple1, setCouple1] = useState([])
    const [couple2, setCouple2] = useState([])
    const [couple3, setCouple3] = useState([])
    const [couple4, setCouple4] = useState([])
    const [couple5, setCouple5] = useState([])
    const [couple6, setCouple6] = useState([])
    const [couple7, setCouple7] = useState([])

    const dispatch = useAppDispatch();

    const refNumCouple1 = useRef<HTMLTableDataCellElement>();
    const refDenCouple1 = useRef<HTMLTableDataCellElement>();
    const refComCouple1 = useRef<HTMLTableDataCellElement>();

    const refNumCouple2 = useRef<HTMLTableDataCellElement>();
    const refDenCouple2 = useRef<HTMLTableDataCellElement>();
    const refComCouple2 = useRef<HTMLTableDataCellElement>();

    const refNumCouple3 = useRef<HTMLTableDataCellElement>();
    const refDenCouple3 = useRef<HTMLTableDataCellElement>();
    const refComCouple3 = useRef<HTMLTableDataCellElement>();
    
    const refNumCouple4 = useRef<HTMLTableDataCellElement>();
    const refDenCouple4 = useRef<HTMLTableDataCellElement>();
    const refComCouple4 = useRef<HTMLTableDataCellElement>();

    const refNumCouple5 = useRef<HTMLTableDataCellElement>();
    const refDenCouple5 = useRef<HTMLTableDataCellElement>();
    const refComCouple5 = useRef<HTMLTableDataCellElement>();

    const refNumCouple6 = useRef<HTMLTableDataCellElement>();
    const refDenCouple6 = useRef<HTMLTableDataCellElement>();
    const refComCouple6 = useRef<HTMLTableDataCellElement>();

    const refNumCouple7 = useRef<HTMLTableDataCellElement>();
    const refDenCouple7 = useRef<HTMLTableDataCellElement>();
    const refComCouple7 = useRef<HTMLTableDataCellElement>();

    const refPopUp = useRef<HTMLDivElement>()
    const refPopUpBody = useRef<HTMLDivElement>();
    const refError = useRef<HTMLDivElement>();

    const refHeadTeachList = useRef<HTMLDivElement>();
    const refTeachArrow = useRef<SVGSVGElement>();
    const refTeachUl = useRef<HTMLUListElement>();
    const refHeadTypeList = useRef<HTMLDivElement>();
    const refTypeArrow = useRef<SVGSVGElement>();
    const refTypeUl = useRef<HTMLUListElement>();
    const refChangeType = useRef<HTMLDivElement>();

    const [teachList, setTeachList] = useState('Выберите предмет');
    const [typeList, setTypeList] = useState('Выберите тип предмета');
    const [teachId, setTeachId] = useState('');
    const [couple, setCouple] = useState(0);
    const [checkSecond, setCheckSecond] = useState(false);
    const [isNum, setIsNum] = useState(false);
    const [name, setName] = useState('');

    const [error, setError] = useState('')

    useEffect(() => {
        if (couple1.length === 0
            && couple2.length === 0
            && couple3.length === 0
            && couple4.length === 0
            && couple5.length === 0
            && couple6.length === 0
            && couple7.length === 0) {

            schedule.forEach((item) => {
                if (item.couple === 1) {
                    setCouple1(prevState => [...prevState, item])
                }
                if (item.couple === 2) {
                    setCouple2(prevState => [...prevState, item])
                }
                if (item.couple === 3) {
                    setCouple3(prevState => [...prevState, item])
                }
                if (item.couple === 4) {
                    setCouple4(prevState => [...prevState, item])
                }
                if (item.couple === 5) {
                    setCouple5(prevState => [...prevState, item])
                }
                if (item.couple === 6) {
                    setCouple6(prevState => [...prevState, item])
                }
                if (item.couple === 7) {
                    setCouple7(prevState => [...prevState, item])
                }
            })
        }
    }, [schedule]);

    useEffect(() => {
        couple2.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple2.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple2.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple2.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple2.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple2.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple2.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple2.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple2.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple2.current.style.display = 'none'
                refNumCouple2.current.style.display = 'none'
                refComCouple2.current.style.display = 'table-cell'
                refComCouple2.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple2.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple2.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple2])

    useEffect(() => {
        couple3.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple3.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple3.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple3.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple3.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple3.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple3.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple3.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple3.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple3.current.style.display = 'none'
                refNumCouple3.current.style.display = 'none'
                refComCouple3.current.style.display = 'table-cell'
                refComCouple3.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple3.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple3.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple3])

    useEffect(() => {
        couple4.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple4.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple4.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple4.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple4.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple4.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple4.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple4.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple4.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple4.current.style.display = 'none'
                refNumCouple4.current.style.display = 'none'
                refComCouple4.current.style.display = 'table-cell'
                refComCouple4.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple4.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple4.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple4])

    useEffect(() => {
        couple1.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple1.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple1.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple1.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple1.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple1.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple1.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple1.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple1.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple1.current.style.display = 'none'
                refNumCouple1.current.style.display = 'none'
                refComCouple1.current.style.display = 'table-cell'
                refComCouple1.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple1.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple1.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple1])

    useEffect(() => {
        couple5.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple5.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple5.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple5.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple5.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple5.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple5.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple5.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple5.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple5.current.style.display = 'none'
                refNumCouple5.current.style.display = 'none'
                refComCouple5.current.style.display = 'table-cell'
                refComCouple5.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple5.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple5.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple5])

    useEffect(() => {
        couple6.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple6.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple6.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple6.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple6.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple6.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple6.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple6.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple6.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple6.current.style.display = 'none'
                refNumCouple6.current.style.display = 'none'
                refComCouple6.current.style.display = 'table-cell'
                refComCouple6.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple6.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple6.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple6])

    useEffect(() => {
        couple7.filter((item) => {
            if (item.isNumerator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refNumCouple7.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refNumCouple7.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refNumCouple7.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple7.filter((item) => {
            if (item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple7.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`
            }

            if (item.teacher !== undefined && !teach) {
                refDenCouple7.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refDenCouple7.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })

        couple7.filter((item) => {
            if (!item.isNumerator && !item.isDenominator) {
                return item
            }
        }).forEach((item, index) => {
            if (index === 0) {
                refDenCouple7.current.style.display = 'none'
                refNumCouple7.current.style.display = 'none'
                refComCouple7.current.style.display = 'table-cell'
                refComCouple7.current.innerHTML = `<em>${LessonType[item.type]}</em> ${item.name} ${item.cabinet} ${` `}`;
            }

            if (item.teacher !== undefined && !teach) {
                refComCouple7.current.innerHTML += `${item.teacher.name} ${` `}`;
            }

            if (item.group !== undefined && teach) {
                refComCouple7.current.innerHTML += `${item.group.number} ${` `}`;
            }
        })
    }, [couple7])

    const openPopUp = (e, couple, isNum) => {
        if (e.target.textContent !== '') {
            return
        }

        setIsNum(isNum);
        setCouple(couple)

        document.body.style.overflowY = 'hidden';
        e.preventDefault();

        refPopUp.current.classList.add('popUp-container-active');
        refPopUpBody.current.classList.add('popUp-active');
    }

    const closePopUp = (e) => {
        document.body.style.overflowY = 'visible';
        e.preventDefault();

        setName('');
        setCheckSecond(false);
        setTeachList('Выберите предмет')
        setTypeList('Выберите тип предмета')
        refPopUp.current.classList.remove('popUp-container-active');
        refPopUpBody.current.classList.remove('popUp-active');
    }

    const openTeachUl = () => {
        if (refTeachUl.current.classList.length === 2) {
            refHeadTeachList.current.classList.add('head-of-list-active');
            refHeadTeachList.current.classList.remove('head-of-list-error')
            refTeachUl.current.classList.remove('header-list-hidden');
            refTeachArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refTeachUl.current.classList.length === 1) {
            refHeadTeachList.current.classList.remove('head-of-list-active')
            refTeachUl.current.classList.add('header-list-hidden');
            refTeachArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectTeachList = (e, id) => {
        setError('')
        setTeachId(id);

        refHeadTeachList.current.classList.remove('head-of-list-active')
        refTeachUl.current.classList.add('header-list-hidden');
        refTeachArrow.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            setTeachList(e.target.textContent);

            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            setTeachList(e.target.textContent);

            return;
        }

        setTeachList(e.target.parentElement.textContent);
    }

    const openTypeUl = () => {
        if (refTypeUl.current.classList.length === 2) {
            refHeadTypeList.current.classList.add('head-of-list-active');
            refHeadTypeList.current.classList.remove('head-of-list-error')
            refTypeUl.current.classList.remove('header-list-hidden');
            refTypeArrow.current.classList.add('list-arrow-active');

            return
        }

        if (refTypeUl.current.classList.length === 1) {
            refHeadTypeList.current.classList.remove('head-of-list-active')
            refTypeUl.current.classList.add('header-list-hidden');
            refTypeArrow.current.classList.remove('list-arrow-active');

            return
        }
    }

    const selectTypeList = (e) => {
        setError('')
        refHeadTypeList.current.classList.remove('head-of-list-active')
        refTypeUl.current.classList.add('header-list-hidden');
        refTypeArrow.current.classList.remove('list-arrow-active');

        if (e.target.classList[0] === 'list-element') {
            setTypeList(e.target.textContent);

            return
        }

        if (e.target.classList[0] === 'fac-in-list') {
            setTypeList(e.target.textContent);

            return;
        }

        setTypeList(e.target.parentElement.textContent);
    }

    const changeSecondCheck = (e) => {
        setCheckSecond(e.target.checked)
    }

    const changeName = (value) => {
        setError('')
        setName(value)
    }

    const sumbit = async (e) => {
        e.preventDefault();

        if (name === '') {
            setError('Введите кабинет')

            return
        }

        if (teachList === 'Выберите предмет') {
            setError('Введите предмет из списка')

            return
        }

        if (typeList === 'Выберите тип предмета') {
            setError('Введите тип предмета из списка')

            return
        }

        const type = Object.entries(LessonType).filter((item) => {
            if (item[1] === typeList) {
                return item;
            }
        })[0][0];

        if (isNum && !checkSecond) {
            const res = await dispatch(addLesson(teachId, type, couple, day, false, true, name, groupId));

            if (!res) {
                setError('В данном случае нельзя поставить общую пару')
                return
            }
        }

        if (!isNum && !checkSecond) {
            const res = await dispatch(addLesson(teachId, type, couple, day, true, false, name, groupId));

            if (!res) {
                setError('В данном случае нельзя поставить общую пару')
                return
            }
        }

        if (checkSecond) {
            const res = await dispatch(addLesson(teachId, type, couple, day, false, false, name, groupId));

            if (!res) {
                setError('В данном случае нельзя поставить общую пару')
                return
            }
        }

        closePopUp(e);

        changeTimeTable(e)

        setName('');
        setCheckSecond(false);
        setTeachList('Выберите предмет')
        setTypeList('Выберите тип предмета')

    }

    return (
        <>
            <table className='table-one'>
                <tbody>
                {
                    change
                        ?
                        <>
                            <tr className='table-row'>
                                <td style={{fontSize: 16, height: 40}} className='table-column-first'>Время</td>
                                <td style={{fontSize: 16, fontWeight: "bold", height: 40}} className='table-column-second'>ЧС</td>
                                <td style={{fontSize: 16, fontWeight: "bold", height: 40}} className='table-column-third'>ЗН</td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    08:30 - 10:05
                                </td>
                                <td ref={refNumCouple1} onClick={(e) => openPopUp(e, 1, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple1} onClick={(e) => openPopUp(e, 1, false)} className='table-column-third change-elem'></td>
                                <td ref={refComCouple1} onClick={(e) => openPopUp(e, 1, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    10:15 - 11:50
                                </td>
                                <td ref={refNumCouple2} onClick={(e) => openPopUp(e, 2, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple2} onClick={(e) => openPopUp(e, 2, false)} className='table-column-third change-elem'></td>
                                <td ref={refComCouple2} onClick={(e) => openPopUp(e, 2, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    12:00 - 13:35
                                </td>
                                <td ref={refNumCouple3} onClick={(e) => openPopUp(e, 3, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple3} onClick={(e) => openPopUp(e, 3, false)} className='table-column-third change-elem '></td>
                                <td ref={refComCouple3} onClick={(e) => openPopUp(e, 3, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    13:50 - 15:25
                                </td>
                                <td ref={refNumCouple4} onClick={(e) => openPopUp(e, 4, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple4} onClick={(e) => openPopUp(e, 4, false)} className='table-column-third change-elem'></td>
                                <td ref={refComCouple4} onClick={(e) => openPopUp(e, 4, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    15:40 - 17:15
                                </td>
                                <td ref={refNumCouple5} onClick={(e) => openPopUp(e, 5, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple5} onClick={(e) => openPopUp(e, 5, false)} className='table-column-third change-elem'></td>
                                <td ref={refComCouple5} onClick={(e) => openPopUp(e, 5, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    17:25 - 19:00
                                </td>
                                <td ref={refNumCouple6} onClick={(e) => openPopUp(e, 6, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple6} onClick={(e) => openPopUp(e, 6, false)} className='table-column-third change-elem'></td>
                                <td ref={refComCouple6} onClick={(e) => openPopUp(e, 6, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    19:10 - 20:45
                                </td>
                                <td ref={refNumCouple7} onClick={(e) => openPopUp(e, 7, true)} className='table-column-second change-elem'></td>
                                <td ref={refDenCouple7} onClick={(e) => openPopUp(e, 7, false)} className='table-column-third change-elem'></td>
                                <td ref={refComCouple7} onClick={(e) => openPopUp(e, 7, false)} style={{display: 'none'}} colSpan={2} className='table-column-comon change-elem'></td>
                            </tr>
                        </>
                        :
                        <>
                            <tr className='table-row'>
                                <td style={{fontSize: 16, height: 40}} className='table-column-first'>Время</td>
                                <td style={{fontSize: 16, fontWeight: "bold", height: 40}} className='table-column-second'>ЧС</td>
                                <td style={{fontSize: 16, fontWeight: "bold", height: 40}} className='table-column-third'>ЗН</td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    08:30 - 10:05
                                </td>
                                <td ref={refNumCouple1} className='table-column-second'></td>
                                <td ref={refDenCouple1} className='table-column-third'></td>
                                <td ref={refComCouple1} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    10:15 - 11:50
                                </td>
                                <td ref={refNumCouple2} className='table-column-second'></td>
                                <td ref={refDenCouple2} className='table-column-third'></td>
                                <td ref={refComCouple2} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    12:00 - 13:35
                                </td>
                                <td ref={refNumCouple3} className='table-column-second'></td>
                                <td ref={refDenCouple3} className='table-column-third'></td>
                                <td ref={refComCouple3} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    13:50 - 15:25
                                </td>
                                <td ref={refNumCouple4} className='table-column-second'></td>
                                <td ref={refDenCouple4} className='table-column-third'></td>
                                <td ref={refComCouple4} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    15:40 - 17:15
                                </td>
                                <td ref={refNumCouple5} className='table-column-second'></td>
                                <td ref={refDenCouple5} className='table-column-third'></td>
                                <td ref={refComCouple5} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    17:25 - 19:00
                                </td>
                                <td ref={refNumCouple6} className='table-column-second'></td>
                                <td ref={refDenCouple6} className='table-column-third'></td>
                                <td ref={refComCouple6} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                            <tr className='table-row'>
                                <td className='table-column-first'>
                                    19:10 - 20:45
                                </td>
                                <td ref={refNumCouple7} className='table-column-second'></td>
                                <td ref={refDenCouple7} className='table-column-third'></td>
                                <td ref={refComCouple7} style={{display: 'none'}} colSpan={2} className='table-column-comon'></td>
                            </tr>
                        </>
                }

                </tbody>
            </table>

            {
                subj !== undefined &&
                <div ref={refPopUp} className='popUp-container'>
                    <div ref={refPopUpBody} className='popUp'>
                        <svg onClick={closePopUp} className='close-popup' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                            <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                        </svg>
                        <form className="menu-form" method="post" action="/" noValidate encType="application/json">
                            <div className='form-input-cont'>
                                <div className='input-text'>Предметы</div>
                                <div style={{width: '100%'}} className="open-list-fac">
                                    <div ref={refHeadTeachList} onClick={openTeachUl} className='head-of-list'>
                                        {teachList}
                                        <svg ref={refTeachArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#000000"
                                                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                        </svg>
                                    </div>
                                    <ul style={{zIndex: '13'}} ref={refTeachUl} className='header-list header-list-hidden'>
                                        {
                                            subj.map((item) => {
                                                return <ListElement select={(e) => selectTeachList(e, item.id)} choose={teachList} key={item.id} id={item.id} name={item.name}/>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='form-input-cont'>
                                <div className='input-text'>Тип предмета</div>
                                <div style={{width: '100%'}} className="open-list-fac">
                                    <div ref={refHeadTypeList} onClick={openTypeUl} className='head-of-list'>
                                        {typeList}
                                        <svg ref={refTypeArrow} className='list-arrow' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                                            <path fill="#000000"
                                                  d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"/>
                                        </svg>
                                    </div>
                                    <ul style={{zIndex: '10'}} ref={refTypeUl} className='header-list header-list-hidden'>
                                        {
                                            Object.values(LessonType).slice(1).map((item, index) => {
                                                return <ListElement select={selectTypeList} choose={typeList} key={index} name={item}/>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className='form-input-cont'>
                                <label className="checkbox style-e">
                                    <div className="checkbox__body">Общая пара</div>
                                    <input onChange={(e) => changeSecondCheck(e)} checked={checkSecond} type="checkbox"/>
                                    <div className="checkbox__checkmark"></div>
                                </label>
                            </div>
                            <div className='form-input-cont'>
                                <div className='input-text'>Кабинет</div>
                                <input type='text' value={name} className='input-form' onChange={(e) => changeName(e.target.value)}/>
                            </div>
                            <div className='error' ref={refError}>{error}</div>
                            <button onClick={sumbit} className='btn-form'>Добавить пару</button>
                        </form>
                    </div>
                </div>
            }

        </>
    );
};

export default OneTable;