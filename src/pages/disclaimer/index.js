import { ApiGet } from "@/helpers/API/ApiData";
import dynamic from "next/dynamic";
const PrivacyPolicy = dynamic(() => import("@/module/privacyPolicy"));
const NextSEO = dynamic(() => import("@/common/NextSeo"));

export default function index({ getPrivacyAndPolicyData ,seoData }) {
  return (
    <>
      <NextSEO seo={seoData} />
      <div>
        <PrivacyPolicy displayData={"Disclaimer"} displaySingleData={getPrivacyAndPolicyData} />
      </div>
    </>
  );
}
export async function getServerSideProps() {
  try {
    const privacyAndPolicyData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=disclaimer`).then((resp) => resp?.data?.payload?.privacy_policy);
    const seoData = {
      Title: "Disclaimer | WriterTools",
      Description: "Read the WriterTools Disclaimer to understand the limitations and liabilities regarding the use of our services.",
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
