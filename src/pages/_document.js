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

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        <meta charSet="UTF-8" />

        {/* <!-- Open Graph tags --> */}
        <meta
          property="og:title"
          content="Explore Blog | Discover a World of Diverse Insights"
        />
        <meta
          property="og:description"
          content="Welcome to Explore Blog, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta property="og:image" content={"/logo.svg"} />
        <meta property="og:url" content="https://www.explore-blog.com" />

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

        <meta name="author" content="Parvez" />

        <meta name="robots" content="index,follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
