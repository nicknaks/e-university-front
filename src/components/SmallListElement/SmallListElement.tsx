import React, {FC} from 'react';
import '../ListElement/listElement.css'

interface ListElementProps {
    name: string,
    choose?: string,
    id?: string,
    number?: string,
    select?: (e, id) => void,
}

const ListElement: FC<ListElementProps> = ({choose, number, id, select, name}) => {
    return (
            choose === name
                ?
                <li style={{paddingLeft: 7}} onClick={(e) => select(e, id)} className='list-element list-element-select'>
                    <div style={{marginBottom: 0, fontSize: 12}} className="fac-in-list">
                        {
                            <div className='fac-name-list'>{name}</div>
                        }
                    </div>
                </li>
                :
                <li style={{paddingLeft: 7}} onClick={(e) => select(e, id)} className='list-element'>
                    <div style={{marginBottom: 0, fontSize: 12}} className="fac-in-list">
                        {
                            <div className='fac-name-list'>{name}</div>
                        }
                    </div>
                </li>
    );
};

export default ListElement;