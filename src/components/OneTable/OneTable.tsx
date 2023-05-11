import React, {FC, useEffect, useState} from 'react';
import {LessonType, Schedule} from "../../store/reducers/sheduleReducer/types";

interface OneTableProps {
    schedule: Array<Schedule>,
}

const OneTable: FC<OneTableProps> = ({schedule}) => {
    const [couple1, setCouple1] = useState({} as Schedule)
    const [couple2, setCouple2] = useState({} as Schedule)
    const [couple3, setCouple3] = useState({} as Schedule)
    const [couple4, setCouple4] = useState({} as Schedule)
    const [couple5, setCouple5] = useState({} as Schedule)
    const [couple6, setCouple6] = useState({} as Schedule)
    const [couple7, setCouple7] = useState({} as Schedule)

    useEffect(() => {
        schedule.forEach((item) => {
            if (item.couple === 1) {
                setCouple1(item)
            }
            if (item.couple === 2) {
                setCouple2(item)
            }
            if (item.couple === 3) {
                setCouple3(item)
            }
            if (item.couple === 4) {
                setCouple4(item)
            }
            if (item.couple === 5) {
                setCouple5(item)
            }
            if (item.couple === 6) {
                setCouple6(item)
            }
            if (item.couple === 7) {
                setCouple7(item)
            }
        })
    }, [schedule])


    return (
        <table className='table-one'>
            <tbody>
                <tr className='table-row'>
                    <td className='table-column-first'>Время</td>
                    <td className='table-column-second'>ЧС</td>
                    <td className='table-column-third'>ЗН</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>
                        08:30 - 10:05
                    </td>
                    {
                        Object.keys(couple1).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple1.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple1.type]}) {couple1.name} {couple1.cabinet}
                                        {
                                            couple1.teacher !== undefined &&
                                            couple1.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple1.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple1.type]}) {couple1.name} {couple1.cabinet}
                                        {
                                            couple1.teacher !== undefined &&
                                            couple1.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple1.type]}) {couple1.name} {couple1.cabinet}
                                    {
                                        couple1.teacher !== undefined &&
                                        couple1.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>
                        10:15 - 11:50
                    </td>
                    {
                        Object.keys(couple2).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple2.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple2.type]}) {couple2.name} {couple2.cabinet}
                                        {
                                            couple2.teacher !== undefined &&
                                            couple2.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple2.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple2.type]}) {couple2.name} {couple2.cabinet}
                                        {
                                            couple2.teacher !== undefined &&
                                            couple2.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple2.type]}) {couple2.name} {couple2.cabinet}
                                    {
                                        couple2.teacher !== undefined &&
                                        couple2.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>12:00 - 13:35</td>
                    {
                        Object.keys(couple3).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple3.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple3.type]}) {couple3.name} {couple3.cabinet}
                                        {
                                            couple3.teacher !== undefined &&
                                            couple3.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple3.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple3.type]}) {couple3.name} {couple3.cabinet}
                                        {
                                            couple3.teacher !== undefined &&
                                            couple3.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple3.type]}) {couple3.name} {couple3.cabinet}
                                    {
                                        couple3.teacher !== undefined &&
                                        couple3.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>13:50 - 15:25</td>
                    {
                        Object.keys(couple4).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple4.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple4.type]}) {couple4.name} {couple4.cabinet}
                                        {
                                            couple4.teacher !== undefined &&
                                            couple4.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple4.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple4.type]}) {couple4.name} {couple4.cabinet}
                                        {
                                            couple4.teacher !== undefined &&
                                            couple4.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple4.type]}) {couple4.name} {couple4.cabinet}
                                    {
                                        couple4.teacher !== undefined &&
                                        couple4.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>15:40 - 17:15</td>
                    {
                        Object.keys(couple5).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple5.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple5.type]}) {couple5.name} {couple5.cabinet}
                                        {
                                            couple5.teacher !== undefined &&
                                            couple5.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple5.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple5.type]}) {couple5.name} {couple5.cabinet}
                                        {
                                            couple5.teacher !== undefined &&
                                            couple5.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple5.type]}) {couple5.name} {couple5.cabinet}
                                    {
                                        couple5.teacher !== undefined &&
                                        couple5.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>17:25 - 19:00</td>
                    {
                        Object.keys(couple6).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple6.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple6.type]}) {couple6.name} {couple6.cabinet}
                                        {
                                            couple6.teacher !== undefined &&
                                            couple6.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple6.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple1.type]}) {couple6.name} {couple6.cabinet}
                                        {
                                            couple6.teacher !== undefined &&
                                            couple6.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple6.type]}) {couple6.name} {couple6.cabinet}
                                    {
                                        couple6.teacher !== undefined &&
                                        couple6.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>19:10 - 20:45</td>
                    {
                        Object.keys(couple7).length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple7.isNumerator &&
                                    <td className='table-column-second'>
                                        ({LessonType[couple7.type]}) {couple7.name} {couple7.cabinet}
                                        {
                                            couple7.teacher !== undefined &&
                                            couple7.teacher.name
                                        }
                                    </td>
                                }
                                {
                                    couple7.isDenominator &&
                                    <td className='table-column-third'>
                                        ({LessonType[couple7.type]}) {couple7.name} {couple7.cabinet}
                                        {
                                            couple7.teacher !== undefined &&
                                            couple7.teacher.name
                                        }
                                    </td>
                                }
                                <td colSpan={2} className='table-column-comon'>
                                    ({LessonType[couple7.type]}) {couple7.name} {couple7.cabinet}
                                    {
                                        couple7.teacher !== undefined &&
                                        couple7.teacher.name
                                    }
                                </td>
                            </>
                    }
                </tr>
            </tbody>
        </table>
    );
};

export default OneTable;