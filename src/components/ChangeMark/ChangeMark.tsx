import React, {FC, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";

interface ChangeMarkProps {
    item: any,
    changeChildMark: (mark) => void
}

const ChangeMark: FC<ChangeMarkProps> = ({item, changeChildMark}) => {
    const [value, setValue] = useState(item.block[0].mark);
    const dispatch = useAppDispatch();

    const changeValue = (value) => {
        if (value === '') {
            setValue('')

            return
        }

        if (value.replace(/\D/g,'')) {
            setValue(value)
        }
    }

    const submit = () => {
        if (value === item.block[0].mark || value === '') {
            setValue('0')
            return;
        }

        if (Number(value) === 0) {
            return
        }

        changeChildMark({id: item.block[0].id, value})
    }

    const keySubmit = (e) => {
        if (e.code === 'Enter') {
            if (value === item.block[0].mark || value === '') {
                setValue('0')
                return;
            }

            if (Number(value) === 0) {
                return
            }

            changeChildMark({id: item.block[0].id, value})
        }
    }

    return (
        item.block[0].isAbsent
            ?
            <td style={{backgroundColor: 'lightgray'}} className='grade-table-column-type'>
                <input onKeyDown={keySubmit} onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
            </td>
            :
            <td className='grade-table-column-type'>
                <input onKeyDown={keySubmit} onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
            </td>
    );
};

export default ChangeMark;