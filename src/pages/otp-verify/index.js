import NextSEO from "@/common/NextSeo";
import OtpVerificationModal from "@/shared/components/otpVerificationModal";

const otpVerify = ({ seoData }) => {
  return (
    <>
      <NextSEO seo={seoData} />
      <OtpVerificationModal />
    </>
  );
};

export default otpVerify;
export async function getServerSideProps() {
  try {
    const seoData = {
      Title: "OTP Verification | WriterTools",
      Description: "Verify your email address with the OTP sent to your inbox to complete the sign-up process and access WriterTools.",
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
