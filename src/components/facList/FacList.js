import React, {useRef} from 'react';
import './facList.css'

const FacList = ({name, depList}) => {
    const refDep = useRef();
    const openList = () => {
        if (refDep.current === undefined) {
            return;
        }
        // eslint-disable-next-line no-unused-expressions
        if (refDep.current.classList.length === 1) {
            refDep.current.classList.add('dep-list-hidden');

            return;
        }

        refDep.current.classList.remove('dep-list-hidden');
    }

    return (
        <>
            <div className="list-container">
                <div onClick={openList} className="fac-name">{name}</div>
                {
                    depList !== null &&
                        <>
                            <div ref={refDep} className='dep-list dep-list-hidden'>
                            {
                                depList.map((item) => {
                                    return <div key={item.id}> {item.name} </div>
                                })
                            }
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default FacList;