import React, {FC, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";

interface ChangeMarkProps {
    item: any,
    changeChild: (name) => void,
}

const ChangeName: FC<ChangeMarkProps> = ({changeChild, item}) => {
    const [value, setValue] = useState(item.name? item.name : '');
    const dispatch = useAppDispatch();

    const changeValue = (value) => {
        setValue(value)
    }

    const submit = () => {
        if (value === item.name || value === '' || value === null) {
            return;
        }

        changeChild({value, id: item.id});
    }

    const keySubmit = (e) => {
        if (e.code === 'Enter') {
            if (value === item.name || value === '' || value === null) {
                return;
            }

            changeChild({value, id: item.id});
        }
    }

    return (
            <td className='grade-table-column-type'>
                <input style={{width: 77}} onKeyDown={keySubmit} placeholder='Название' onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
            </td>
    );
};

export default ChangeName;