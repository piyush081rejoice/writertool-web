import React from 'react'
import styles from './profileSetting.module.scss';
import Breadcrumb from '../writeBlog/breadcrumb';
import ProfileDetails from './profileDetails';
export default function ProfileSetting() {
  return (
    <div>
      <Breadcrumb/>
      <ProfileDetails/>
    </div>
  )
}
