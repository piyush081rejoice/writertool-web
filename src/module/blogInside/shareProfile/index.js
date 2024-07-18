import React from 'react'
import styles from './shareProfile.module.scss';
import FacebookIcon from '@/assets/icons/facebookIcon';
import TwitterIcon from '@/assets/icons/twitterIcon';
import LinkdinIcon from '@/assets/icons/linkdinIcon';
import TelegramIcon from '@/assets/icons/telegramIcon';
import GmailIcon from '@/assets/icons/gmailIcon';
import LazyImage from '@/helpers/lazyImage';
import Image from 'next/image';
import InstagramIcon from '@/assets/icons/Instagram';
import YouTubeIcon from '@/assets/icons/YoutubeIcon';
import { FacebookWhiteIcon, InstagramWhiteIcon, LinkedinWhiteIcon, TwitterWhiteIcon, YoutubeWhiteIcon } from '@/assets/icons/Icons';
const ProfileLg = '/assets/images/profile-lg.png';
export default function ShareProfile({singleBlog}) {
    const handleLinkClick = (link) => {
        window.open(link);
      };
    
    return (
        <div className={styles.shareProfileAllContnet}>
            <div className={styles.firstColumnAlignment}>
                {
                    singleBlog?.facebookLink ||  singleBlog?.twitterLink ||  singleBlog?.linkedinLink || singleBlog?.instagramLink || singleBlog?.youtubeLink ?  
                    <div className={styles.leftContent}>
                    <span>Share this:</span>
                    <div className={styles.socialIconAlignment}>
                         {singleBlog?.facebookLink ? <span onClick={()=>handleLinkClick(singleBlog?.facebookLink)}><FacebookIcon /></span> : null}
                        {singleBlog?.twitterLink ? <span onClick={()=>handleLinkClick(singleBlog?.twitterLink)}><TwitterIcon /></span> : null}
                        {singleBlog?.linkedinLink ? <span onClick={()=>handleLinkClick(singleBlog?.linkedinLink)}><LinkdinIcon /></span> : null}
                        {singleBlog?.instagramLink ? <span onClick={()=>handleLinkClick(singleBlog?.instagramLink)}><InstagramIcon/></span> : null}
                        {singleBlog?.youtubeLink ? <span onClick={()=>handleLinkClick(singleBlog?.youtubeLink)}><YouTubeIcon /></span> : null} 
                    </div>
                </div>
                    :null
                }
                <div className={styles.buttonFlex}>
                    {
                        singleBlog?.keyWords?.length >0  ?  singleBlog?.keyWords?.map((data,index)=> <button type='button' key={index} > #{data} </button>)  : null
                    }
                </div>
            </div>
            <div className={styles.profileBox}>
                <div className={styles.profile}>
                <LazyImage src={singleBlog?.uid?.profileImage ? singleBlog?.uid?.profileImage : ProfileLg} alt="ProfileImage" height={90} width={90} className={styles.profileImage} />
                </div>
                <div>
                    <h3>{singleBlog?.uid?.userName}</h3>
                    {
                        singleBlog?.uid?.sortBio ? <p>{singleBlog?.uid?.sortBio} </p> : null
                    }
                    
                    <div className={styles.icons}>
                       {singleBlog?.facebookLink ? <span onClick={()=>handleLinkClick(singleBlog?.facebookLink)}><FacebookWhiteIcon /></span> : null}
                       {singleBlog?.twitterLink ? <span onClick={()=>handleLinkClick(singleBlog?.twitterLink)}><TwitterWhiteIcon /></span> : null}
                       {singleBlog?.linkedinLink ? <span onClick={()=>handleLinkClick(singleBlog?.linkedinLink)}><LinkedinWhiteIcon /></span> : null}
                       {singleBlog?.instagramLink ? <span onClick={()=>handleLinkClick(singleBlog?.instagramLink)}><InstagramWhiteIcon /></span> : null}
                       {singleBlog?.youtubeLink ? <span onClick={()=>handleLinkClick(singleBlog?.youtubeLink)}><YoutubeWhiteIcon /></span> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}
