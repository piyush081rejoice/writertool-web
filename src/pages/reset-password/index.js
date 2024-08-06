import dynamic from "next/dynamic";
const SetNewPassword = dynamic(() => import("@/shared/components/setNewPassword"));
const NextSEO = dynamic(() => import("@/common/NextSeo"));

const ResetPassword = ({ seoData }) => {
  return (
    <>
      <NextSEO seo={seoData} />
      <SetNewPassword />
    </>
  );
};

export default ResetPassword;
export async function getServerSideProps() {
  try {
    const seoData = {
      Title: "Reset-Password | WriterTools",
      Description: "Reset your WriterTools password to regain access to your account and continue your writing journey.",
    };

    return {
      props: {
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
