import React from 'react'
import styles from './logoutModal.module.scss';
import classNames from 'classnames';
const DangerIcon = '/assets/icons/danger.svg';
export default function LogoutModal() {
    return (
        <div className={classNames(styles.openModalWrapper, styles.logoutWrapper)}>
            <div className={styles.modal}>
                <div className={styles.centerIcon}>
                    <img src={DangerIcon} alt='DangerIcon' />
                </div>
                <p>Logout</p>
                <span>
                    Are You sure want to Logout?
                </span>
                <div className={styles.buttonGrid}>
                    <button className={styles.fill}>No</button>
                    <button className={styles.dangerButton}>Yes</button>
                </div>
            </div>
        </div>
    )
}
