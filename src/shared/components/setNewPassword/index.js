import React, { useState } from 'react'
import styles from './setNewPassword.module.scss';
import classNames from 'classnames';
import Input from '../input';
import { useOnChange } from '@/hooks/onChangeHook';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { ApiPutNoAuth } from '@/helpers/API/ApiData';
import Loader from '@/common/Loader';
const Logo = '/assets/logo/logo.svg';
const EyeIcon = '/assets/icons/eye.svg';
const OpenEye = '/assets/icons/OpenEye.svg';
export default function SetNewPassword() {
  const { inputValue, handleChange } = useOnChange()
  const [showPassword,setShowPassword]=useState(false)
  const [isLoading,setIsLoading]= useState(false)
  const togglePassword = () => setShowPassword(!showPassword)
  const [showPassword2,setShowPassword2]=useState(false)
  const togglePassword2 = () => setShowPassword2(!showPassword2)
  const router = useRouter()
  const { query } = router
  const handleSubmit = async  (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (inputValue?.password.trim() == inputValue?.ConfirmPassword.trim() && (query?.forgotPassToken) ) {
      try {
        const resp  = await ApiPutNoAuth("user-services/user/forgot-password",{forgotPassToken:query?.forgotPassToken, newPassword:inputValue?.password ,confirmNewPassword:inputValue?.ConfirmPassword  })
        if (resp?.data?.success) {
          toast.success(resp?.data?.messages || "Your password has been successfully changed.") 
          setIsLoading(false)
          router.push("/sign-in")
        }else{
          setIsLoading(false)
        }
      } catch (error) {
        toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
        setIsLoading(false)
      }
    }else{
      toast.error("Password and Confirm Password do not match. Please ensure both fields contain the same password.")
      setIsLoading(false)
    }
  }
  return (
    <>
    <div className={classNames(styles.setNewPasswordWrapper , styles.openModalWrapper)  }>
      <div className={styles.setPassword}>
      <div className={styles.modalHeader}>
        <img src={Logo} alt="Logo" width="100%" height="100%" />
        </div>
        <div className={styles.textStyle}>
            <h2>
            Set New Password
            </h2>
        </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
        <div className={styles.inputSpacer}>
            <Input onIconClick={togglePassword} icon={`${showPassword ? EyeIcon : OpenEye}`} type={showPassword ?"text" : "password"}  label='Password' placeholder='Enter your password'  name={"password"} value={inputValue?.password || ""} onChange={handleChange} required={true} />
        </div>
        <div className={styles.inputSpacer}>
            <Input onIconClick={togglePassword2} icon={`${showPassword2 ? EyeIcon : OpenEye}`} type={showPassword2 ?"text" : "password"}  label='Confirm Password' placeholder='Enter your confirm password'  name={"ConfirmPassword"} value={inputValue?.ConfirmPassword || ""} onChange={handleChange} required={true} />
        </div>
        <div className={styles.button}>
            <button type='submit' disabled={isLoading}>Set New Password {isLoading ? <Loader /> :null} </button>
        </div>
        </form>
      </div>
    </div>
    {/* <Toaster /> */}
    </>
  )
}
