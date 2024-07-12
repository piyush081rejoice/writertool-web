import UserIcon from '@/assets/icons/userIcon';
import WriteIcon from '@/assets/icons/writeIcon';
import { getCookie } from '@/hooks/useCookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileSidebar from '../profileSidebar';
import styles from './header.module.scss';
const WriterTools = '/assets/logo/logo.svg';
const NotificationIcon = '/assets/icons/notification.svg';
const VectoreIcon = '/assets/icons/vectore.svg';
const Header = () => {
  const [sidebar, setSidebar] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const router = useRouter();
  const handleWriteBlog =()=>{
    const userLogin =getCookie("userToken")
    if (userLogin !== undefined) {
      router.push("/write-blog")
    }else{
      router.push("/sign-in")
    }

  }
  useEffect(() => {
    const userEmail = getCookie("userToken");
    if (userEmail == undefined) {
      setUserLoggedIn(false);
    }else{
      setUserLoggedIn(true);
    }
  }, [getCookie("userToken")]);

  return (
    <>
      <header className={styles.header}>
        <div className='container'>
          <div className={styles.headerAlignment}>
            <div className={styles.logo}>
              <Link href="/">
              <img src={WriterTools} alt='WriterTools' width='100%' height='100%' />
              </Link>
            </div>
            <div className={styles.rightAllContent}>
              <button className={styles.fill} onClick={handleWriteBlog}>
                <WriteIcon />
                Write
              </button>
            
              {
                !userLoggedIn &&
                  <button onClick={()=>router.push("/sign-in")} className={styles.outline}>
                    <UserIcon />
                    Sign In
                  </button>
              }
              <div className={styles.notificationIcon}>
                <Link href="/notifications">
                <img width='100%' height='100%' src={NotificationIcon} alt='NotificationIcon' />
                </Link>
              </div>
              {userLoggedIn &&
              <div className={styles.profileImage} onClick={() => setSidebar(!sidebar)}>
                <img width='100%' height='100%' src={VectoreIcon} alt='VectoreIcon' />
              </div>
              }
            </div>
          </div>
        </div>
      </header>
      <ProfileSidebar sidebar={sidebar} setSidebar={setSidebar} />
    </>
  )
}

export default Header
