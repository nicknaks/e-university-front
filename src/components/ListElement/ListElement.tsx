import React, {FC} from 'react';
import './listElement.css'

interface ListElementProps {
    name: string,
    choose?: string,
    id?: string,
    number?: string,
    select?:  (e, id) => void,
}

const ListElement: FC<ListElementProps> = ({choose, number, id, select, name}) => {
    return (
        number !== undefined
            ?
            <>
                {
                    select !== undefined
                        ?
                        <>
                            {
                                choose === number + ' ' + name
                                    ?
                                    <li onClick={(e) => select(e, id)} className='list-element list-element-select'>
                                        <div style={{marginBottom: 0}} className="fac-in-list">
                                            {
                                                number !== '' &&
                                                <div className="fac-number-list">{number}</div>
                                            }
                                            {
                                                name === 'Сначала нужно выбрать факультет'
                                                    ?
                                                    <div style={{color: 'grey', fontWeight: 'lighter'}} className='fac-name-list'>{name}</div>
                                                    :
                                                    <div className='fac-name-list'>{" " + name}</div>
                                            }

                                        </div>
                                    </li>
                                    :
                                    <li onClick={(e) => select(e, id)} className='list-element'>
                                        <div style={{marginBottom: 0}} className="fac-in-list">
                                            {
                                                number !== '' &&
                                                <div className="fac-number-list">{number}</div>
                                            }
                                            {
                                                name === 'Сначала нужно выбрать факультет'
                                                    ?
                                                    <div style={{color: 'grey', fontWeight: 'lighter'}} className='fac-name-list'>{name}</div>
                                                    :
                                                    <div className='fac-name-list'>{" " + name}</div>
                                            }

                                        </div>
                                    </li>
                            }
                        </>
                        :
                        <li style={{cursor: 'default'}} className='list-element'>
                            <div style={{marginBottom: 0}} className="fac-in-list">
                                {
                                    number !== '' &&
                                    <div className="fac-number-list">{number}</div>
                                }
                                {
                                    name === 'Сначала нужно выбрать факультет'
                                        ?
                                        <div style={{color: 'grey', fontWeight: 'lighter'}} className='fac-name-list'>{name}</div>
                                        :
                                        <div className='fac-name-list'>{" " + name}</div>
                                }

                            </div>
                        </li>

                }
                </>
            :
            <>
                {
                    choose === name
                        ?
                        <li onClick={(e) => select(e, id)} className='list-element list-element-select'>
                            <div style={{marginBottom: 0}} className="fac-in-list">
                                {
                                    <div className='fac-name-list'>{name}</div>
                                }
                            </div>
                        </li>
                        :
                        <li onClick={(e) => select(e, id)} className='list-element'>
                            <div style={{marginBottom: 0}} className="fac-in-list">
                                {
                                    <div className='fac-name-list'>{name}</div>
                                }
                            </div>
                        </li>
                }
            </>
    );
};

export default ListElement;