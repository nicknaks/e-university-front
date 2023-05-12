import React, {FC, useEffect, useState} from 'react';
import {LessonType, Schedule} from "../../store/reducers/sheduleReducer/types";

interface OneTableProps {
    schedule: Array<Schedule>,
}

const OneTable: FC<OneTableProps> = ({schedule}) => {
    const [couple1, setCouple1] = useState([])
    const [couple2, setCouple2] = useState([])
    const [couple3, setCouple3] = useState([])
    const [couple4, setCouple4] = useState([])
    const [couple5, setCouple5] = useState([])
    const [couple6, setCouple6] = useState([])
    const [couple7, setCouple7] = useState([])

    useEffect(() => {
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
    }, [schedule])

    return (
        <table className='table-one'>
            <tbody>
                <tr className='table-row'>
                    <td style={{fontSize: 16, height: 40}} className='table-column-first'>Время</td>
                    <td style={{fontSize: 16, fontWeight: "bold", height: 40}} className='table-column-second'>ЧС</td>
                    <td style={{fontSize: 16, fontWeight: "bold", height: 40}} className='table-column-third'>ЗН</td>
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>
                        08:30 - 10:05
                    </td>
                    {
                        couple1.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple1[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple1[0].type]}</em> {couple1[0].name} {couple1[0].cabinet} {` `}
                                            {
                                                couple1[0].teacher !== undefined &&
                                                couple1[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple1.length === 1 &&
                                            <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple1[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple1[0].type]}</em> {couple1[0].name}  {couple1[0].cabinet} {` `}
                                            {
                                                couple1[0].teacher !== undefined &&
                                                couple1[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    couple1.length === 2 &&
                                        couple1[1].isDenominator &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple1[1].type]}</em> {couple1[1].name} {couple1[1].cabinet} {` `}
                                        {
                                            couple1[1].teacher !== undefined &&
                                            couple1[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple1[0].isNumerator && !couple1[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple1[0].type]}</em> {couple1[0].name} {couple1[0].cabinet} {` `}
                                        {
                                            couple1[0].teacher !== undefined &&
                                            couple1[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>
                        10:15 - 11:50
                    </td>
                    {
                        couple2.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple2[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple2[0].type]}</em> {couple2[0].name} {couple2[0].cabinet} {` `}
                                            {
                                                couple2[0].teacher !== undefined &&
                                                couple2[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple2.length === 1 &&
                                            <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple2[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple2[0].type]}</em> {couple2[0].name} {couple2[0].cabinet} {` `}
                                            {
                                                couple2[0].teacher !== undefined &&
                                                couple2[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    couple2.length === 2 &&
                                    couple2[1].isDenominator &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple2[1].type]}</em> {couple2[1].name} {couple2[1].cabinet} {` `}
                                        {
                                            couple2[1].teacher !== undefined &&
                                            couple2[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple2[0].isNumerator && !couple2[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple2[0].type]}</em> {couple2[0].name} {couple2[0].cabinet} {` `}
                                        {
                                            couple2[0].teacher !== undefined &&
                                            couple2[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>12:00 - 13:35</td>
                    {
                        couple3.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple3[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple3[0].type]}</em> {couple3[0].name} {couple3[0].cabinet} {` `}
                                            {
                                                couple3[0].teacher !== undefined &&
                                                couple3[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple3.length === 1 &&
                                            <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple3[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple3[0].type]}</em> {couple3[0].name}  {couple3[0].cabinet} {` `}
                                            {
                                                couple3[0].teacher !== undefined &&
                                                couple3[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    couple3.length === 2 &&
                                    couple3[1].isDenominator &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple3[1].type]}</em> {couple3[1].name}  {couple3[1].cabinet} {` `}
                                        {
                                            couple3[1].teacher !== undefined &&
                                            couple3[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple3[0].isNumerator && !couple3[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple3[0].type]}</em> {couple3[0].name} {couple3[0].cabinet} {` `}
                                        {
                                            couple3[0].teacher !== undefined &&
                                            couple3[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>13:50 - 15:25</td>
                    {
                        couple4.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple4[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple4[0].type]}</em> {couple4[0].name} {couple4[0].cabinet} {` `}
                                            {
                                                couple4[0].teacher !== undefined &&
                                                couple4[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple4.length === 1 &&
                                            <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple4[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple4[0].type]}</em> {couple4[0].name} {couple4[0].cabinet} {` `}
                                            {
                                                couple4[0].teacher !== undefined &&
                                                couple4[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    couple4.length === 2 &&
                                    couple4[1].isDenominator &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple4[1].type]}</em> {couple4[1].name} {couple4[1].cabinet} {` `}
                                        {
                                            couple4[1].teacher !== undefined &&
                                            couple4[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple4[0].isNumerator && !couple4[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple4[0].type]}</em> {couple4[0].name} {couple4[0].cabinet} {` `}
                                        {
                                            couple4[0].teacher !== undefined &&
                                            couple4[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>15:40 - 17:15</td>
                    {
                        couple5.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple5[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple5[0].type]}</em> {couple5[0].name} {couple5[0].cabinet} {` `}
                                            {
                                                couple5[0].teacher !== undefined &&
                                                couple5[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple5.length === 1 &&
                                                <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple5[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple5[0].type]}</em> {couple5[0].name} {couple5[0].cabinet} {` `}
                                            {
                                                couple5[0].teacher !== undefined &&
                                                couple5[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    (couple5.length === 2 && couple5[1].isDenominator) &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple5[1].type]}</em> {couple5[1].name} {couple5[1].cabinet} {` `}
                                        {
                                            couple5[1].teacher !== undefined &&
                                            couple5[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple5[0].isNumerator && !couple5[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple5[0].type]}</em> {couple5[0].name} {couple5[0].cabinet} {` `}
                                        {
                                            couple5[0].teacher !== undefined &&
                                            couple5[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>17:25 - 19:00</td>
                    {
                        couple6.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple6[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple6[0].type]}</em> {couple6[0].name} {couple6[0].cabinet} {` `}
                                            {
                                                couple6[0].teacher !== undefined &&
                                                couple6[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple6.length === 1 &&
                                            <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple6[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple6[0].type]}</em> {couple6[0].name} {couple6[0].cabinet} {` `}
                                            {
                                                couple6[0].teacher !== undefined &&
                                                couple6[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    couple6.length === 2 &&
                                    couple6[1].isDenominator &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple6[1].type]}</em> {couple6[1].name} {couple6[1].cabinet} {` `}
                                        {
                                            couple6[1].teacher !== undefined &&
                                            couple6[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple6[0].isNumerator && !couple6[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple6[0].type]}</em> {couple6[0].name} {couple6[0].cabinet} {` `}
                                        {
                                            couple6[0].teacher !== undefined &&
                                            couple6[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
                <tr className='table-row'>
                    <td className='table-column-first'>19:10 - 20:45</td>
                    {
                        couple7.length === 0 ?
                            <>
                                <td className='table-column-second'></td>
                                <td className='table-column-third'></td>
                            </>
                            :
                            <>
                                {
                                    couple7[0].isNumerator &&
                                    <>
                                        <td className='table-column-second'>
                                            <em>{LessonType[couple7[0].type]}</em> {couple7[0].name} {couple7[0].cabinet} {` `}
                                            {
                                                couple7[0].teacher !== undefined &&
                                                couple7[0].teacher.name
                                            }
                                        </td>
                                        {
                                            couple7.length === 1 &&
                                            <td className='table-column-third'></td>
                                        }
                                    </>
                                }
                                {
                                    couple7[0].isDenominator &&
                                    <>
                                        <td className='table-column-second'></td>
                                        <td className='table-column-third'>
                                            <em>{LessonType[couple7[0].type]}</em> {couple7[0].name} {couple7[0].cabinet} {` `}
                                            {
                                                couple7[0].teacher !== undefined &&
                                                couple7[0].teacher.name
                                            }
                                        </td>
                                    </>
                                }
                                {
                                    couple7.length === 2 &&
                                    couple7[1].isDenominator &&
                                    <td className='table-column-third'>
                                        <em>{LessonType[couple7[1].type]}</em> {couple7[1].name} {couple7[1].cabinet} {` `}
                                        {
                                            couple7[1].teacher !== undefined &&
                                            couple7[1].teacher.name
                                        }
                                    </td>
                                }
                                {
                                    !couple7[0].isNumerator && !couple7[0].isDenominator &&
                                    <td colSpan={2} className='table-column-comon'>
                                        <em>{LessonType[couple7[0].type]}</em> {couple7[0].name} {couple7[0].cabinet} {` `}
                                        {
                                            couple7[0].teacher !== undefined &&
                                            couple7[0].teacher.name
                                        }
                                    </td>
                                }
                            </>
                    }
                </tr>
            </tbody>
        </table>
    );
};

export default OneTable;