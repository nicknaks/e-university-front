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
                            <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{tempSub[0].firstModuleMark}</td>
                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR module={2} srId={tempSub[0].id} mark={tempSub[0].secondModuleMark} changeChildMark={changeMarkChild} key={studId + 2}/>
                            :
                            <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{tempSub[0].secondModuleMark}</td>
                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR  module={3} srId={tempSub[0].id}mark={tempSub[0].thirdModuleMark} changeChildMark={changeMarkChild} key={studId + 3}/>
                            :
                            <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{tempSub[0].thirdModuleMark}</td>
                    }
                    {
                        edit
                            ?
                            <ChangeMarkKR module={4} srId={tempSub[0].id} mark={tempSub[0].examResult} changeChildMark={changeMarkChild} key={studId + 4}/>
                            :
                            <td style={{fontWeight: 'bold', fontSize: 18}} className='grade-table-column-type'>{tempSub[0].examResult}</td>
                    }
                </>
            }
        </tr>
    );
};

export default OneRowUnderKr;