import React, { useEffect, useState } from "react";
import styles from "./privacyPolicy.module.scss";
import Breadcrumb from "../writeBlog/breadcrumb";
import { marked } from "marked";
export default function PrivacyPolicy({ getPrivacyAndPolicyData, displayData }) {
  const [displaySingleData, setDisplaySingleData] = useState({});

  useEffect(() => {
    const singleData = getPrivacyAndPolicyData?.find((data) => data?.title == displayData);
    setDisplaySingleData(singleData);
  }, []);

  return (
    <>
      <Breadcrumb dynamicList={displayData} />
      <div className={styles.privacyPolicyAlignment}>
        <div className="container">
          <h1>{displayData}</h1>
          <div style={styles.PrivacyAndPolicyModalModalWrapper}>
            {displaySingleData ? (
              <div >
                <h2>{displaySingleData?.title}</h2>
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
