import React from 'react'
import styles from './changePassword.module.scss';
import classNames from 'classnames';
import CloseIcon from '@/assets/icons/closeIcon';
import Input from '../input';
const Logo = "/assets/logo/logo.svg";
const EyeIcon = '/assets/icons/eye.svg';

export default function ChangePassword() {
  return (
    <div>
      <div className={ classNames(styles.openModalWrapper , styles.changePasswordWrapper)}>
        <div className={styles.modalDesign}>
            <div className={styles.closeRightAlignment}>
                <CloseIcon/>
            </div>
            <div className={styles.logoAlignment}>
                <img src={Logo}alt='Logo'/>
            </div>
            <h2>
            Change Password
            </h2>
            <div className={styles.spacer}>
                <Input label='Current Password' placeholder='Current Password' icon={EyeIcon} />
            </div>
            <div className={styles.spacer}>
                <Input label='New Password' placeholder='New Password' icon={EyeIcon} />
            </div>
            <div className={styles.spacer}>
                <Input label='Confirm Password' placeholder='Confirm Password' icon={EyeIcon} />
            </div>
            <div className={styles.button}>
                <button type='button' aria-label='Change Password'>Change Password</button>
            </div>
        </div>
      </div>
    </div>
  )
}
