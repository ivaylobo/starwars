import styles from "./OfflinePopup.module.css";
import Offline from "../../assets/offline.png";
import React, {useEffect, useState} from "react";

export default function OfflinePopup() {

    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return (
        <>
            {isOffline && (
                <div className={styles.offlineModal}>
                    <div className={styles.modalContent}>
                        <p>You are currently offline.</p>
                        <img src={Offline} alt="Offline"/>
                    </div>
                </div>
            )}
        </>
    )
}