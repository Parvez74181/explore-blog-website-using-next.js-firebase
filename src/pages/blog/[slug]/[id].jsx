import styles from "../../../styles/Cards.module.scss";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useRouter } from "next/router";

export default function Content({ data }) {
  const [post, setPost] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setPost(data[0]);

    onSnapshot(collection(db, "categories"), (querySnapshot) => {
      let list = [];
      querySnapshot?.forEach((doc) => {
        let data = doc.data();
        list.push({ id: doc.id, name: data?.name });
      });
      setCategories(list);
    });

    // to add blank target
    let links = document.querySelectorAll("#desc-full a");
    links.forEach((link) => {
      if (link.parentNode.parentNode.nodeName === "UL") return; // don't need to add blank to the table-of-content of ul tag

      link.target = "_blank";
    });
  }, [data, post]);

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

  // Share link for Facebook
  function createFacebookShareLink(url) {
    window.open(
      `https://www.facebook.com/share.php?u=${encodeURIComponent(url)}`,
      "_blank"
    );
  }

  // Share link for Instagram
  function createInstagramShareLink(url, caption) {
    window.open(
      `https://www.instagram.com/share?url=${encodeURIComponent(
        url
      )}&caption=${encodeURIComponent(caption)}`,
      "_blank"
    );
  }

  // Share link for Twitter
  function createTwitterShareLink(url, text, hashtags) {
    window.open(
      `http://twitter.com/share?&url=${encodeURIComponent(
        url
      )}&text=${text}&hashtags=${encodeURIComponent(hashtags)}`,
      "_blank"
    );
  }

  // Share link for Pinterest
  function createPinterestShareLink(url, description) {
    window.open(
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}&description=${encodeURIComponent(description)}`,
      "_blank"
    );
  }

  // Share link for email
  function createEmailShareLink(subject, body) {
    window.open(
      `mailto:?subject=${encodeURIComponent(
        subject
      )}&body=Hey, I found this article on the web! 😍🤩:  ${encodeURIComponent(
        body
      )}`,
      "_blank"
    );
  }

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`${post?.data?.postData?.metaDescription}`}
        />
        <meta
          name="keywords"
          content={post?.data?.postData?.tag?.map((tag) => {
            return tag;
          })}
        />

        {/* <!-- Open Graph tags --> */}
        <meta
          property="og:title"
          content={`${post?.data?.postData?.title} | 10mBlogs | Discover a World of Diverse
          Insights`}
        />
        <meta
          property="og:description"
          content="Welcome to 10mBlogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          property="og:image"
          content={`https://drive.google.com/uc?export=view&id=${
            post?.data?.postData?.thumbnail.split("/")[5]
          }`}
        />
        <meta property="og:url" content={post?.postData ? location.href : ""} />

        {/* <!-- Twitter Card tags --> */}
        <meta
          name="twitter:card"
          content={`${post?.data?.postData?.title} | 10mBlogs | Discover a World of Diverse Insights`}
        />
        <meta
          name="twitter:title"
          content={`${post?.data?.postData?.title} | 10mBlogs | Discover a World of Diverse Insights`}
        />
        <meta
          name="twitter:description"
          content={`${post?.data?.postData?.metaDescription}`}
        />
        <meta
          name="twitter:image"
          content={`https://drive.google.com/uc?export=view&id=${
            post?.data?.postData?.thumbnail.split("/")[5]
          }`}
        />

        <title>
          {post?.data?.postData?.metaTitle} | 10mBlogs | Discover a World of
          Diverse Insights
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
                <Link href={`/blog/category/${post?.data?.postData?.category}`}>
                  {post?.data?.postData?.category}
                </Link>
              </div>

              {/* title */}
              <h3 className={`my-6 text-4xl font-bold tracking-wider `}>
                {post?.data?.postData?.title}
              </h3>

              {/* image */}

              <Image
                src={`https://drive.google.com/uc?export=view&id=${
                  post?.data?.postData?.thumbnail.split("/")[5]
                }`}
                className="rounded-md shadow-md md:max-h-[500px]"
                width={558}
                height={400}
                style={{
                  width: "100%",
                }}
                alt={post?.data?.postData?.slug}
                priority={false}
              ></Image>

              {/* share options */}
              <div
                className="relative flex justify-between pt-5"
                style={{ width: "100%" }}
              >
                {/* share box */}

                <div
                  className={`${styles["share-box"]} text-2xl flex justify-between items-center`}
                  style={{ width: "50%" }}
                >
                  {/* facebook */}
                  <i
                    title="share by facebook"
                    className="fa-brands fa-facebook-f cursor-pointer"
                    style={{ color: "#3b5998" }}
                    onClick={() => {
                      createFacebookShareLink(location.href);
                    }}
                  ></i>

                  {/* instagram */}
                  <i
                    title="share by instagram"
                    className="fa-brands fa-instagram cursor-pointer"
                    style={{ color: "#fa7e1e " }}
                    onClick={() => {
                      createInstagramShareLink(
                        location.href,
                        post?.data?.postData?.title
                      );
                    }}
                  ></i>

                  {/* twitter */}
                  <i
                    title="share by twitter"
                    className="fa-brands fa-twitter cursor-pointer"
                    style={{ color: "#00acee" }}
                    onClick={() => {
                      createTwitterShareLink(
                        location.href,
                        "Hey, I found this article on the web! 😍🤩",
                        post?.data?.postData?.tag
                      );
                    }}
                  ></i>

                  {/* email */}
                  <i
                    title="share by email"
                    className="fa-regular fa-envelope cursor-pointer"
                    onClick={() => {
                      createEmailShareLink(
                        post?.data?.postData?.title,
                        location.href
                      );
                    }}
                  ></i>

                  {/* pinterest */}
                  <i
                    title="share by pinterest"
                    className="fa-brands fa-pinterest-p cursor-pointer"
                    style={{ color: "#E60023" }}
                    onClick={() => {
                      createPinterestShareLink(
                        location.href,
                        post?.data?.postData?.metaDescription
                      );
                    }}
                  ></i>
                </div>
              </div>

              {/* description */}

              <div
                id="desc-full"
                className={`${styles["desc-full"]} my-6 font-normal  tracking-wider leading-8 text-black `}
              >
                {parse(`${post?.data?.postData?.description}`)}
              </div>
            </div>

            <Link
              href={"#slug-main"}
              className="fixed bottom-5 right-5 w-10 h-10 rounded-full shadow-xl flex justify-center items-center bg-gray-500"
            >
              <i className="fa-solid fa-angle-up text-white text-xl"></i>
            </Link>
          </div>

          {/* ////////////////////// */}
          {/* right side bar */}
          <div
            className="sticky top-0 md:top-8 md:mt-20  w-full lg:w-3/12 flex flex-col"
            style={{ minHeight: "100vh", gap: "50px" }}
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
                {categories?.map((category) => {
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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const blog = []; //
  let blogsList = [];
  const selectedPosts = []; // to store random index posts
  const randomIndices = []; // to store random indexs
  const count = 3;

  // Fetch data from Firebase
  const docSnap = await getDoc(doc(db, "blogs", id));
  const data = docSnap.data();

  // serializing the data
  const formattedData = {
    ...data,
    timeStamp: data.timeStamp.toDate().toISOString(),
  };
  // add data to the list variable
  blog.unshift({ id: docSnap.id, data: formattedData });

  // Pass data to the page via props
  return { props: { data: blog } };
}
