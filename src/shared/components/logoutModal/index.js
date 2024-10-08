import React from "react";
import styles from "./logoutModal.module.scss";
import classNames from "classnames";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getSocket } from "@/socket";
const DangerIcon = "/assets/icons/danger.svg";
export default function LogoutModal({ setIsDeleteModal, setSidebar ,setHeaderOpen }) {
  const router = useRouter();
    const socket = getSocket();
  const handleSignOut = () => {
    localStorage.clear();
    const cookies = Cookies.get(); // Get all cookies
    for (let cookie in cookies) {
      Cookies.remove(cookie); // Remove each cookie
    }
    const event = new CustomEvent("logout");
    window.dispatchEvent(event);
    toast.success("You have succesfully signed out");
    if (socket) {
      socket.disconnect();
    }
    router.push("/");
    setIsDeleteModal(false);
    setSidebar(false);
    setHeaderOpen(false)
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
          <button onClick={() => setIsDeleteModal(false)} className={styles.fill}>No</button>
          <button className={styles.dangerButton} onClick={handleSignOut}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
