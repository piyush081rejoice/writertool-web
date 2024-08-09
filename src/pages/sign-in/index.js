import NextSEO from "@/common/NextSeo";
import SigninModal from "@/shared/components/signinModal";

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
