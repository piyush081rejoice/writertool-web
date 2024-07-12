import React, { useState } from 'react'
import styles from './profileSidebar.module.scss';
import CloseIcon from '@/assets/icons/closeIcon';
import ProfileIcon from '@/assets/icons/profileIcon';
import LibraryIcon from '@/assets/icons/libraryIcon';
import StoriesIcon from '@/assets/icons/storiesIcon';
import LogoutIcon from '@/assets/icons/logoutIcon';
import classNames from 'classnames';
import ProfileInformationModal from '../profileInformationModal';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getCookie } from '@/hooks/useCookie';
const WriterTools = '/assets/logo/logo.svg';
export default function ProfileSidebar(props) {
    const { sidebar, setSidebar } = props
    const [updateProfile, setUpdateProfile] = useState(false)
    const router = useRouter()
    const handleSignOut = () => {
        const cookies = Cookies.get(); // Get all cookies
        setSidebar(false)
        for (let cookie in cookies) {
            Cookies.remove(cookie); // Remove each cookie
        }
        toast.success("You have succesfully signed out")
        router.push("/")
    }
    const navigateBlog = ()=>{
        const userLogin = getCookie("userToken")            
        if (userLogin != undefined) {
            router.push("/your-stories")
            setSidebar(!sidebar)
        }else{
            router.push("/sign-in")
            setSidebar(!sidebar)
        }
    }
    return (
        <div>
            {
                sidebar && (
                    <div className={styles.profileblur}></div>
                )
            }
            <div className={classNames(styles.profileSidebar, sidebar ? styles.show : styles.hide)}>
                <div className={styles.closeIconRightAlignment} onClick={() => setSidebar(false)}>
                    <CloseIcon />
                </div>
                <div className={styles.logo}>
                    <img src={WriterTools} alt='WriterTools' width='100%' height='100%' />
                </div>
                <div className={styles.allIconsAlignment}>
                    <div className={styles.iconText} onClick={() => { setSidebar(false); setUpdateProfile(true) }}>
                        <ProfileIcon />
                        <span>Profile</span>
                    </div>
                        <div className={styles.iconText} onClick={navigateBlog}>
                            <StoriesIcon />
                            <span>Your Blogs</span>
                        </div>
                    <Link href="/library">
                        <div className={styles.iconText}>
                            <LibraryIcon />
                            <span>Library</span>
                        </div>
                    </Link>
                    <div className={styles.iconText} onClick={handleSignOut} >
                        <LogoutIcon />
                        <span>Sign out</span>
                    </div>
                </div>
            </div>
            {
                updateProfile && <ProfileInformationModal />
            }
        </div>
    )
}
