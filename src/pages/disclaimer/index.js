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
    const disclaimerData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=disclaimer`).then((resp) => resp?.data?.payload?.privacy_policy);
    const seoData = {
      Title: disclaimerData[0]?.metaTitle || "",
      Description: disclaimerData[0]?.metaDescription || "",
      KeyWords: disclaimerData[0]?.metaKeyWords?.join(", ") || "",
      url: `${EXTERNAL_DATA_URL}/disclaimer`,
    };
    return {
      props: {
        getPrivacyAndPolicyData: disclaimerData[0] || [],
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
