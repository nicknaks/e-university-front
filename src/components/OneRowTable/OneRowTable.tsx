import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {changeExam, getOneSubjectsResult} from "../../store/actions/scheduleActions";
import {Class, LessonType, SubjectType} from "../../store/reducers/sheduleReducer/types";
import ChangeIsAbsent from "../changeIsAbsent/ChangeIsAbsent";
import ChangeMark from "../ChangeMark/ChangeMark";

interface OneRowTableProps {
    subId: string,
    studId: string,
    classes: Array<Class>,
    name: string,
    absent: boolean,
    changeChildMark: (mark) => void;
    mark: boolean,
    exam: boolean,
    checkFirst: boolean,
    checkSecond: boolean,
    checkThird: boolean,
    checkTotal: boolean,
    checkLek: boolean,
    checkSem: boolean,
    checkAllAbsent: (id, double) => void,
}

const OneRowTable: FC<OneRowTableProps> = ({changeChildMark, checkLek, checkSem, checkTotal, checkThird, checkFirst, checkSecond, exam, mark, checkAllAbsent, absent, name, classes, studId, subId}) => {
    const {subjectResults} = useAppSelector(state => state.schedule);
    const dispatch = useAppDispatch();

    const [oneClass, setOneClass] = useState([])
    const [module1, setModule1] = useState([]);
    const [module2, setModule2] = useState([]);
    const [module3, setModule3] = useState([]);
    const [subRes, setSubRes] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        dispatch(getOneSubjectsResult(studId, subId));
        if (classes.length !== 0) {
            setOneClass(classes.map((item) => {
                const block = item.studentProgress.filter((item) => {
                    if (item.studentID === studId) {
                        return item
                    }
                });

                return {
                    type: item.type,
                    id: item.id,
                    module: item.module,
                    block: block
                }
            }));
        }
    }, [])

    useEffect(() => {
        if (subjectResults.length !== 0) {
            setSubRes(subjectResults.filter((item) => {
                if (item.studentID === studId) {
                    return item
                }
            }))
        }
    }, [subjectResults])

    useEffect(() => {
        if (subRes[0] !== undefined) {
            setValue(subRes[0].examResult);
        }
    }, [subRes])

    useEffect(() => {
        if (module1.length === 0
            && module2.length === 0
            && module3.length === 0) {
            if (oneClass.length !== 0) {
                oneClass.forEach((item) => {
                    if (item.module === 1) {
                        setModule1(prevState => [...prevState, item])
                    }
                    if (item.module === 2) {
                        setModule2(prevState => [...prevState, item])
                    }
                    if (item.module === 3) {
                        setModule3(prevState => [...prevState, item])
                    }
                })
            }
        }
    }, [oneClass])

    useEffect(() => {
        if (!checkThird && !checkFirst && !checkSecond) {
            if (oneClass.length !== 0) {
                setModule2([])
                setModule1([])
                setModule3([])
                oneClass.forEach((item) => {
                    if (item.module === 1) {
                        setModule1(prevState => [...prevState, item])
                    }
                    if (item.module === 2) {
                        setModule2(prevState => [...prevState, item])
                    }
                    if (item.module === 3) {
                        setModule3(prevState => [...prevState, item])
                    }
                })
            }
        }

        if (checkFirst) {
            setModule2([])
            setModule3([])
        }
        if (checkSecond) {
            setModule1([])
            setModule3([])
        }
        if (checkThird) {
            setModule2([])
            setModule1([])
        }
        if (checkTotal) {
            setModule2([])
            setModule1([])
            setModule3([])
        }
        if (checkLek) {
            setModule2(oneClass.filter((item) => {
                if (LessonType[item.type] === 'лек' && item.module === 2) {
                    return item
                }
            }))
            setModule3(oneClass.filter((item) => {
                if (LessonType[item.type] === 'лек' && item.module === 3) {
                    return item
                }
            }))
            setModule1(oneClass.filter((item) => {
                if (LessonType[item.type] === 'лек' && item.module === 1) {

                    return item
                }
            }))

            return;
        }
        if (checkSem) {
            setModule2(oneClass.filter((item) => {
                if (LessonType[item.type] === 'сем' && item.module === 2) {
                    return item
                }
            }))
            setModule3(oneClass.filter((item) => {
                if (LessonType[item.type] === 'сем' && item.module === 3) {
                    return item
                }
            }))
            setModule1(oneClass.filter((item) => {
                if (LessonType[item.type] === 'сем' && item.module === 1) {
                    return item
                }
            }))

            return;
        }
    }, [checkThird, checkFirst, checkSecond, checkTotal, checkSem, checkLek])

    const changeValue = (value) => {
        if (value === '') {
            setValue('')

            return
        }

        if (!isNaN(Number(value)) && (Number(value) <= 30)) {
            setValue(value)
        }
    }

    const submit = () => {
        if (value === '' || Number(value) < 18) {
            setValue('0')
            return;
        }

        if (Number(value) === 0) {
            return
        }

        dispatch(changeExam(subRes[0].id, Number(value), subId))
    }

    const keySubmit = (e) => {
        if (e.code === 'Enter') {
            if (value === '' || Number(value) < 18) {
                setValue('0')
                return;
            }

            if (Number(value) === 0) {
                return
            }

            dispatch(changeExam(subRes[0].id, Number(value), subId))
        }
    }

    return (
        <tr className='grade-table-row'>
            <td className='grade-table-column-fio'>{name}</td>
            {
                module1.length !== 0 &&
                <>
                    {
                        module1.map((item) => {
                            return <>
                                {
                                    absent &&
                                        <ChangeIsAbsent key={item.id} sendUp={checkAllAbsent} item={item}/>
                                }
                                {
                                    mark &&
                                        <ChangeMark changeChildMark={changeChildMark} key={item.id} item={item}/>
                                }
                                {
                                    !mark && !absent &&
                                    <>
                                        {
                                            item.block[0].isAbsent
                                                ?
                                                <td style={{backgroundColor: 'lightgray'}} className='grade-table-column-type'>{item.block[0].mark}</td>

                                                :
                                                <td className='grade-table-column-type'>{item.block[0].mark}</td>
                                        }
                                    </>
                                }
                            </>
                        })
                    }
                </>
            }
            {
                subRes.length !== 0 &&
                <>
                    <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{subRes[0].firstModuleMark}</td>
                </>
            }
            {
                module2.length !== 0 &&
                <>
                    {
                        module2.map((item) => {
                            return <>
                                {
                                    absent &&
                                    <ChangeIsAbsent key={item.id} sendUp={checkAllAbsent} item={item}/>
                                }
                                {
                                    mark &&
                                    <ChangeMark changeChildMark={changeChildMark} key={item.id} item={item}/>
                                }
                                {
                                    !mark && !absent &&
                                    <>
                                        {
                                            item.block[0].isAbsent
                                                ?
                                                <td style={{backgroundColor: 'lightgray'}} className='grade-table-column-type'>{item.block[0].mark}</td>

                                                :
                                                <td className='grade-table-column-type'>{item.block[0].mark}</td>
                                        }
                                    </>
                                }
                            </>
                        })
                    }
                </>
            }
            {
                subRes.length !== 0 &&
                <>
                    <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{subRes[0].secondModuleMark}</td>
                </>
            }
            {
                module3.length !== 0 &&
                <>
                    {
                        module3.map((item) => {
                            return <>
                                {
                                    absent &&
                                    <ChangeIsAbsent key={item.id} sendUp={checkAllAbsent} item={item}/>
                                }
                                {
                                    mark &&
                                    <ChangeMark changeChildMark={changeChildMark} key={item.id} item={item}/>
                                }
                                {
                                    !mark && !absent &&
                                    <>
                                        {
                                            item.block[0].isAbsent
                                                ?
                                                <td style={{backgroundColor: 'lightgray'}} className='grade-table-column-type'>{item.block[0].mark}</td>

                                                :
                                                <td className='grade-table-column-type'>{item.block[0].mark}</td>
                                        }
                                    </>
                                }
                            </>
                        })
                    }
                </>
            }
            {
                subRes.length !== 0 &&
                <>
                    <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{subRes[0].thirdModuleMark}</td>
                </>
            }
            {
                subRes.length !== 0 &&
                <>
                    {
                        SubjectType[subjectResults[0].subject[0].type] === 'Экзамен' &&
                            <>
                                {
                                    exam
                                        ?
                                        <td className='grade-table-column-type'>
                                            <input onKeyDown={keySubmit} style={{fontSize: 18}} onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
                                        </td>
                                        :
                                        <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{subRes[0].examResult}</td>
                                }
                            </>
                    }
                </>
            }
            {
                subRes.length !== 0 &&
                <>
                    <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{subRes[0].mark}</td>
                </>
            }
            {
                subRes.length !== 0 &&
                <>
                    {
                        ((subRes[0].mark < 60) || (subRes[0].firstModuleMark < 18 || subRes[0].secondModuleMark < 18 || subRes[0].thirdModuleMark < 18)) &&
                            <>

                                {
                                    SubjectType[subjectResults[0].subject[0].type] === 'Экзамен'
                                        ?
                                        <td style={{fontWeight: 'bold', color: 'red', fontSize: 18}} className='grade-table-column-type'>2</td>
                                        :
                                        <td style={{fontWeight: 'bold', color: 'red'}} className='grade-table-column-type'>Незачет</td>
                                }
                            </>
                    }
                    {
                        (subRes[0].mark > 59 && subRes[0].mark < 71) && (subRes[0].firstModuleMark >= 18 && subRes[0].secondModuleMark >= 18 && subRes[0].thirdModuleMark >= 18) &&
                        <>
                            {
                                SubjectType[subRes[0].subject[0].type] === 'Экзамен'
                                    ?
                                    <td style={{fontWeight: 'bold', color: '#FFB74D', fontSize: 18}} className='grade-table-column-type'>3</td>
                                    :
                                    <td style={{fontWeight: 'bold', color: '#388E3C'}} className='grade-table-column-type'>Зачет</td>
                            }
                        </>
                    }
                    {
                        (subRes[0].mark > 70 && subRes[0].mark < 85) && (subRes[0].firstModuleMark >= 18 && subRes[0].secondModuleMark >= 18 && subRes[0].thirdModuleMark >= 18) &&
                        <>
                            {
                                SubjectType[subRes[0].subject[0].type] === 'Экзамен'
                                    ?
                                    <td style={{fontWeight: 'bold', color: '#7CB342', fontSize: 18}} className='grade-table-column-type'>4</td>
                                    :
                                    <td style={{fontWeight: 'bold', color: '#388E3C'}} className='grade-table-column-type'>Зачет</td>
                            }
                        </>
                    }
                    {
                        (subRes[0].mark > 84) && (subRes[0].firstModuleMark >= 18 && subRes[0].secondModuleMark >= 18 && subRes[0].thirdModuleMark >= 18) &&
                        <>
                            {
                                SubjectType[subRes[0].subject[0].type] === 'Экзамен'
                                    ?
                                    <td style={{fontWeight: 'bold', color: '#388E3C', fontSize: 18}} className='grade-table-column-type'>5</td>
                                    :
                                    <td style={{fontWeight: 'bold', color: '#388E3C'}} className='grade-table-column-type'>Зачет</td>
                            }
                        </>
                    }
                </>
            }

        </tr>
    );
};

export default OneRowTable;