import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import PrivacyPolicy from "@/module/privacyPolicy";

export default function index({ getPrivacyAndPolicyData, seoData }) {
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
    const termsAndConditionsData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=terms`).then((resp) => resp?.data?.payload?.privacy_policy);
    const seoData = {
      Title: termsAndConditionsData[0]?.metaTitle || "",
      Description: termsAndConditionsData[0]?.metaDescription || "",
      KeyWords: termsAndConditionsData[0]?.metaKeyWords?.join(", ") || "",
      url: `${EXTERNAL_DATA_URL}/terms-and-conditions`,
    };
    return {
      props: {
        getPrivacyAndPolicyData: termsAndConditionsData[0] || [],
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
