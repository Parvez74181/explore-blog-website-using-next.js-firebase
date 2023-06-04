import { Html, Head, Main, NextScript } from "next/document";

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

        <meta name="theme-color" content="#111827" />
        <meta name="msapplication-TileColor" content="#111827" />

        <meta charSet="UTF-8" />

        <meta
          name="description"
          content="Brief description of your blog or blog post."
        />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />

        {/* <!-- Open Graph tags --> */}
        <meta property="og:title" content="Your Blog Title" />
        <meta
          property="og:description"
          content="Brief description of your blog or blog post."
        />
        <meta
          property="og:image"
          content="URL to the featured image for your blog post."
        />
        <meta property="og:url" content="URL of the blog post or website." />

        {/* <!-- Twitter Card tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Blog Title" />
        <meta
          name="twitter:description"
          content="Brief description of your blog or blog post."
        />
        <meta
          name="twitter:image"
          content="URL to the featured image for your blog post."
        />

        <meta name="author" content="Your Name" />
        <link
          rel="canonical"
          href="URL of the canonical version of the page."
        />
        <meta name="robots" content="index,follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
