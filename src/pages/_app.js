import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/scss/main.scss";
import Wrapper from "@/shared/components/wrapper";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Toaster
        containerStyle={{
          zIndex: "99999999999999",
        }}
        position="top-center"
        reverseOrder={false}
      />
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
}
