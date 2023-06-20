import { Html, Head, Main, NextScript } from "next/document";
import { breadcrumbListJsonLd } from "../../utils/breadcrumbListJsonLd ";
import { recipeJsonLd } from "../../utils/recipeJsonLd";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* font awesome cdn */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        <meta charSet="UTF-8" />

        <meta name="author" content="Parvez" />

        <meta name="robots" content="index,follow" />

        {/* google indexing meta tag */}
        <meta
          name="google-site-verification"
          content="t2bQ1p8cAJTr0lMcrtGMULZirb0GlVA_W76s0VcgRnI"
        />

        {/* bing indexing meta tag */}
        <meta name="msvalidate.01" content="CAE2B85CC2AA097D750003ECA98D55AA" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbListJsonLd),
          }}
        ></script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(recipeJsonLd),
          }}
        ></script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
