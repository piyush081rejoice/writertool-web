import { ApiGet } from "@/helpers/API/ApiData";
import PrivacyPolicy from "@/module/privacyPolicy";

export default function index({ getPrivacyAndPolicyData }) {
  return (
    <div>
      <PrivacyPolicy displayData={"Terms And Conditon"} displaySingleData={getPrivacyAndPolicyData} />
    </div>
  );
}
export async function getServerSideProps() {
  try {
    const privacyAndPolicyData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=terms`).then((resp) => resp?.data?.payload?.privacy_policy);

    return {
      props: {
        getPrivacyAndPolicyData: privacyAndPolicyData[0] || [],
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
