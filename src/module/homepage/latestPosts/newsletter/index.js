import React, { useState } from 'react'
import styles from './newsletter.module.scss';
import WaveIcon from '@/assets/icons/waveIcon';
import { handleEmailKeyPress } from '@/hooks/usehandleSpaceKeyPress';
import { ApiPostNoAuth } from '@/helpers/API/ApiData';
import toast from 'react-hot-toast';
import { useOnChange } from '@/hooks/onChangeHook';
import Loader from '@/common/Loader';
export default function Newsletter() {
  const { inputValue, handleChange, setInputValue } = useOnChange();
  const [isLoading, setIsLoading] = useState(false)
  const  handleSubmit = async (e)=>{
    e.preventDefault()
    setIsLoading(true)
    try {
      const response  =await ApiPostNoAuth("blog-services/blogs/subscribe4NewsLetter",{email:inputValue?.email})
      if (response?.data?.success) {
        toast.success(response?.data?.message  ||"Subscribed to newsletter")
        setIsLoading(false)
        setInputValue({email:""})
      }
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message ?error?.response?.data?.payload?.message:  error?.response?.data?.message || "You're already subscribed for the Newsletter")
      setIsLoading(false)
    }
    
  }
  return (
    <div className={styles.newsletter}>
      <div className={styles.boxTitle}>
        <h2>Newsletter</h2>
        <div className={styles.iconCenter}>
            <WaveIcon />
        </div>
      </div>
      <div className={styles.textStyle}>
        <p>Join 70,000 subscribers!</p>
      </div>
      <form onSubmit={handleSubmit}>
      <div className={styles.input}>
        <input required onKeyDown={handleEmailKeyPress}  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" type='text' placeholder='Email address...' onChange={handleChange} name='email' value={inputValue?.email}/>
      </div>
      <div className={styles.buttonDesign}>
        <button disabled={isLoading} aria-label='Sing up to Subscribe' type='submit'>Sign up to Subscribe {isLoading ? <Loader /> :null}</button>
      </div>
      </form>
      <div className={styles.lastText}>
        <p>By signing up, you agree to our <a href='#Privacy Policy'>Privacy Policy</a></p>
      </div>
    </div>
  )
}
