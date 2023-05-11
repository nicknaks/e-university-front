import React, {FC, useEffect, useRef, useState} from 'react';
import './navbar.css'
import {useLocation, Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {isLogin, loginAction, logoutAction} from "../../store/actions/authActions";
import {useAppSelector} from "../../hooks/useAppSelector";
import {log} from "util";

const Navbar: FC = () => {
    const refFirst = useRef<HTMLAnchorElement>();
    const refSecond = useRef<HTMLAnchorElement>();
    const refPopUp = useRef<HTMLDivElement>()
    const refPopUpBody = useRef<HTMLDivElement>();
    const refError = useRef<HTMLDivElement>();

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [auth, setAuth] = useState(false);

    const loc = useLocation();

    const dispatch = useAppDispatch();
    const {me} = useAppSelector(state => state.auth)

    useEffect(() => {
        if (loc.pathname === '/groups') {
            refFirst.current.classList.add('navbar-link-active');
            refSecond.current.classList.remove('navbar-link-active');

            return;
        }

        refFirst.current.classList.remove('navbar-link-active');
        refSecond.current.classList.remove('navbar-link-active');
    }, [loc.pathname])

    useEffect(() => {
        dispatch(isLogin())
    }, [])

    const openPopUp = (e) => {
        document.body.style.overflowY = 'hidden';
        e.preventDefault();

        refPopUp.current.classList.add('popUp-container-active');
        refPopUpBody.current.classList.add('popUp-active');
    }

    const closePopUp = (e) => {
        document.body.style.overflowY = 'visible';
        e.preventDefault();

        refPopUp.current.classList.remove('popUp-container-active');
        refPopUpBody.current.classList.remove('popUp-active');
    }

    const changeLogin = (value) => {
        setError('')
        setLogin(value.trim())
    }

    const changePassword = (value) => {
        setError('')
        setPass(value)
    }

    const sumbit = async (e) => {
        e.preventDefault();

        if (login !== '' && pass !== '') {
            const res = await dispatch(loginAction(login, pass));

            if (!res) {
                setError('Неверный данные');
            } else {
                document.body.style.overflowY = 'visible';
                e.preventDefault();

                refPopUp.current.classList.remove('popUp-container-active');
                refPopUpBody.current.classList.remove('popUp-active');
            }
        }
    }

    const logout = async (e) => {
        dispatch(logoutAction());
    }

    return (
        <div className='navbar'>
            <div className='navbar-container'>
                <Link to='/' className='navbar-img'></Link>
                <div className="navbar-br"></div>
                <div className='link-container'>
                    <Link to='/groups' ref={refFirst} className='navbar-link'>Раписание занятий</Link>
                    <Link to='/' ref={refSecond} className='navbar-link'>Успеваемость студентов</Link>
                </div>
                {
                    me === null || Object.keys(me).length === 0 ?
                        <div onClick={openPopUp} className="login-navbar">Вход</div>
                        :
                        <div onClick={logout} className="login-navbar">Выход</div>
                }

            </div>
            <div ref={refPopUp} className='popUp-container'>
                <div ref={refPopUpBody} className='popUp'>
                    <svg onClick={closePopUp} className='close-popup' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path d="M18.8,16l5.5-5.5c0.8-0.8,0.8-2,0-2.8l0,0C24,7.3,23.5,7,23,7c-0.5,0-1,0.2-1.4,0.6L16,13.2l-5.5-5.5  c-0.8-0.8-2.1-0.8-2.8,0C7.3,8,7,8.5,7,9.1s0.2,1,0.6,1.4l5.5,5.5l-5.5,5.5C7.3,21.9,7,22.4,7,23c0,0.5,0.2,1,0.6,1.4  C8,24.8,8.5,25,9,25c0.5,0,1-0.2,1.4-0.6l5.5-5.5l5.5,5.5c0.8,0.8,2.1,0.8,2.8,0c0.8-0.8,0.8-2.1,0-2.8L18.8,16z"/>
                    </svg>
                    <form className="menu-form" method="post" action="/" noValidate encType="application/json">
                        <div className='form-input-cont'>
                            <div className='input-text'>Логин</div>
                            <input type='text' value={login} className='input-form' onChange={(e) => changeLogin(e.target.value)}/>
                        </div>
                        <div className='form-input-cont'>
                            <div className='input-text'>Пароль</div>
                            <input type='password' value={pass} className='input-form' onChange={(e) => changePassword(e.target.value)}/>
                        </div>
                        <div className='error' ref={refError}>{error}</div>
                        <button onClick={sumbit} className='btn-form'>Войти</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Navbar;