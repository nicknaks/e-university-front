import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import ChangeMarkKR from "../changeMarkKR/changeMarkKR";

interface OneRowUnderKrProps {
    name: string,
    studId: string,
    edit: boolean,
    changeMarkChild: (mark) => void
}

const OneRowUnderKr: FC<OneRowUnderKrProps> = ({changeMarkChild, edit, name, studId}) => {
    const {subjectResults} = useAppSelector(state => state.schedule);
    const dispatch = useAppDispatch();
    const [tempSub, setTempSub] = useState([]);

    useEffect(() => {
        if (subjectResults.length !== 0) {
            setTempSub(subjectResults.filter((item) => {
                if (item.studentID === studId) {
                    return item
                }
            }))
        }
    }, [subjectResults])

    return (
        <tr className='grade-table-row'>
            <td className='grade-table-column-fio'>{name}</td>
            {
                tempSub.length !== 0 &&
                <>
                    {
                        edit
                            ?
                            <ChangeMarkKR module={1} srId={tempSub[0].id} mark={tempSub[0].firstModuleMark} changeChildMark={changeMarkChild} key={studId + 1}/>
                            :
                            <>
                                <td className='grade-table-column-type'>
                                    {tempSub[0].firstModuleMark}
                                    <p></p>
                                    <div className='comm-cont'>
                                        Комментарий
                                        <div className='help-div'>
                                            <svg  className="comm-open" viewBox="0 0 18 16" fill="none"
                                                  xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.227 1L16 8l-6.773 7" stroke="black" strokeWidth="2"></path>
                                                <path fill="black" d="M0 6.939h15.326v1.98H0z"></path>
                                            </svg>
                                            <div className='comm-input-cont'>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </>
                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR module={2} srId={tempSub[0].id} mark={tempSub[0].secondModuleMark} changeChildMark={changeMarkChild} key={studId + 2}/>
                            :
                            <>
                                <td className='grade-table-column-type'>{tempSub[0].secondModuleMark}<p></p>
                                    <div className='comm-cont'>
                                        Комментарий
                                        <div className='help-div'>
                                            <svg  className="comm-open" viewBox="0 0 18 16" fill="none"
                                                  xmlns="http://www.w3.org/2000/svg">
                                                <path d="M9.227 1L16 8l-6.773 7" stroke="black" strokeWidth="2"></path>
                                                <path fill="black" d="M0 6.939h15.326v1.98H0z"></path>
                                            </svg>
                                            <div className='comm-input-cont'>
                                            </div>
                                        </div>
                                    </div></td>
                            </>

                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR  module={3} srId={tempSub[0].id}mark={tempSub[0].thirdModuleMark} changeChildMark={changeMarkChild} key={studId + 3}/>
                            :
                            <td className='grade-table-column-type'>{tempSub[0].thirdModuleMark}<p></p>
                                <div className='comm-cont'>
                                    Комментарий
                                    <div className='help-div'>
                                        <svg  className="comm-open" viewBox="0 0 18 16" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.227 1L16 8l-6.773 7" stroke="black" strokeWidth="2"></path>
                                            <path fill="black" d="M0 6.939h15.326v1.98H0z"></path>
                                        </svg>
                                        <div className='comm-input-cont'>
                                        </div>
                                    </div>
                                </div></td>
                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR module={4} srId={tempSub[0].id} mark={tempSub[0].examResult} changeChildMark={changeMarkChild} key={studId + 4}/>
                            :
                            <td className='grade-table-column-type'>{tempSub[0].examResult}<p></p>
                                <div className='comm-cont'>
                                    Комментарий
                                    <div className='help-div'>
                                        <svg  className="comm-open" viewBox="0 0 18 16" fill="none"
                                              xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.227 1L16 8l-6.773 7" stroke="black" strokeWidth="2"></path>
                                            <path fill="black" d="M0 6.939h15.326v1.98H0z"></path>
                                        </svg>
                                        <div className='comm-input-cont'>
                                        </div>
                                    </div>
                                </div></td>
                    }
                    {
                            <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult}</td>
                    }
                </>
            }
        </tr>
    );
};

export default OneRowUnderKr;