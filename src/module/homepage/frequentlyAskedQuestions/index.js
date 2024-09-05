import WaveIcon from "@/assets/icons/waveIcon";
import styles from "./frequentlyAskedQuestions.module.scss";
import Accordion from "@/common/Accordion";
import { FAQ_DATA } from "@/helpers/Constant";
export default function FrequentlyAskedQuestions() {
  return (
    <div className={styles.frequentlyAskedQuestions}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.gridItems}>
            <div className={styles.title}>
              <h2>Frequently Asked Questions</h2>
              <WaveIcon />
            </div>
            <Accordion FAQs={FAQ_DATA} />
          </div>
          <div className={styles.gridItems}></div>
        </div>
      </div>
    </div>
  );
}
