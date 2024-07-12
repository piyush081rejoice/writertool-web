import React from 'react'
import styles from './profileDetails.module.scss';
import WaveIcon from '@/assets/icons/waveIcon';
import EditIcon from '@/assets/icons/editIcon';
import WriteIcon from '@/assets/icons/writeIcon';
import Input from '@/shared/components/input';
import classNames from 'classnames';
export default function ProfileDetails() {
    return (
        <div className={styles.profileDetailsAllContentAlignment}>
            <div className='container'>
                <div className={styles.title}>
                    <h1>
                        Profile Setting
                    </h1>
                    <WaveIcon />
                </div>
                <div className={styles.box}>
                    <div className={styles.profileHeaderalignment}>
                        <div className={styles.leftContent}>
                            <div className={styles.profile}>
                                <div className={styles.editIcon}>
                                    <EditIcon />
                                </div>
                            </div>
                            <div>
                                <p>
                                    Dolphine Devtra
                                </p>
                                <span>Writertools123@gmail.com</span>
                            </div>
                        </div>
                        <div className={styles.button}>
                            <button className={styles.fill}>
                                <WriteIcon />
                                Edit
                            </button>
                        </div>
                    </div>
                    <div className={styles.allAlignment}>
                        <div className={styles.twoColGrid}>
                            <Input label='Name*' placeholder='Dolphine Devtra' />
                            <Input label='Email*' placeholder='Writertools123@gmail.com' />
                            <Input label='Product Name**' placeholder='Writer Tools' />
                            <Input label='Product Category*' placeholder='UI/UX Designing' />
                            <Input label='Product URL*' placeholder='WWW.writertool.com' />
                            <div className={classNames(styles.twoColGrid, styles.gap)}>
                                <div className={styles.button}>
                                    <button className={styles.fill}>Save Changes</button>
                                </div>
                                <div className={styles.button}>
                                    <button className={styles.outline}>Change Password</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blogInfo}>
                        <h2>
                        Interested Blog’s Categories 👋
                        </h2>
                        <div className={styles.buttonAlignment}>
                            <button>UI/UX Designing</button>
                            <button>Lifestyle</button>
                            <button>Education</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
