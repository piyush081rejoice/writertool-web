import React, { useState } from "react";
import styles from "./resetPassword.module.scss";
import classNames from "classnames";
import CloseIcon from "@/assets/icons/closeIcon";
import Input from "../input";
import { ApiPostNoAuth, ApiPutNoAuth } from "@/helpers/API/ApiData";
import { useOnChange } from "@/hooks/onChangeHook";
import toast from "react-hot-toast";
import Loader from "@/common/Loader";
const Logo = "/assets/logo/logo.svg";
const Leftarrow = "/assets/icons/leftarrow.svg";


export default function ResetPassword({ toggle }) {
  const { inputValue, handleChange } = useOnChange();
  const [isLoading,setIsLoading]= useState(false)

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await ApiPostNoAuth("user-services/user/send-forgotpass-mail",{email:inputValue?.email});
      if (response?.data?.success) {
        setIsLoading(false)
        toast.success("Link sent to your registered email address. Please check your inbox and follow the instructions to reset your password.")
      }else{
        setIsLoading(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
      setIsLoading(false)
    }
  };
  return (
    <div className={classNames(styles.resetPasswordWrapper, styles.openModalWrapper)}>
      <div className={styles.resetPassword}>
        <div className={styles.closeIcon} onClick={toggle}>
          <CloseIcon />
        </div>
        <div className={styles.modalHeader}>
          <img src={Logo} alt="Logo" width="100%" height="100%" />
        </div>
        <div className={styles.textStyle}>
          <h2>Reset Your Password</h2>
          <p>Enter your email below to receive password reset instructions.</p>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" onChange={handleChange} name={"email"} label="Email ID" placeholder="Enter your email ID" required value={inputValue?.email || ""} />
          <div className={styles.button}>
            <button disabled={isLoading}>Continue {isLoading ? <Loader /> :null}</button>
          </div>
        </form>
        <div className={styles.backButton}>
          <span onClick={toggle}>
            <img src={Leftarrow} alt="Leftarrow" width="100%" height="100%" />
            Back to <a>Sign In</a>
          </span>
        </div>
      </div>
    </div>
  );
}
