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
      Title: "Terms and Conditions | WriterTools",
      Description: "Review the Terms and Conditions for using WriterTools services and products.",
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
