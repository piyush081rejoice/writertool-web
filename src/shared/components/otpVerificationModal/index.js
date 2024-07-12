import React, { useEffect, useState } from "react";
import styles from "./otpVerificationModal.module.scss";
import classNames from "classnames";
import { useOnChange } from "@/hooks/onChangeHook";
import Cookies from "js-cookie";
import { ApiPost, ApiPostNoAuth } from "@/helpers/API/ApiData";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { removeCookie, setCookie } from "@/hooks/useCookie";
import Loader from "@/common/Loader";
const Logo = "/assets/logo/logo.svg";

export default function OtpVerificationModal() {
  const { inputValue, handleChange } = useOnChange({ otp: Array(6).fill("") });
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [isLoading,setIsLoading]= useState(false)
  const obfuscateEmail = (email) => {
    if (!email) return ""; // Return an empty string or a placeholder if the email is undefined or null

    const [user, domain] = email.split("@");
    const obfuscatedUser = user.substring(0, 2) + "*".repeat(user.length - 2);
    return `${obfuscatedUser}@${domain}`;
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userEmail = Cookies.get("userEmail");
      if (userEmail) {
        setEmail(obfuscateEmail(userEmail));
      }
    }
  }, []);

  const handleOtpChange = (e, index) => {
    const newOtp = [...inputValue.otp];
    newOtp[index] = e.target.value;
    handleChange({ target: { name: "otp", value: newOtp } });

    // Move focus to next input if value is not empty
    if (e.target.nextSibling && e.target.value) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };
  const handleOtp = async () => {
    const otp = inputValue?.otp?.join("");
      
    if (!otp || otp.length != 6 ) {
      toast.error("Please enter otp first")  
    }else{
      setIsLoading(true)
      try {
        const res = await ApiPostNoAuth(`user-services/user/verify-otp`, { email:Cookies.get("userEmail"), otp });
        if (res?.data?.success) {
          let userToken = res?.data?.payload?.tokens
          setCookie("userToken",userToken)
          setCookie("isProfileCompleted",res?.data?.payload?.user?.isProfileCompleted)
          removeCookie("userEmail")
          setIsLoading(false)
          router.push("/")  
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
        setIsLoading(false)
      }
    }
  };

  const resendOtp = async () =>{
    try {
      const res = await ApiPostNoAuth(`user-services/user/send-otp`, { email:Cookies.get("userEmail") });
      if (res?.data?.success) {
        toast.success( res?.data?.messages||"We have resent the OTP to your email.")
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
    }
  }
  return (
    <div className={classNames(styles.otpVerificationModalWrapper, styles.openModalWrapper)}>
      <div className={styles.verificationModal}>
        <div className={styles.modalHeader}>
          <img src={Logo} alt="Logo" width="100%" height="100%" />
        </div>
        <div className={styles.textStyle}>
          <h2>OTP Verification</h2>
          <p>Enter OTP Code sent to {email}.</p>
        </div>
        <div className={styles.otpFiled}>
          {inputValue?.otp?.map((data, index) => (
            <input
              className="otp-field"
              type="number"
              name={`otp-${index}`}
              maxLength="1"
              key={index}
              value={data}
              onChange={(e) => e.target.value <= 9 && handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>
        <div className={styles.subTextStyle}>
          <p>Don't recieve OTP code?</p>
          <span onClick={resendOtp}>Resend Code</span>
        </div>
        <div className={styles.button}>
          <button disabled={isLoading} onClick={handleOtp}>Verify OTP {isLoading ? <Loader /> :null}</button>
        </div>
      </div>
    </div>
  );
}
