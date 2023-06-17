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

export default function Content({ data, randomPosts }) {
  const [post, setPost] = useState([]);
  const [randomPost, setRandomPost] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setPost(data[0]);
    setRandomPost(randomPosts);

    onSnapshot(collection(db, "categories"), (querySnapshot) => {
      let list = [];
      querySnapshot?.forEach((doc) => {
        let data = doc.data();
        list.push({ id: doc.id, name: data?.name });
      });
      setCategories(list);
    });
    document.title = `Explore Blog | ${post?.data?.postData?.title}`;
  }, [data, post, randomPosts]);

  // Share link for Facebook
  function createFacebookShareLink(url, title, description, imageUrl) {
    window.open(
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(
        description
      )}&picture=${encodeURIComponent(imageUrl)}`,
      "_blank"
    );
  }

  // Share link for Instagram
  function createInstagramShareLink(imageUrl, caption) {
    window.open(
      `https://www.instagram.com/share?url=${encodeURIComponent(
        imageUrl
      )}&caption=${encodeURIComponent(caption)}`,
      "_blank"
    );
  }

  // Share link for Twitter
  function createTwitterShareLink(url, text, hashtags) {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}&hashtags=${encodeURIComponent(
        hashtags
      )}`,
      "_blank"
    );
  }

  // Share link for Pinterest
  function createPinterestShareLink(url, imageUrl, description) {
    window.open(
      `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
        url
      )}&media=${encodeURIComponent(imageUrl)}&description=${encodeURIComponent(
        description
      )}`,
      "_blank"
    );
  }

  // Share link for email
  function createEmailShareLink(subject, body) {
    window.open(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
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
          content={`${post?.data?.postData["meta-description"]}`}
        />
        <meta
          name="keywords"
          content={post?.data?.postData?.tag?.map((tag) => {
            return tag;
          })}
        />

        <title>
          Explore Blog | {post?.data?.postData?.title} | Discover a World of
          Diverse Insights
        </title>
      </Head>
      <main className={`${styles["slug-main"]} min-h-screen bg-white`}>
        <section
          className="flex justify-center items-start flex-wrap  py-10 pt-16 mx-5 md:mx-20 "
          style={{ gap: "100px" }}
        >
          {/* left side main content  */}
          <div
            className="relative w-full lg:w-7/12  flex flex-col"
            style={{
              minHeight: "100vh",
              gap: "50px",
            }}
          >
            {/* main content */}
            <div className="relative" style={{ width: "100%" }}>
              {/* category */}
              <div className={`${styles["category"]} my-5  tracking-widest`}>
                <Link href="#">{post?.data?.postData?.category}</Link>
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
                className="rounded-md shadow-md md:h-96"
                width={558}
                height={350}
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
                  <i
                    title="share by facebook"
                    className="fa-brands fa-facebook-f cursor-pointer"
                    style={{ color: "#3b5998" }}
                    onClick={() => {
                      createFacebookShareLink(
                        location.origin,
                        post?.data?.postData?.title,
                        post?.data?.postData?.metaDescription,
                        `https://drive.google.com/uc?export=view&id=${
                          post?.data?.postData?.thumbnail.split("/")[5]
                        }`
                      );
                    }}
                  ></i>
                  <i
                    title="share by instagram"
                    className="fa-brands fa-instagram cursor-pointer"
                    style={{ color: "#fa7e1e " }}
                    onClick={() => {
                      createInstagramShareLink(
                        `https://drive.google.com/uc?export=view&id=${
                          post?.data?.postData?.thumbnail.split("/")[5]
                        }`,
                        post?.data?.postData?.title
                      );
                    }}
                  ></i>
                  <i
                    title="share by twitter"
                    className="fa-brands fa-twitter cursor-pointer"
                    style={{ color: "#00acee" }}
                    onClick={() => {
                      createTwitterShareLink(
                        location.origin,
                        post?.data?.postData?.title,
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
                        location.origin,
                        `https://drive.google.com/uc?export=view&id=${
                          post?.data?.postData?.thumbnail.split("/")[5]
                        }`,
                        post?.data?.postData?.metaDescription
                      );
                    }}
                  ></i>
                </div>
              </div>

              {/* description */}

              <div
                className={`${styles["desc-full"]} my-6 font-normal  tracking-wider leading-8 text-black `}
              >
                {parse(`${post?.data?.postData?.description}`)}
              </div>
            </div>
          </div>

          {/* ////////////////////// */}
          {/* right side bar */}
          <div
            className="sticky top-8 mt-20 w-full lg:w-4/12 flex flex-col"
            style={{ minHeight: "100vh", gap: "50px" }}
          >
            {/* related content or post */}
            <div
              className="relative flex flex-col gap-8 "
              style={{ width: "100%" }}
            >
              {/* related content box */}
              <h5
                className={`${styles["related-post-heading"]} text-xl font-bold tracking-widest`}
              >
                Related Post
              </h5>
              {randomPost?.map((post) => {
                let date = new Date(post?.data?.timeStamp);
                let year = date.getFullYear();
                const months = [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ];
                let month = months[date.getMonth()];

                let day = date.getDay();
                return (
                  <Link
                    href={`/blog/${post?.data?.postData?.slug}/${post?.id}`}
                    className="flex flex-col border rounded-lg md:flex-row md:max-w-xl border-none"
                  >
                    <Image
                      src={`https://drive.google.com/uc?export=view&id=${
                        post.data.postData.thumbnail.split("/")[5]
                      }`}
                      className="object-cover rounded w-full md:h-24 md:w-40"
                      width={372}
                      height={372}
                      alt={post?.data?.postData?.title}
                    ></Image>

                    <div className="flex flex-col justify-between md:pl-4 my-3 md:my-0 leading-normal">
                      <h5
                        className={`${styles["related-post-title"]} mb-2 text-xl font-bold tracking-wider `}
                      >
                        {post.data.postData.title}
                      </h5>
                      <span className={`${styles["upload-date"]} `}>
                        {`${month} ${day}, ${year}`}
                      </span>
                    </div>
                  </Link>
                );
              })}
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

  // ************ RANDOM BLOGS SELECTION ************  //
  let allBlogs = await getDocs(collection(db, "blogs"));
  allBlogs.forEach((doc) => {
    const formattedData = {
      ...doc.data(),
      timeStamp: doc.data().timeStamp.toDate().toISOString(),
    };
    blogsList.unshift({ id: doc.id, data: formattedData });
  });

  // Select a random blog post
  while (randomIndices.length < count) {
    const randomIndex = Math.floor(Math.random() * blogsList.length);
    if (!randomIndices.includes(randomIndex)) {
      randomIndices.push(randomIndex);
    }
  }

  randomIndices.forEach((index) => {
    selectedPosts.push(blogsList[index]);
  });

  // Pass data to the page via props
  return { props: { data: blog, randomPosts: selectedPosts } };
}
