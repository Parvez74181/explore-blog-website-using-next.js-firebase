import Head from "next/head";

const Sitemap = () => {
  return (
    <>
      <Head>
        <script src="https://www.mysitemapgenerator.com/api/embedmap.min.js"></script>
      </Head>
      <div
        className="min-h-screen mx-auto my-auto"
        id="mysitemapgenerator_loadcorsdata"
        data-token="6b908a1966d5a647695c33f6ce880990"
        data-domain="www.mysitemapgenerator.com"
      ></div>
    </>
  );
};

export default Sitemap;
