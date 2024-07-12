import React, { useState } from 'react';
import styles from './frequentlyAskedQuestions.module.scss';
import WaveIcon from '@/assets/icons/waveIcon';
import PlusIcon from '@/assets/icons/plusIcon';
import classNames from 'classnames';
import { FAQ_DATA } from '@/helpers/Constant';
export default function FrequentlyAskedQuestions() {
    const [faqs, setFaqs] = useState(FAQ_DATA);

    const toggleFaq = (index) => {
        setFaqs(faqs?.map((faq, i) => {
            if (i === index) {
                faq.isOpen = !faq.isOpen;
            } else {
                faq.isOpen = false;
            }
            return faq;
        }));
    };

    return (
        <div className={styles.frequentlyAskedQuestions}>
            <div className='container'>
                <div className={styles.grid}>
                    <div className={styles.gridItems}>
                        <div className={styles.title}>
                            <h2>Frequently Asked Questions</h2>
                            <WaveIcon />
                        </div>
                        <div className={styles.box}>
                            {faqs?.map((faq, index) => (
                                <div key={index} className={styles.faqBox}>
                                    <div className={styles.faqBoxHeader} onClick={() => toggleFaq(index)}>
                                        <h3>{index + 1}. {faq.question}</h3>
                                        <div className={classNames(styles.animationTime, faq.isOpen ? styles.rotate : "")}>
                                            <PlusIcon />
                                        </div>
                                    </div>
                                    <div className={classNames(styles.faqBoxBody, faq.isOpen ? styles.show : styles.hide)}>
                                        <div className={styles.spacer}>
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.gridItems}></div>
                </div>
            </div>
        </div>
    )
}
