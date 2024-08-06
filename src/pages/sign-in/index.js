import dynamic from "next/dynamic";
const SigninModal = dynamic(() => import("@/shared/components/signinModal"));
const NextSEO = dynamic(() => import("@/common/NextSeo"));
export default function index({ seoData }) {
  return (
    <>
      <NextSEO seo={seoData} />
      <SigninModal />
    </>
  );
}
export async function getServerSideProps() {
  try {
    const seoData = {
      Title: "SignIn  | WriterTools",
      Description: "Access your WriterTools account to unlock powerful writing features and tools.",
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
