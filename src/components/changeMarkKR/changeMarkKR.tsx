import React, {FC, useRef, useState} from 'react';


interface ChangeMarkProps {
    mark: any,
    firstText: string,
    module: number,
    srId: string,
    changeChildMark: (mark) => void
    changeChildComm: (text) => void
}

const ChangeMarkKR: FC<ChangeMarkProps> = ({firstText, changeChildComm, mark, module, srId, changeChildMark}) => {
    const [value, setValue] = useState(mark);
    const [text, setText] = useState(firstText === null? '' : firstText);
    const refText = useRef<HTMLDivElement>()
    const refName = useRef<HTMLDivElement>()

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
            setValue(mark !== 0? mark : '0')
            return;
        }

        changeChildMark({id: srId, mark: value, module: module, text: text})
    }

    const submitText = () => {
        if (text === '') {
            return
        }

        changeChildComm({id: srId, text: text, mark: value, module: module})
    }

    const openText = (e) => {
        if (e.target.classList[0] === 'help-div-edit' || e.target.classList[0] === 'comm-input-cont' || e.target.classList[0] === 'text-comm') {
            return
        }

        if (refName.current.textContent === 'Комментарий') {
            refName.current.textContent = 'Закрыть'
        } else {
            refName.current.textContent = 'Комментарий'
        }

        refText.current.classList.toggle('open-text')
    }

    const changeText = (value) => {
        setText(value)
    }

    return (
        <td className='grade-table-column-type'>
            <input onBlur={submit} className='mark-input' value={value} onChange={(e) => changeValue(e.target.value)} type="text"/>
            <div onClick={(e) => openText(e)} className='comm-cont'>
                <span ref={refName} className='add-comm'>Комментарий</span>
                <div className='help-div-edit'>
                    <div ref={refText} className='comm-input-cont'>
                        <input onBlur={submitText} placeholder='Оставить комментарий' value={text} onChange={(e) => changeText(e.target.value)} className='text-comm'></input>
                    </div>
                </div>
            </div>
        </td>
    );
};

export default ChangeMarkKR;