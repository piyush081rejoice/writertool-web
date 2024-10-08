import React, { useEffect, useState } from "react";
import classNames from "classnames";
import CloseIcon from "@/assets/icons/closeIcon";
import Input from "../input";
const Logo = "/assets/logo/logo.svg";
const GoogleIcon = "/assets/icons/google.svg";
import styles from "./signupModal.module.scss";
import Link from "next/link";
import { useOnChange } from "@/hooks/onChangeHook";
import { useRouter } from "next/router";
import { auth } from "@/shared/loginWithGoogle/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { ApiPostNoAuth } from "@/helpers/API/ApiData";
import { getCookie, removeCookie, setCookie } from "@/hooks/useCookie";
import OtpVerificationModal from "../otpVerificationModal";
import Loader from "@/common/Loader";
import Image from "next/image";
import tooltip from "../../../../public/assets/images/tooltip.jpg";
import { handleSpaceKeyPress } from "@/hooks/usehandleSpaceKeyPress";
import { PASSWORD_PATTERN } from "@/helpers/Constant";
const EyeIcon = "/assets/icons/eye.svg";
const OpenEye = "/assets/icons/OpenEye.svg";

export default function SignupModal() {
  const { inputValue, handleChange, setInputValue ,errors,setErrors } = useOnChange();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [otpVerify, setOtpVerify] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  

  const togglePassword = () => setShowPassword(!showPassword);
  const googleAuth = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const userData = await signInWithPopup(auth, googleAuth);
      let body = {
        email: userData?.user?.email,
        isSocial: true,
        refreshToken: userData?._tokenResponse?.refreshToken,
        accessToken: userData?._tokenResponse?.idToken,
        userName:userData?.user.displayName
      };
      let resp = await ApiPostNoAuth(`user-services/user/login`, body);
      if (resp?.data?.payload?.user?.isActive) {
        if (resp?.data?.success) {
          let userToken = resp?.data?.payload?.tokens;
          setCookie("userToken", userToken);
          setCookie("isProfileCompleted", resp?.data?.payload?.user?.isProfileCompleted);
          localStorage.setItem("userData",JSON.stringify(resp?.data?.payload?.user))
          toast.success("You have successfully signed up.");
          const  redirectUrl =getCookie("redirectUrl")
          router.push(redirectUrl != undefined ? redirectUrl : "/")
          removeCookie("redirectUrl")        
        }
      } else {
        toast.error("Please reach out to your administrator to activate your account.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!PASSWORD_PATTERN.test(inputValue?.password)) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number." }));
      return;
    }
    if (!inputValue?.privacyAccepted) {      
      setErrors((prevErrors) => ({ ...prevErrors, privacyAccepted: "Please accept the Privacy Policy and Terms & Conditions." }));
      return;
    }

    setIsLoading(true);

    try {
      let body = {
        email: inputValue?.email,
        password: inputValue?.password,
        userName: inputValue?.fullName,
        privacyAccepted: inputValue?.privacyAccepted,
      };
      let resp = await ApiPostNoAuth(`user-services/user/signup`, body);
      if (resp?.data?.success) {
        setIsLoading(false);
        setCookie("userEmail", inputValue?.email);
        toast.success("An OTP has been sent to your email. Please verify to complete the sign-up process.");
        setOtpVerify(!otpVerify);
        setInputValue("");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.payload?.message
          ? error?.response?.data?.payload?.message
          : error?.response?.data?.message || "Something went wrong"
      );
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className={classNames(styles.openModalWrapper, styles.signupModalWrapper)}>
        <div className={styles.modal}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.modalHeader}>
              <img src={Logo} alt="Logo" width="100%" height="100%" />
              <span onClick={()=>router.push("/")}>
              <CloseIcon />
              </span>
            </div>
            <h2>Welcome to WriterTools 👋</h2>
            <div className={styles.spacerAlignment}>
              <Input
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                type="email"
                label="Email ID"
                placeholder="Enter your email ID"
                name="email"
                value={inputValue?.email}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className={styles.spacerAlignment}>
              <Input type="text" label="Full Name" placeholder="Enter your full name" name="fullName" value={inputValue?.fullName || ""} onChange={handleChange} required={true} />
            </div>
            <div className={styles.spacerAlignment}>
              <Input
                onIconClick={togglePassword}
                icon={`${showPassword ? EyeIcon : OpenEye}`}
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Password"
                name="password"
                value={inputValue?.password || ""}
                onChange={handleChange}
                required={true}
                labelClassName="tooltipLabel"
              >
                <div className={styles.Tooltipiconalignment}>
                  <Image height={18} width={18} src={tooltip} alt="tooltip" className={styles.tooltipicon} />
                  <div className={styles.Tooltipmain}>
                    <p>Password must be at least 8 characters long, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.</p>
                    <div className={styles.tooltiptriangle}></div>
                  </div>
                </div>
              </Input>
              {errors?.password && <p className={styles.errorMessage}>{errors?.password}</p>}
            </div>
            <div className={styles.checkboxMain} >
                <div className={styles.checkboxText}>
                  <input type="checkbox" name="privacyAccepted" value={inputValue?.privacyAccepted} onChange={handleChange}  />
                  <span>
                    I have read and agree to the website <b><Link target="_blank" href={"/privacy-policy"}> Privacy Policy </Link> and <Link target="_blank" href={"/terms-and-conditions"}> Terms & Conditions</Link>.</b>
                  </span>
                </div>
                {errors?.privacyAccepted && <div className={styles.errorMessage}>{errors?.privacyAccepted}</div>}
                  </div>
            <div className={styles.signinButton}>
              <button disabled={isLoading}>Sign Up {isLoading ? <Loader /> : null}</button>
            </div>
            <div className={styles.haveAccount}>
              <p>
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </p>
            </div>
            <div className={styles.orContnetCenter}>
              <div className={styles.line}></div>
              <span>Or</span>
              <div className={styles.line}></div>
            </div>
          </form>

          <div className={styles.signupwithGoogle}>
            <button onClick={loginWithGoogle}>
              Sign up with Google
              <img src={GoogleIcon} alt="GoogleIcon" />
            </button>
          </div>
        </div>
        {/* <Toaster /> */}
      </div>
      {otpVerify && <OtpVerificationModal />}
    </>
  );
}
