import React from 'react'
import styles from './notificationsItems.module.scss';
import LazyImage from '@/helpers/lazyImage';
const NotificationsImage = '/assets/icons/notification-img.svg';
export default function NotificationsItems() {
    return (
        <div className={styles.notificationsItems}>
            <div className={styles.tab}>
                <span>All</span>
                <span>Responses</span>
            </div>
            <div className={styles.allNotificationBoxAlignment}>
               {
                [...Array(5)].map(()=> {
                    return(
                        <div className={styles.notificationGrid}>
                        <div className={styles.img}>
                            <LazyImage
                                image={{
                                    src: NotificationsImage,
                                    alt: "NotificationsImage",
                                }}
                                className={styles.notificationsImage}
                            />
                        </div>
                        <div>
                            <p>
                            HTCustomerStudio <span>started following you.</span>
                            </p>
                            <span className={styles.date}>Apr 11, 2024</span>
                        </div>
                    </div>
                    )
                })
               }
            </div>
            <div className={styles.boxFooteralignment}>
                <button>
                Older Notifications
                </button>
                <span>Your Stats</span>
            </div>
        </div>
    )
}
