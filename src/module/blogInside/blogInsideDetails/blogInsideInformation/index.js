import React from 'react'
import styles from './blogInsideInformation.module.scss';
import LazyImage from '@/helpers/lazyImage';
import MessageIcon from '@/assets/icons/messageIcon';
import ShareProfile from '../../shareProfile';
import EditorsPick from '@/module/homepage/editorsPick';
import CommonSection from '@/shared/components/commonSection';
import Recommended from '@/shared/components/recommended';
const ProfileImage = '/assets/images/profile.png';
const BlogImage = '/assets/images/blog-image.png';
export default function BlogInsideInformation() {
    return (
        <div className={styles.blogInsideInformation}>
            <div className={styles.title}>
                <h2>
                    3 Easy Ways To Make Your
                    iPhone Faster
                </h2>
            </div>
            <div className={styles.personalInformation}>
                <div className={styles.profileInformation}>
                    <div className={styles.img}>
                        <LazyImage
                            image={{
                                src: ProfileImage,
                                alt: "ProfileImage",
                            }}
                            className={styles.profileImage}
                        />
                    </div>
                    <span>Cameron Williamson</span>
                </div>
                <ul>
                    <li>
                        Trending
                    </li>
                </ul>
                <ul>
                    <li>
                        September 1, 2022
                    </li>
                </ul>

                <div className={styles.messageAlignment}>
                    <MessageIcon />
                    <span> (12)</span>
                </div>

            </div>
            <div className={styles.blogImage}>
                <LazyImage
                    image={{
                        src: BlogImage,
                        alt: "BlogImage",
                    }}
                    className={styles.profileImage}
                />
            </div>
            <div className={styles.details}>
                <p>
                    The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, 
                    their pronunciation and their most common words.
                </p>
                <p>
                    Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation 
                    and more common words.
                </p>
            </div>
            <div className={styles.blogImage}>
                <LazyImage
                    image={{
                        src: BlogImage,
                        alt: "BlogImage",
                    }}
                    className={styles.profileImage}
                />
            </div>
            <div className={styles.details}>
                <p>
                    The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, 
                    their pronunciation and their most common words.
                </p>
                <p>
                    Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation 
                    and more common words.
                </p>
                <p>
                    The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, 
                    their pronunciation and their most common words.
                </p>
                <p>
                    Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation 
                    and more common words.
                </p>
                <h3>Pityful a rethoric question ran over her cheek</h3>
                <p>
                    Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far 
                    World of Grammar.
                </p>
                <p>
                    The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on 
                    the way.
                </p>
                <p>
                    I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist 
                    than now.
                </p>
            </div>
            <div className={styles.blogImage}>
                <LazyImage
                    image={{
                        src: BlogImage,
                        alt: "BlogImage",
                    }}
                    className={styles.profileImage}
                />
            </div>
            <div className={styles.details}>
                <h3>
                Conclusion
                </h3>
                <ul>
                    <li>How about if I sleep a little bit</li>
                    <li>A collection of textile samples lay spread out</li>
                    <li>His many legs, pitifully thin compared with</li>
                    <li>He lay on his armour-like back</li>
                    <li>Gregor Samsa woke from troubled dreams</li>
                </ul>
                <p>
                    To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the 
                    same vocabulary.
                </p>
            </div>
            <div className={styles.line}></div>
            <ShareProfile/>
            <CommonSection/>
            <div className={styles.recommendedTopalignment}>
                <Recommended/>
            </div>

        </div>
    )
}
