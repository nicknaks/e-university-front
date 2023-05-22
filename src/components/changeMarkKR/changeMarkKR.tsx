import React, {FC, useState} from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";

interface ChangeMarkProps {
    mark: any,
    module: number,
    srId: string,
    changeChildMark: (mark) => void
}

const ChangeMarkKR: FC<ChangeMarkProps> = ({mark, module, srId, changeChildMark}) => {
    const [value, setValue] = useState(mark);
    const dispatch = useAppDispatch();

    const changeValue = (value) => {
        if (value === '') {
            setValue('')

            return
        }

        if ((!isNaN(Number(value)))) {
            setValue(value)
        }
    }

    const submit = () => {
        if (value === mark || value === '') {
            setValue('0')
            return;
        }

        if (Number(value) === 0) {
            return
        }

        changeChildMark({id: srId, mark: value, module: module})
    }

    return (
        <td className='grade-table-column-type'>
            <input onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
        </td>
    );
};

export default ChangeMarkKR;