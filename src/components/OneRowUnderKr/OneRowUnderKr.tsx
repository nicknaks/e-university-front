import React, {FC, useEffect, useState} from 'react';
import {useAppSelector} from "../../hooks/useAppSelector";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import ChangeMarkKR from "../changeMarkKR/changeMarkKR";
import {SubjectType} from "../../store/reducers/sheduleReducer/types";

interface OneRowUnderKrProps {
    name: string,
    studId: string,
    edit: boolean,
    changeMarkChild: (mark) => void
    changeMarkComm: (text) => void
}

const OneRowUnderKr: FC<OneRowUnderKrProps> = ({changeMarkComm, changeMarkChild, edit, name, studId}) => {
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
                            <ChangeMarkKR firstText={tempSub[0].firstModuleMarkComment} changeChildComm={changeMarkComm} module={1} srId={tempSub[0].id} mark={tempSub[0].firstModuleMark} changeChildMark={changeMarkChild} key={studId + 1}/>
                            :
                            <>
                                <td className='grade-table-column-type'>
                                    {tempSub[0].firstModuleMark}
                                    {
                                        tempSub[0].firstModuleMarkComment !== null &&
                                        <>
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
                                                        {tempSub[0].firstModuleMarkComment}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </td>
                            </>
                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR firstText={tempSub[0].secondModuleMarkComment} changeChildComm={changeMarkComm} module={2} srId={tempSub[0].id} mark={tempSub[0].secondModuleMark} changeChildMark={changeMarkChild} key={studId + 2}/>
                            :
                            <>
                                <td className='grade-table-column-type'>{tempSub[0].secondModuleMark}
                                    {
                                        tempSub[0].secondModuleMarkComment !== null &&
                                        <>
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
                                                        {tempSub[0].secondModuleMarkComment}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </td>
                            </>

                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR firstText={tempSub[0].thirdModuleMarkComment} changeChildComm={changeMarkComm} module={3} srId={tempSub[0].id} mark={tempSub[0].thirdModuleMark} changeChildMark={changeMarkChild} key={studId + 3}/>
                            :
                            <td className='grade-table-column-type'>{tempSub[0].thirdModuleMark}
                                {
                                tempSub[0].thirdModuleMarkComment !== null &&
                                <>
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
                                                {tempSub[0].thirdModuleMarkComment}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }</td>
                    }
                    {
                        edit
                            ?
                            <>
                                <ChangeMarkKR firstText={tempSub[0].examResultComment} changeChildComm={changeMarkComm} module={4} srId={tempSub[0].id} mark={tempSub[0].examResult} changeChildMark={changeMarkChild} key={studId + 4}/>
                            </>
                            :
                            <td className='grade-table-column-type'>{tempSub[0].examResult}
                                {
                                    tempSub[0].examResultComment !== null &&
                                    <>
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
                                                    {tempSub[0].examResultComment}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </td>
                    }
                    {
                        (tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult < 60) &&
                        <td style={{fontWeight: 'bold', color: 'red', fontSize: 18}} className='grade-table-column-type'>2</td>
                    }
                    {
                        (tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult >= 60) && (tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult < 71) &&
                        <td style={{fontWeight: 'bold', color: '#FFB74D', fontSize: 18}} className='grade-table-column-type'>3</td>
                    }
                    {
                        (tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult >= 71) && (tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult <= 84) &&
                        <td style={{fontWeight: 'bold', color: '#7CB342', fontSize: 18}} className='grade-table-column-type'>4</td>
                    }
                    {
                        (tempSub[0].firstModuleMark + tempSub[0].secondModuleMark + tempSub[0].thirdModuleMark + tempSub[0].examResult > 84) &&
                            <td style={{fontWeight: 'bold', color: '#388E3C', fontSize: 18}} className='grade-table-column-type'>5</td>
                    }
                </>
            }
        </tr>
    );
};

export default OneRowUnderKr;