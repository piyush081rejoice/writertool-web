import { ApiGet } from "@/helpers/API/ApiData";
import PrivacyPolicy from '@/module/privacyPolicy'
import React from 'react'

export default function index({getPrivacyAndPolicyData}) {
  return (
    <div>
      <PrivacyPolicy displayData={"Terms And Conditon"}  getPrivacyAndPolicyData={getPrivacyAndPolicyData}/>
    </div>
  )
}
export async function getServerSideProps() {
  try {
    const privacyAndPolicyData = await ApiGet(`admin-services/dashboard/get-all-privacy-policy`).then((resp) => resp?.data?.payload?.privacy_policy);

    return {
      props: {
        getPrivacyAndPolicyData: privacyAndPolicyData || [],
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
