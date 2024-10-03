import NextSEO from "@/common/NextSeo";
import SignupModal from "@/shared/components/signupModal";


export default function index({ seoData }) {
  return (
    <>
      <NextSEO seo={seoData} />
      <SignupModal />
    </>
  );
}
export async function getServerSideProps() {
  try {
    const seoData = {
      Title: "SignUp | WriterTools",
      Description: "Create your WriterTools account to start enjoying personalized writing tools and resources.",
      robots: "noindex, nofollow",
      googlebot: "noindex, nofollow",
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
