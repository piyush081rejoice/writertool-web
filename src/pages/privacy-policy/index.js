import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL, PRIVACY_POLICY_PAGE_URL } from "@/helpers/Constant";
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
      Title: privacyAndPolicyData[0]?.metaTitle || "",
      Description: privacyAndPolicyData[0]?.metaDescription || "",
      KeyWords: privacyAndPolicyData[0]?.metaKeyWords?.join(", ") || "",
      url: `${EXTERNAL_DATA_URL}/privacy-policy`,
      OG_Img:PRIVACY_POLICY_PAGE_URL,
      OG_Img_alt_tag:"privacy-policy"
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
