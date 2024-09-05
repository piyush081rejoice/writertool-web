import React, { useState } from "react";
import styles from "./Accordion.module.scss";
import classNames from "classnames";
import PlusIcon from "@/assets/icons/plusIcon";

const Accordion = ({ FAQs }) => {
  const [faqs, setFaqs] = useState(FAQs);

  const toggleFaq = (index) => {
    setFaqs(
      faqs?.map((faq, i) => {
        if (i === index) {
          faq.isOpen = !faq.isOpen;
        } else {
          faq.isOpen = false;
        }
        return faq;
      })
    );
  };
  return (
    <div className={styles.box}>
      {faqs?.map((faq, index) => (
        <div key={index} className={styles.faqBox}>
          <div className={styles.faqBoxHeader} onClick={() => toggleFaq(index)}>
            <h3>
              {index + 1}. {faq.question}
            </h3>
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
  );
};

export default Accordion;
