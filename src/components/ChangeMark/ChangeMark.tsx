import React, {FC, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {changeMark} from "../../store/actions/scheduleActions";

interface ChangeMarkProps {
    item: any,
    subId: string,
}

const ChangeMark: FC<ChangeMarkProps> = ({item, subId}) => {
    const [value, setValue] = useState(item.block[0].mark);
    const dispatch = useAppDispatch();

    const changeValue = (value) => {
        if (value === '') {
            setValue('')

            return
        }

        if (!isNaN(Number(value))) {
            setValue(value)
        }
    }

    const submit = () => {
        if (value !== '') {
            dispatch(changeMark(item.block[0].id, Number(value), subId))
        }
    }

    return (
        <td className='grade-table-column-type'>
            <input onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
        </td>
    );
};

export default ChangeMark;