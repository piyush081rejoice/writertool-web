import React from 'react'
import styles from './logoutModal.module.scss';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
const DangerIcon = '/assets/icons/danger.svg';
export default function LogoutModal({ setIsDeleteModal, setSidebar }) {
  const router = useRouter();
  const handleSignOut = () => {
    const cookies = Cookies.get(); // Get all cookies
    for (let cookie in cookies) {
      Cookies.remove(cookie); // Remove each cookie
    }
    toast.success("You have succesfully signed out");
    router.push("/");
    setIsDeleteModal(false);
    setSidebar(false)
  };
  return (
    <div className={classNames(styles.openModalWrapper, styles.logoutWrapper)}>
      <div className={styles.modal}>
        <div className={styles.centerIcon}>
          <img src={DangerIcon} alt="DangerIcon" />
        </div>
        <p>Logout</p>
        <span>Are You sure want to Logout?</span>
        <div className={styles.buttonGrid}>
          <button className={styles.fill}>No</button>
          <button className={styles.dangerButton} onClick={handleSignOut}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
