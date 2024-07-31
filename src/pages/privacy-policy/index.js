import { ApiGet } from "@/helpers/API/ApiData";
import PrivacyPolicy from '@/module/privacyPolicy'
import React from 'react'

export default function index({getPrivacyAndPolicyData}) {
  return (
    <div>
      <PrivacyPolicy displayData={"Privacy Policy"}  displaySingleData={getPrivacyAndPolicyData}/>
    </div>
  )
}
export async function getServerSideProps() {
  try {
    const privacyAndPolicyData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy?title=policy`).then((resp) => resp?.data?.payload?.privacy_policy);

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
