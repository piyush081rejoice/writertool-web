import React, { useEffect, useRef, useState } from 'react'
import styles from './profileInformationModal.module.scss';
import classNames from 'classnames';
import CloseIcon from '@/assets/icons/closeIcon';
import LazyImage from '@/helpers/lazyImage';
import Input from '../input';
import toast from 'react-hot-toast';
import { ApiGet, ApiPut } from '@/helpers/API/ApiData';
import { useOnChange } from '@/hooks/onChangeHook';
import Image from 'next/image';
const ProfileImage = '/assets/images/profile-lg.png';
const PencilImage = '/assets/icons/Pencil.svg';

export default function ProfileInformationModal() {
  const { inputValue, setInputValue, handleChange } = useOnChange();
  const fileInputRef = useRef(null);


  useEffect(() => {
    getUserData()
  }, [])

  const handleImageChange = (e) => {
    setInputValue({ ...inputValue, ["productURL"]: e?.target?.files[0] })
  }

  const getUserData = async () => {
    try {
      const response = await ApiGet(`user-services/user/get-profile`);
      const data = response?.data?.payload;
      setInputValue(data[0])
    } catch (error) {
      toast.error(error?.response?.data?.payload?.message  ?error?.response?.data?.payload?.message :error?.response?.data?.message ||"Something went wrong")
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current.click();
  }

  const handleProfileUpdate = async () => {
    let formData = new FormData();
    formData.append("userName", inputValue?.userName);
    formData.append("shortBio", inputValue?.shortBio);
    formData.append("profileImage", inputValue?.productURL);
    try {


      const resp = await ApiPut("user-services/user/update-profile", formData);
    } catch (error) {

    }
  }
  return (
    <div className={classNames(styles.openModalWrapper, styles.profileInformationModal)}>
      <div className={styles.profileInformationModalMd}>
        <div className={styles.closeIconRightAlignment}>
          <CloseIcon />
        </div>
        <h2>Profile Information</h2>
        <div className={styles.profileGrid}>
          <div className={styles.profileImage}  >
            <div className={styles.profileImageStyle}>
              <Image width={100} height={100} src={ProfileImage} alt="ProfileImage" />
              <input type='file' onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }} />
            </div>
            <div onClick={handleImageUpload} className={styles.profilepencilStyle}>
              <Image width={100} height={100} src={PencilImage} alt="Pencil" />
            </div>
          </div>
          <p>{inputValue?.userName}</p>
        </div>
        <Input label='Name*' placeholder='Dolphine Devtra' name={"userName"} value={inputValue?.userName} onChange={handleChange} />
        <div className={styles.textareaDesign}>
          <label>Short Bio</label>
          <textarea placeholder="Write here..." value={inputValue?.shortBio} name='shortBio' onChange={handleChange}></textarea>
        </div>
        <div className={styles.buttonRightAlignment}>
          <button>Cancel</button>
          <button onClick={handleProfileUpdate}>Save</button>
        </div>
      </div>
    </div>
  )
}
