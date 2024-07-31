import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/scss/main.scss";
import Wrapper from "@/shared/components/wrapper";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      ?.filter((t) => t.visible)
      ?.filter((item, i) => i >= TOAST_LIMIT)
      ?.forEach((t) => toast?.dismiss(t.id));
  }, [toasts]);
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
