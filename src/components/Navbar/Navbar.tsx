import React, {FC, useEffect, useRef, useState} from 'react';
import './navbar.css'
import {useLocation, Link} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {isLogin, loginAction, logoutAction} from "../../store/actions/authActions";
import {useAppSelector} from "../../hooks/useAppSelector";

const Navbar: FC = () => {
    const refFirst = useRef<HTMLAnchorElement>();
    const refSecond = useRef<HTMLAnchorElement>();
    const refThird = useRef<HTMLAnchorElement>();
    const refPopUp = useRef<HTMLDivElement>()
    const refPopUpBody = useRef<HTMLDivElement>();
    const refError = useRef<HTMLDivElement>();
    const refLogin = useRef<HTMLInputElement>();
    const refPass = useRef<HTMLInputElement>();

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
            refThird.current.classList.remove('navbar-link-active');

            return;
        }

        if (loc.pathname === '/teachers') {
            refThird.current.classList.add('navbar-link-active');
            refSecond.current.classList.remove('navbar-link-active');
            refFirst.current.classList.remove('navbar-link-active');

            return;
        }

        refFirst.current.classList.remove('navbar-link-active');
        refThird.current.classList.remove('navbar-link-active');
        refSecond.current.classList.remove('navbar-link-active');
    }, [loc.pathname])

    useEffect(() => {
        dispatch(isLogin())
    }, [])

    const openPopUp = (e) => {
        setLogin('');
        setPass('');
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
        if (refLogin.current.classList.length === 2) {
            refLogin.current.classList.remove('invalid-input');
        }

        setLogin(value.trim())
    }

    const changePassword = (value) => {
        setError('')
        if (refPass.current.classList.length === 2) {
            refPass.current.classList.remove('invalid-input');
        }

        setPass(value)
    }

    const sumbit = async (e) => {
        e.preventDefault();

        if (login === '') {
            setError('Введите логин')
            refLogin.current.classList.add('invalid-input');

            return
        }

        if (pass === '') {
            setError('Введите пароль')
            refPass.current.classList.add('invalid-input');

            return
        }

        if (login !== '' && pass !== '') {
            const res = await dispatch(loginAction(login, pass));

            if (!res) {
                setError('Неверные данные');
            } else {
                document.body.style.overflowY = 'visible';
                e.preventDefault();

                refPopUp.current.classList.remove('popUp-container-active');
                refPopUpBody.current.classList.remove('popUp-active');
            }
        }
    }

    const clear = () => {
        localStorage.clear()
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
                    <Link to='/groups' onClick={clear} ref={refFirst} className='navbar-link'>Раписание занятий</Link>
                    <Link to='/' ref={refSecond} className='navbar-link'>Успеваемость студентов</Link>
                    <Link to='/teachers' ref={refThird} className='navbar-link'>Преподаватели</Link>
                </div>
                {
                    me === null || Object.keys(me).length === 0 ?
                        <div onClick={openPopUp} className="login-navbar"><span className='logout-text'>Вход</span></div>
                        :
                        <>
                            <div  className="login-navbar">
                                {
                                    me.type === 'ADMIN'
                                    ?
                                        <div><svg className='svg-login' xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 1024 1024"><path d="M85.333 512C85.333 276.358 276.358 85.333 512 85.333c235.639 0 426.667 191.025 426.667 426.667 0 235.639-191.027 426.667-426.667 426.667C276.358 938.667 85.333 747.64 85.333 512zM512 128c-212.077 0-384 171.923-384 384 0 142.135 77.222 266.231 192 332.629V628.62c0-77.474 45.885-144.23 111.962-174.575-38.129-25.737-63.201-69.344-63.201-118.808 0-79.108 64.131-143.238 143.24-143.238s143.236 64.13 143.236 143.238c0 49.463-25.071 93.071-63.202 118.808 66.078 30.345 111.966 97.101 111.966 174.575v216.009c114.778-66.398 192-190.494 192-332.629 0-212.077-171.921-384-384-384zm149.333 737.882V628.621c0-82.475-66.859-149.333-149.333-149.333s-149.333 66.859-149.333 149.333v237.261C408.572 885.278 459.034 896 512 896s103.428-10.722 149.333-30.118zM512 234.667c-55.543 0-100.573 45.027-100.573 100.571S456.457 435.81 512 435.81c55.543 0 100.57-45.028 100.57-100.572S567.544 234.667 512 234.667z"/></svg></div>
                                        :
                                        <Link to='/myinfo'><svg className='svg-login' xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 1024 1024"><path d="M85.333 512C85.333 276.358 276.358 85.333 512 85.333c235.639 0 426.667 191.025 426.667 426.667 0 235.639-191.027 426.667-426.667 426.667C276.358 938.667 85.333 747.64 85.333 512zM512 128c-212.077 0-384 171.923-384 384 0 142.135 77.222 266.231 192 332.629V628.62c0-77.474 45.885-144.23 111.962-174.575-38.129-25.737-63.201-69.344-63.201-118.808 0-79.108 64.131-143.238 143.24-143.238s143.236 64.13 143.236 143.238c0 49.463-25.071 93.071-63.202 118.808 66.078 30.345 111.966 97.101 111.966 174.575v216.009c114.778-66.398 192-190.494 192-332.629 0-212.077-171.921-384-384-384zm149.333 737.882V628.621c0-82.475-66.859-149.333-149.333-149.333s-149.333 66.859-149.333 149.333v237.261C408.572 885.278 459.034 896 512 896s103.428-10.722 149.333-30.118zM512 234.667c-55.543 0-100.573 45.027-100.573 100.571S456.457 435.81 512 435.81c55.543 0 100.57-45.028 100.57-100.572S567.544 234.667 512 234.667z"/></svg></Link>
                                }
                                <div onClick={logout} className='logout-text'>
                                    Выход
                                </div>
                            </div>
                        </>

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
                            <input ref={refLogin} type='text' value={login} className='input-form' onChange={(e) => changeLogin(e.target.value)}/>
                        </div>
                        <div className='form-input-cont'>
                            <div className='input-text'>Пароль</div>
                            <input ref={refPass} type='password' value={pass} className='input-form' onChange={(e) => changePassword(e.target.value)}/>
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