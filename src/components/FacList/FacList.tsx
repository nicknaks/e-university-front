import React, {FC, useRef} from 'react';
import {Link} from "react-router-dom";
import './facList.css'
import {translate} from "../../utils/translate";

interface FacListProps {
    name: string,
    number: string,
    depList: Array<any>
}

const FacList: FC<FacListProps> = ({number, name, depList}) => {
    const refDep = useRef<HTMLDivElement>();
    const refArrow = useRef<SVGSVGElement>();

    const openList = () => {
        if (refDep.current === undefined) {
            return;
        }

        if (refDep.current.classList.length === 1) {
            refDep.current.classList.add('dep-list-hidden');
            refArrow.current.classList.remove('fac-svg-down');

            return;
        }

        refDep.current.classList.remove('dep-list-hidden');
        refArrow.current.classList.add('fac-svg-down');
    }

    const clear = () => {
        localStorage.clear()
    }

    return (
        <>
            <div className="list-container">
                <div onClick={openList} className='hover-container'>
                    <div className="fac-name"><span className="fac-number">{number}</span>{" " + name}</div>
                    <svg ref={refArrow} className="fac-svg"  viewBox="0 0 18 16" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.227 1L16 8l-6.773 7" stroke="#1358be" strokeWidth="2"></path>
                        <path fill="#1358be" d="M0 6.939h15.326v1.98H0z" ></path>
                    </svg>
                </div>

                {
                    depList !== null &&
                        <>
                            <div ref={refDep} className='dep-list dep-list-hidden'>
                            {
                                depList.map((item) => {
                                    return <Link onClick={clear} to={'/groups' + `?fac=${translate[number]}` + `&dep=${translate[number] + +/\d+/.exec(item.number)}`} className='dep-name' key={item.id}> <span className='number-dec'>{item.number}</span> {' ' + item.name} </Link>
                                })
                            }
                            </div>
                        </>
                }
                {
                    number === 'ИУ' &&
                        <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/1/605909f4f2780.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'РКТ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/17/images/6319f60b837ae/contain_640x480.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'АК' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/18/images/60be9126dae2d/contain_640x480.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'РТ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/20/images/60be91ec5b8f2/contain_640x480.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'ОЭ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/20/images/60be91ec5b8f2/contain_640x480.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'ПС' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/19/images/610bb91c5807f/contain_640x480.png')`}} className='fac-img'></div>
                }
                {
                    number === 'ИСОТ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/25/6397437c0fd44.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'ИБМ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/2/60b4d34cdc9c7.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'МТ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/3/621e7f0c72e43.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'СМ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/4/610bbaf936084.png')`}} className='fac-img'></div>
                }
                {
                    number === 'БМТ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/5/605904a151443.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'РЛ' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/6/60e308abaa826.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'Э' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/7/609d3360f2c55.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'РК' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/8/60590510e3928.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'ФН' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/9/609d301e17219.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'Л' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/10/60b4d6dd91bf5.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'ЮР' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/11/604150a3997d1.jpg')`}} className='fac-img'></div>
                }
                {
                    number === 'СГН' &&
                    <div style={{backgroundImage: `url('https://api.www.bmstu.ru/upload/faculty/12/60b4cf104c747.jpg')`}} className='fac-img'></div>
                }
            </div>
        </>
    );
};

export default FacList;