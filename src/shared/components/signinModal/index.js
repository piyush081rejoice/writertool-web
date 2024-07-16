import React, { useState } from 'react'
import styles from './signinModal.module.scss';
import classNames from 'classnames';
import CloseIcon from '@/assets/icons/closeIcon';
import Input from '../input';
import Link from 'next/link';
const Logo = '/assets/logo/logo.svg';
const GoogleIcon = '/assets/icons/google.svg';
import { useOnChange } from '@/hooks/onChangeHook';
import { ApiPost } from '@/helpers/API/ApiData';
import { getCookie, removeCookie, setCookie } from '@/hooks/useCookie';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '@/shared/loginWithGoogle/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import ResetPassword from '../resetPassword';
import Loader from '@/common/Loader';
const EyeIcon = '/assets/icons/eye.svg';
const OpenEye = '/assets/icons/OpenEye.svg';

export default function SigninModal() {
  const { inputValue, handleChange, setInputValue } = useOnChange()
  const [openForGotPassWordModal, setOpenForGotPassWordModal] = useState(false)
  const [isLoading,setIsLoading]= useState(false)
  const [showPassword,setShowPassword]=useState(false)
  const togglePassword = () => setShowPassword(!showPassword)
  const router = useRouter()
  const googleAuth = new GoogleAuthProvider()
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
  
      let resp = await ApiPost(`user-services/user/login`, body);
      if (resp?.data?.payload?.user?.isActive) {
        if (resp?.data?.success) {
          let userToken = resp?.data?.payload?.tokens;
          setCookie("userToken", userToken);
          setCookie("isProfileCompleted",resp?.data?.payload?.user?.isProfileCompleted)
          toast.success("You have successfully signed up.");
          const  redirectUrl =getCookie("redirectUrl")
          router.push(redirectUrl != undefined ? redirectUrl : "/")
          removeCookie("redirectUrl")
        }
      }else{
        toast.error("Please reach out to your administrator to activate your account.")
      } 
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let body = {
        email: inputValue?.email,
        password: inputValue?.password?.trim(),
        isSocial:false
      }
      let resp = await ApiPost(`user-services/user/login`, body)
      if (resp?.data?.payload?.user?.isActive) {
        if (resp?.data?.success) {
          let userToken = resp?.data?.payload?.tokens
          setCookie("userToken",userToken)
          setCookie("isProfileCompleted",resp?.data?.payload?.user?.isProfileCompleted)
          toast.success("Login successfully")
          const  redirectUrl =getCookie("redirectUrl")
          router.push(redirectUrl != undefined ? redirectUrl : "/")
          removeCookie("redirectUrl")
          setIsLoading(false)
          setInputValue("")
        }
      }else{
        toast.error("Please reach out to your administrator to activate your account.")
        setIsLoading(false)
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
      setIsLoading(false)
    }

  }
  const toggle = () => setOpenForGotPassWordModal(!openForGotPassWordModal)    
    
  return (
    <>
    <div className={classNames(styles.openModalWrapper, styles.signinModalWrapper)}>
      <div className={styles.modal}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={styles.modalHeader}>
            <img src={Logo} alt="Logo" width="100%" height="100%" />
            <span onClick={()=>router.push("/")}>
              <CloseIcon />
            </span>
          </div>
          <div className={styles.spacerAlignment}>
            <Input type="email" label='Email ID' placeholder='Enter your email ID' name="email" value={inputValue?.email || ""} onChange={handleChange} required={true} />
          </div>
          <div className={styles.spacerAlignment}>
            <Input onIconClick={togglePassword} icon={`${showPassword ? EyeIcon : OpenEye}`} type={showPassword ?"text" : "password"} label='Password' placeholder='Password' name="password" value={inputValue?.password || ""} onChange={handleChange} required={true} />
          </div>
          <div onClick={toggle} className={`${styles.spacerAlignment}`} style={{textAlign:"end"}}>
            <a style={{cursor:"pointer"}}>Forgot Password?</a>
          </div>
          <div className={styles.signinButton}>
            <button disabled={isLoading}> Sign in {isLoading ? <Loader /> :null}</button>
          </div>
          <div className={styles.haveAccount}>
            <p>Don't have an account? <Link href="/sign-up">Sign up</Link></p>
          </div>
          <div className={styles.orContnetCenter}>
            <div className={styles.line}></div>
            <span>Or</span>
            <div className={styles.line}></div>
          </div>
        </form>
        <div className={styles.signupwithGoogle}>
          <button onClick={loginWithGoogle}>
            Sign in with Google
            <img src={GoogleIcon} alt="GoogleIcon" />
          </button>
        </div>
      </div>
      {/* <Toaster /> */}
    </div>
      {openForGotPassWordModal && <ResetPassword toggle={toggle}/>}
    </>
  )
}
