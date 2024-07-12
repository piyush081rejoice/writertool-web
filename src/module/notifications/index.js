import React from 'react'
import styles from './notifications.module.scss';
import NotificationsDetails from './notificationsDetails';
export default function Notifications() {
    return (
        <>
            <div className="container">
                <div className={styles.notificationsbreadcumbalignment}>
                    <span>Writertools</span>
                    <span>/</span>
                    <span>Notification</span>
                </div>
            </div>
            <NotificationsDetails/>
        </>
    )
}
