import NextSEO from "@/common/NextSeo";
import { ApiGet } from "@/helpers/API/ApiData";
import { EXTERNAL_DATA_URL } from "@/helpers/Constant";
import PrivacyPolicy from "@/module/privacyPolicy";


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
      Title: "WriterTools AI | Disclaimer Policy",
      Description: "Read WriterTools AI limitations of liability and disclaimers for information use to be aware of our legal obligations and your responsibilities.",
      url:`${EXTERNAL_DATA_URL}/disclaimer`
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
