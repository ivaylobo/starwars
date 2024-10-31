import React from 'react'
import styles from './Home.module.css'
import {useSelector} from "react-redux";
import Solder from '../../assets/solder.png'
import SolderLogged from '../../assets/solder-logged.png'

const HomePage = () => {

    const loggedIn = useSelector(state => !!state.log.userName);


    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.titleContainer}>
                {loggedIn ? 'Welcome to the dark side!' : 'Join the dark side!'}
            </h2>
            <div className={styles.imgSolder}>
                <img src={loggedIn ? SolderLogged : Solder} alt="solder"/>
            </div>
            <div className={styles.buttonContainer}>
                {loggedIn ? <div> Thank you for visiting our website!</div> : <div>If you want to see all Star Wars characters, login to our website! </div>}
            </div>
        </div>
    )
}

export default HomePage