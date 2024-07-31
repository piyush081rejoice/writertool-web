import { marked } from "marked";
import Breadcrumb from "../writeBlog/breadcrumb";
import styles from "./privacyPolicy.module.scss";
export default function PrivacyPolicy({ displaySingleData, displayData }) {


  return (
    <>
      <Breadcrumb dynamicList={displayData} />
      <div className={styles.privacyPolicyAlignment}>
        <div className="container">
          {/* <h1>{displayData}</h1> */}
          <div style={styles.PrivacyAndPolicyModalModalWrapper}>
            {displaySingleData ? (
              <div >
                {/* <h2>{displaySingleData?.title}</h2> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked(displaySingleData?.content || "-"),
                  }}
                />
              </div>
            ) : (
              ` No ${displayData} Found `
            )}
          </div>
        </div>
      </div>
    </>
  );
}
