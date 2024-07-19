import Breadcrumb from "@/module/writeBlog/breadcrumb";
import styles from "./privacypolicy.module.scss";
import { marked } from "marked";
const PrivacyAndPolicyModal = ({ getPrivacyAndPolicyData }) => {
  return (
    <>
      <Breadcrumb dynamicList={"Privacy And Policy"} />
    <div style={styles.PrivacyAndPolicyModalModalWrapper}>
      {getPrivacyAndPolicyData?.length > 0
        ? getPrivacyAndPolicyData?.map((data, index) => (
            <div key={index}>
              <h2>{data?.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(data?.content || "-"),
                }}
              />
            </div>
          ))
        : " No Privacy And Policy Found"}
    </div>
    </>
  );
};

export default PrivacyAndPolicyModal;
