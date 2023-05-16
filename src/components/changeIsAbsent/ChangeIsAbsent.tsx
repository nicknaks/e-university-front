import React, {FC, useState} from 'react';

interface ChangeIsAbsentProps {
    item: any,
    sendUp: (id, double) => void,
}

const ChangeIsAbsent: FC<ChangeIsAbsentProps> = ({sendUp, item}) => {
    const [check, setCheck] = useState(item.block[0].isAbsent);

    const changeCheck = (value, prev, id) => {
        setCheck(value);

        if (value === prev) {
            sendUp(id, true)
        } else {
            sendUp({id, value}, false);
        }
    }

    return (
        item.block[0].isAbsent
            ?
            <td style={{backgroundColor: 'lightgray'}} className='grade-table-column-type'>
                <label className="checkbox style-c">
                    <input checked={check} onChange={(e) => changeCheck(e.target.checked, item.block[0].isAbsent, item.block[0].id)} type="checkbox"/>
                    <div className="checkbox__checkmark"></div>
                </label>
            </td>
            :
            <td className='grade-table-column-type'>
                <label className="checkbox style-c">
                    <input checked={check} onChange={(e) => changeCheck(e.target.checked, item.block[0].isAbsent, item.block[0].id)} type="checkbox"/>
                    <div className="checkbox__checkmark"></div>
                </label>
            </td>
    );
};

export default ChangeIsAbsent;