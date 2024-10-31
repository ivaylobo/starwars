import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'
import {useDispatch} from "react-redux";
import {loginActions} from "../../Store/login-slice";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const dispatch = useDispatch();

    const loginButtonRef = useRef(null);
    const navigate = useNavigate();

    // Validation function to check username and password requirements
    const validateForm = () => {
        let usernameError = '';
        let passwordError = '';
        let isValid = true;

        if (username.length < 4 || username.length > 30) {
            usernameError = 'Username must be between 4 and 30 characters.';
            isValid = false;
        }

        if (password.length < 4 || password.length > 30) {
            passwordError = 'Password must be between 4 and 30 characters.';
            isValid = false;
        }

        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setIsFormValid(isValid);
    };

    // Re-validate form whenever username or password changes
    useEffect(() => {
        validateForm();
    }, [username, password]);


    // Control button disabled state based on form validity
    useEffect(() => {
        if (loginButtonRef.current) {
            loginButtonRef.current.disabled = !isFormValid;
        }
    }, [isFormValid]);

    // Event handlers for input changes
    const handleUsernameChange = (ev) => {
        setUsername(ev.target.value);
    };

    const handlePasswordChange = (ev) => {
        setPassword(ev.target.value);
    };

    const onButtonClick = () => {
        if (isFormValid) {
            dispatch(loginActions.login(username));
            localStorage.setItem('username', username);
            navigate('/table');
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Login</div>
            </div>
            <br />
            <div className={styles.inputContainer}>
                <input
                    value={username}
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    className={styles.inputBox}
                />
                {username && <label className={styles.errorLabel}>{usernameError}</label>}
            </div>
            <div className={styles.inputContainer}>
                <input
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={handlePasswordChange}
                    className={styles.inputBox}
                />
                {password && <label className={styles.errorLabel}>{passwordError}</label>}
            </div>
            <div className={styles.inputContainer}>
                <input
                    className="inputButton"
                    type="button"
                    ref={loginButtonRef}
                    onClick={onButtonClick}
                    value="Log in"
                />
            </div>
        </div>
    );
};

export default LoginPage;
