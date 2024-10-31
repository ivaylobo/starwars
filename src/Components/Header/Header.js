import {useDispatch, useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
import styles from './Header.module.css';
import {loginActions} from "../../Store/login-slice";
import React from "react";

export default function Header() {
    const username = useSelector((state) => state.log.userName);
    const loggedIn = useSelector(state => !!state.log.userName);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onButtonClick = () => {
        if(loggedIn){
            dispatch(loginActions.logout());
            localStorage.removeItem('username');
            navigate('/');
        } else{
            navigate('/login');
        }
    }

    return (
        <header className={loggedIn ? styles.logged : ''}>
            <nav className={styles.headerNavigation}>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? styles.active : undefined)}
                        >
                            Home
                        </NavLink>
                    </li>
                    {username && (
                        <li>
                            <NavLink
                                to="/table"
                                className={({ isActive }) => (isActive ? styles.active : undefined)}
                            >
                                Table
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>
            {username && <p className={styles.userText}>Hi, <strong>{username}</strong>, welcome to our website!</p>}
            <input
                className={loggedIn ? styles.logged : styles.unlogged}
                type="button"
                onClick={onButtonClick}
                value={loggedIn ? 'Log out' : 'Log in'}
            />
        </header>
    );
}
