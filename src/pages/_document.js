import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script id="gtag" async src="https://www.googletagmanager.com/gtag/js?id=G-HNP2GPB9RT"></script>
        <script
          id="googleTagManager"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
                     function gtag(){dataLayer.push(arguments);}
                     gtag('js', new Date());
                     gtag('config', 'G-HNP2GPB9RT');`,
          }}
        ></script>
        <meta name="google-site-verification" content="TzrvNnnMxbg6PY_lwqfE6Jkyi-3oaqSiWj5S8ksn1vc" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
