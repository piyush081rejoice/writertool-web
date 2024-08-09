import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
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
      Title: "Privacy Policy | WriterTools",
      Description: "Read the WriterTools Privacy Policy to understand how we protect your personal information.",
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
