import styles from "../../../styles/Cards.module.scss";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";
import axios from "axios";

export default function Content({ blogs, categories }) {
  const [post, setPost] = useState([]);
  const [allCategories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setPost(blogs);
    setCategories(categories);

    // to add blank target
    let descFullLinks = document.querySelectorAll("#desc-full a");
    descFullLinks.forEach((link) => {
      if (link.parentNode.parentNode.nodeName === "UL") return; // don't need to add blank to the table-of-content of ul tag
      link.target = "_blank";
    });

    // Scroll to the heading when a link is clicked
    // i did this cause when i submit my blog to server, the table of content takes me here:https://www.10mblogs.xyz/admin/create-post#heading1

    const links = document.querySelectorAll("#table-of-content a");
    links.forEach((link) => {
      const targetHeadingId = link.getAttribute("href").split("#")[1];
      link.href = `#${targetHeadingId}`;
    });
  }, []);

  // search handler
  const searchHandler = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      let searchText = e.target.value.trim().toLowerCase();
      if (searchText) router.push(`/blog/search/${searchText}`);
    } else if (e.type === "click") {
      let parentNodeItem = e.target.parentNode.parentNode;
      let searchInput = parentNodeItem.querySelector("#search");

      searchInput = searchInput?.value?.trim().toLowerCase();
      if (searchInput) router.push(`/blog/search/${searchInput}`);
    }
  };

  return (
    <>
      <Head>
        <meta name="description" content={post?.metaDescription} />
        <meta
          name="keywords"
          content={post?.tag?.map((tag) => {
            return tag;
          })}
        />

        <link rel="canonical" href="https://www.10mblogs.xyz" />

        {/* <!-- Open Graph tags --> */}
        <meta property="og:title" content={post?.metaTitle} />
        <meta property="og:description" content={post?.metaDescription} />
        <meta
          property="og:image"
          content="https://i.postimg.cc/66HmCcBH/Screenshot-2023-06-19-111850.png"
        />
        <meta
          property="og:url"
          content={`https://www.10mblogs.xyz/${post?.slug}/${post?.id}`}
        />

        {/* <!-- Twitter Card tags --> */}
        <meta name="twitter:card" content={post?.metaTitle} />
        <meta name="twitter:title" content={post?.title} />
        <meta name="twitter:description" content={post?.metaDescription} />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/66HmCcBH/Screenshot-2023-06-19-111850.png"
        />

        <title>
          {post?.title
            ? `${post?.title} | Discover a World of Diverse Insights | 10mBlogs`
            : "Discover a World of Diverse Insights | 10mBlogs"}
        </title>
      </Head>

      <main
        id="slug-main"
        className={`${styles["slug-main"]} min-h-screen bg-white`}
      >
        <section
          className="flex justify-center items-start flex-wrap  py-5  mx-5 md:mx-20 "
          style={{ gap: "150px" }}
        >
          {/* left side main content  */}
          <div
            className="relative w-full lg:w-6/12  flex flex-col"
            style={{
              minHeight: "100vh",
              gap: "50px",
            }}
          >
            {/* main content */}
            <div className="relative" style={{ width: "100%" }}>
              {/* category */}
              <div className={`${styles["category"]} my-5  tracking-widest`}>
                <Link href={`/blog/category/${post?.category}`}>
                  {post?.category}
                </Link>
              </div>

              {/* title */}
              <h3 className={`my-6 text-4xl font-bold tracking-wider `}>
                {post?.title}
              </h3>

              {/* image */}

              <Image
                src={
                  post?.thumbnail?.includes("drive.google.com")
                    ? `https://drive.google.com/uc?export=view&id=${
                        post?.thumbnail?.split("/")[5]
                      }`
                    : post?.thumbnail
                }
                className="rounded-md md:max-h-[500px] object-contain"
                width={558}
                height={400}
                style={{
                  width: "100%",
                }}
                alt={post?.slug}
                priority={true}
              ></Image>

              {/* share options */}
              {/* i will do this later */}

              {/* description */}

              <div
                id="desc-full"
                className={`${styles["desc-full"]} my-6 font-normal  tracking-wider leading-8 text-black `}
              >
                {parse(`${post?.description}`)}
              </div>
            </div>

            <Link
              href={"#slug-main"}
              className="fixed bottom-5 right-5 w-12 h-12 rounded-full shadow-xl flex justify-center items-center bg-gray-500 z-50"
            >
              <i className="fa-solid fa-angle-up text-white text-xl"></i>
            </Link>
          </div>

          {/* ////////////////////// */}
          {/* right side bar */}
          <div
            className="sticky top-0 md:top-24 md:mt-20  w-full lg:w-3/12 flex flex-col"
            style={{ gap: "50px" }}
          >
            {/* search input */}
            <div className="relative  md:my-5 text-center">
              <div className="flex w-full md:justify-start flex-col justify-center items-end">
                <p className="text-left w-full md:my-3 pl-2 text-[18px]">
                  Explore more relevant content!
                </p>
                <div className="relative mx-auto w-full flex justify-center items-center">
                  <input
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Top 10 books..."
                    className="w-full bg-opacity-50 border-2 bg-transparent border-gray-500 focus:shadow-xl focus:bg-transparent text-base outline-none placeholder-gray-500 text-black py-2 leading-8 transition-colors duration-200 ease-in-out rounded-full px-5 pr-12"
                    onKeyDown={searchHandler}
                  />
                  {/* search icon */}
                  <button onClick={searchHandler} className="absolute right-3">
                    <svg
                      className="w-8 h-8  text-gray-500 ml-2 cursor-pointer hover:text-gray-700 "
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* categories */}
            <div className="relative " style={{ width: "100%" }}>
              <h5
                className={`${styles["categories-heading"]} text-xl font-bold tracking-widest`}
              >
                Categories
              </h5>
              <ul className={`${styles["categories"]} mt-5`}>
                {allCategories?.map((category) => {
                  return (
                    <li
                      id={category.id}
                      key={category.id}
                      className=" hover:text-gray-600 cursor-pointer transition-all delay-50"
                    >
                      <Link
                        href={`/blog/category/${category.name}`}
                        className="hover:text-gray-600 tracking-wide"
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  // Check if the server is running in production
  if (process.env.MODE === "production") {
    const baseUrl = process.env.URL_ORIGIN;
    try {
      // Fetch the list of slugs and ids from your API
      const res = await fetch(`${baseUrl}/api/getSlugsAndIdsFromDatabase`);
      const data = await res.json();

      // Generate an array of paths
      const paths = data.map(({ slug, id }) => ({
        params: { slug, id: id.toString() },
      }));

      return {
        paths,
        fallback: "blocking",
      };
    } catch (error) {
      console.error("Failed to fetch slugs and ids:", error);
    }
  }

  // Return default paths in non-production environments or on error
  return {
    paths: [{ params: { slug: "asdf", id: "2" } }],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { slug, id } = params;

  try {
    // Check if the server is running in production
    if (process.env.MODE === "production") {
      const baseUrl = process.env.URL_ORIGIN;
      try {
        const res = await fetch(
          `${baseUrl}/api/getBlogByIdAndSlug?slug=${slug}&id=${id}`
        );

        if (!res.ok) {
          throw new Error(`Request failed with status code ${res.status}`);
        }

        const { blogs, categories } = await res.json();

        return {
          props: {
            blogs,
            categories,
          },
          revalidate: 60,
        };
      } catch (error) {
        console.error("Failed to fetch blog by ID and slug:", error);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }

  // Return default props in non-production environments or on error
  return {
    props: {
      blogs: null,
      categories: null,
    },
    revalidate: 60,
  };
}
