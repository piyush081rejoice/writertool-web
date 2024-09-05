import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import PrivacyPolicy from "@/module/privacyPolicy";

export default function index({ getPrivacyAndPolicyData ,seoData }) {
  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <PrivacyPolicy displayData={"Terms And Condition"} displaySingleData={getPrivacyAndPolicyData} />
      </div>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const privacyAndPolicyData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=terms`).then((resp) => resp?.data?.payload?.privacy_policy);
    const seoData = {
      Title: "WriterTools AI | Terms & Conditions Overview",
      Description: "Understand the guidelines for using WriterTools.ai services and your responsibilities as a user of the platform.",
      url:`${EXTERNAL_DATA_URL}/terms-and-conditions`
    };
    return {
      props: {
        getPrivacyAndPolicyData: privacyAndPolicyData[0] || [],
        seoData: seoData || null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "Facing error",
      },
    };
  }
}
