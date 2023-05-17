import React, {FC, useEffect, useState} from 'react';
import ChangeIsAbsent from "../../components/changeIsAbsent/ChangeIsAbsent";
import ChangeMark from "../../components/ChangeMark/ChangeMark";
import {SubjectType} from "../../store/reducers/sheduleReducer/types";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {changeExam, changeTotal, getOneSubjectsResult, getSubjectsResult} from "../../store/actions/scheduleActions";

interface OneRowKRProps {
   studId: string,
    subId: string,
    name: string,
    edit: boolean,
    changeChild: (mark) => void
    changeChildBool: (bool) => void
}

const OneRowKr: FC<OneRowKRProps> = ({changeChildBool, changeChild, edit, name, studId, subId}) => {
    const {subjectResults} = useAppSelector(state => state.schedule);
    const dispatch = useAppDispatch();
    const [tempSub, setTempSub] = useState([]);
    const [value, setValue] = useState('0')

    useEffect(() => {
        dispatch(getOneSubjectsResult(1, subId))
    }, [])

    useEffect(() => {
        if (subjectResults.length !== 0) {
            setTempSub(subjectResults.filter((item) => {
                if (item.studentID === studId) {
                    return item
                }
            }))
        }
    }, [subjectResults])

    useEffect(() => {
        if (tempSub.length !== 0) {
            setValue(tempSub[0].mark)
        }
    }, [tempSub])

    const changeValue = (value) => {
        if (value === '') {
            setValue('')

            return
        }

        if (!isNaN(Number(value)) && (Number(value) <= 5)) {
            setValue(value)
        }
    }

    const submit = () => {
        if (value === tempSub[0].mark || value === '' || Number(value) < 2) {
            setValue('0')
            return;
        }

        if (Number(value) === 0) {
            return
        }

        changeChild({id: tempSub[0].id, mark: Number(value)})
    }

    const keySubmit = (e) => {
        if (e.code === 'Enter') {
            if (value === tempSub[0].mark || value === '' || Number(value) < 2) {
                setValue('0')
                return;
            }

            if (Number(value) === 0) {
                return
            }

            changeChild({id: tempSub[0].id, mark: Number(value)})
        }
    }

    const clickBar = (e) => {
        if (!edit || e.target.classList[0] === 'grade-table-column-fio' || e.target.classList[0] === 'grade-table-column-type' || e.target.classList[0] === 'mark-input') {
            return
        }

        if (e.target.classList[0] === 'kr-table-elem') {
            if (e.target.childNodes[0].classList[0] === 'first-progressbar-cont' && e.target.childNodes[0].classList.length !== 2) {
                e.target.childNodes[0].classList.add('add');
                changeChildBool({id: tempSub[0].id, place: 1})
            }
            if (e.target.childNodes[0].classList[0] === 'second-progressbar-cont' && e.target.childNodes[0].classList.length !== 2) {
                e.target.childNodes[0].classList.add('add');
                changeChildBool({id: tempSub[0].id, place: 2})
            }
            if (e.target.childNodes[0].classList[0] === 'third-progressbar-cont' && e.target.childNodes[0].classList.length !== 2) {
                e.target.childNodes[0].classList.add('add');
                changeChildBool({id: tempSub[0].id, place: 3})
            }
        }

        if (e.target.classList[0] === 'first-progressbar-cont' && e.target.classList.length !== 2) {
            e.target.classList.add('add');
            changeChildBool({id: tempSub[0].id, place: 1})
        }
        if (e.target.classList[0] === 'second-progressbar-cont' && e.target.classList.length !== 2) {
            e.target.classList.add('add');
            changeChildBool({id: tempSub[0].id, place: 2})
        }
        if (e.target.classList[0] === 'third-progressbar-cont' && e.target.classList.length !== 2) {
            e.target.classList.add('add');
            changeChildBool({id: tempSub[0].id, place: 3})

        }
    }

    return (
        <tr onClick={(e) => clickBar(e)} className='grade-table-row'>
            <td className='grade-table-column-fio'>{name}</td>
            {
                tempSub.length !== 0 &&
                <>
                    {
                        tempSub[0].firstModuleMark > 0
                            ?
                                <td className='kr-table-elem'>
                                    <div className='first-progressbar-cont'>
                                        <div className='progressbar'></div>
                                    </div>
                                </td>
                            :
                            edit
                                ?
                                <td className='kr-table-elem choose-table'>
                                    <div className='first-progressbar-cont'>
                                    </div>
                                </td>
                                :
                                <td className='kr-table-elem'>
                                    <div className='first-progressbar-cont'>
                                    </div>
                                </td>
                    }

                    {
                        tempSub[0].secondModuleMark > 0
                            ?
                            <td style={{padding: '5px 0 5px 0'}} className='kr-table-elem'>
                                <div className='second-progressbar-cont'>
                                    <div className='progressbar'></div>
                                </div>
                            </td>
                            :
                            edit
                                ?
                                <td style={{padding: '5px 0 5px 0'}} className='kr-table-elem choose-table'>
                                    <div className='second-progressbar-cont'>
                                    </div>
                                </td>
                                :
                                <td style={{padding: '5px 0 5px 0'}} className='kr-table-elem'>
                                    <div className='second-progressbar-cont'>
                                    </div>
                                </td>
                    }

                    {
                        tempSub[0].thirdModuleMark > 0
                            ?
                            <td style={{padding: '5px 15px 5px 0'}} className='kr-table-elem'>
                                <div className='third-progressbar-cont'>
                                    <div className='progressbar'></div>
                                </div>
                            </td>
                            :
                            edit
                                ?
                                <td style={{padding: '5px 15px 5px 0'}} className='kr-table-elem choose-table'>
                                    <div className='third-progressbar-cont'>
                                    </div>
                                </td>
                                :
                                <td style={{padding: '5px 15px 5px 0'}} className='kr-table-elem'>
                                    <div className='third-progressbar-cont'>
                                    </div>
                                </td>
                    }
                    {
                        edit
                            ?
                            <td className='grade-table-column-type'>
                                <input onKeyDown={keySubmit} style={{fontSize: 18}} onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
                            </td>
                            :
                            <td style={{fontSize: 18}} className='grade-table-column-type'>{tempSub[0].mark}</td>
                    }
                </>
            }
        </tr>
    );
};

export default OneRowKr;