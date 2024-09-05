import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import PrivacyPolicy from "@/module/privacyPolicy";


export default function index({ getPrivacyAndPolicyData, seoData }) {
  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <PrivacyPolicy displayData={"Privacy Policy"} displaySingleData={getPrivacyAndPolicyData} />
      </div>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const privacyAndPolicyData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=policy`).then((resp) => resp?.data?.payload?.privacy_policy);
    const seoData = {
      Title: "WriterTools | Privacy Policy",
      Description: "Ensure your data's safety and transparency. Review our privacy practices to understand how your information is collected, protected, and your rights.",
      url:`${EXTERNAL_DATA_URL}/privacy-policy`
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
