import Card from "../../components/Card";
import styles from "../styles/Explore.module.scss";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import swal from "sweetalert";
import Lottie from "lottie-react";
import animationData from "../../public/explore-bg.json";
import Head from "next/head";
import axios from "axios";
import prisma from "../../lib/prisma";

// to get more blogs by InfiniteScroll component
async function getBlogs(page) {
  const pageSize = 12; // Number of items to load per page
  try {
    let res = await axios(`/api/getBlogs?page=${page}&pageSize=${pageSize}`);
    return res.data;
  } catch (error) {
    swal({
      title: "Error",
      text: "Something Wrong! Please try again later!",
      icon: "error",
    });
  }
}

export default function Explore({ initialBlogs }) {
  const [postData, setPostData] = useState([]);
  const [currentLastVisible, setCurrentLastVisible] = useState(null);
  const router = useRouter();
  const page = useRef(1);

  useEffect(() => {
    setPostData(JSON.parse(initialBlogs));
  }, [initialBlogs]);

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
  // to load more blogs when user approach to the bottom of content
  const loadMoreBlogs = async () => {
    page.current = page.current + 1; // increament the page number
    const blogs = await getBlogs(page.current);
    setPostData((prevData) => [...prevData, ...blogs]);

    if (blogs.length === 0) setCurrentLastVisible(null);
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Welcome to 10m Blogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          name="keywords"
          content="Recipes, cuisines, gastronomy, culinary experiences, Techniques, tricks, culinary prowess, kitchen skills, Honest, unbiased, recommendations, informed decisions, Destinations, travel guides, personal experiences, tips, Personal development, wellness, productivity, self-care, Home Decor, Ideas, inspiration, DIY projects, cozy living spaces, Crafts and DIY, Creativity, DIY projects, crafts, artistic endeavors, Book and Movie Reviews, Thoughts, recommendations, genres, themes, Fashion and Beauty, Fashion trends, beauty tips, product reviews, Health and Fitness, Advice, workout routines, nutrition tips, wellness, Technology, Advancements, gadget reviews, tech news, insights, Inspiration and Motivation, Uplifting stories, motivational quotes, personal growth, Parenting and Family, Gardening and Plants, Pets and Animals, Photography, Finance and Money Management, Art and Design, Career Development, Social Issues and Activism, Travel Tips, Relationships and Dating, Self-Care and Mental Health, Home Organization, Beauty and Skincare, Green Living and Sustainability, Home Renovation, Entrepreneurship and Business, Personal Stories and Reflections, Food, Cooking Tips, Product Reviews, Travel Adventures, Lifestyle, Home Decor, Crafts and DIY, Book and Movie Reviews, Fashion and Beauty, Health and Fitness, Technology, Inspiration and Motivation, Parenting and Family, Gardening and Plants, Pets and Animals, Photography, Finance and Money Management, Art and Design, Career Development, Social Issues and Activism, Travel Tips, Relationships and Dating, Self-Care and Mental Health, Home Organization, Beauty and Skincare, Green Living and Sustainability, Home Renovation, Entrepreneurship and Business, Personal Stories and Reflections, Recipes, Culinary Experiences, Travel Guides, Personal Development, Wellness Tips, DIY Projects, Artistic Endeavors, Product Recommendations, Technology News, Uplifting Stories, Gardening Tips, Pet Care, Budgeting, Career Advice, Social Justice, Healthy Living, Organization Ideas, Fashion Trends, Fitness Tips, Motivational Quotes, Creative Projects, Book Recommendations, Movie Reviews, Home Improvement, Entrepreneurial Success, Personal Growth, Eco-Friendly Living"
        />

        {/* <!-- Open Graph tags --> */}
        <meta
          property="og:title"
          content="Explore New Horizons on our Explore Page! | Explore | 10mBlogs"
        />
        <meta
          property="og:description"
          content="Welcome to 10mBlogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/66HmCcBH/Screenshot-2023-06-19-111850.png"
        />
        <meta property="og:url" content="https://www.10mblogs.xyz" />

        {/* <!-- Twitter Card tags --> */}
        <meta
          name="twitter:card"
          content="Explore New Horizons on our Explore Page! | Explore | 10mBlogs"
        />
        <meta
          name="twitter:title"
          content="Explore New Horizons on our Explore Page! | Explore | 10mBlogs"
        />
        <meta
          name="twitter:description"
          content="Welcome to 10mBlogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/66HmCcBH/Screenshot-2023-06-19-111850.png"
        />

        <title>
          Explore New Horizons on our Explore Page! | Explore | 10mBlogs
        </title>
      </Head>

      <main className={`min-h-screen`}>
        <section
          style={{
            backgroundImage: "url('/explore-page-bg-shadow.svg')",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* hero section for explore page */}
          <div
            className={`flex justify-center items-center flex-col lg:flex-row px-5 md:px-20 gap-5 pt-5`}
          >
            <div className="w-full md:w-1/2 lg:order-last">
              {/* texts */}
              <div className="w-full ">
                <h2
                  className={`${styles["explore-main-title"]} text-5xl md:text-6xl lg:text-8xl tracking-wider text-center`}
                >
                  Explore
                </h2>
                <p
                  className={`${styles["explore-paragraph"]} text-md text-center mt-5 leading-8`}
                >
                  Our Explore Page is a treasure trove of inspiration, practical
                  tips, and captivating content. Immerse yourself in
                  mouthwatering recipes, honest reviews, exciting DIY projects,
                  and more. Join us on this adventure of exploration and unlock
                  new dimensions of joy and fulfillment. Let's dive in together!
                </p>
              </div>

              {/* search input */}
              <div className="lg:flex-grow flex my-5 flex-col md:items-start  items-center text-center">
                <div className="flex w-full md:justify-start justify-center items-end">
                  <div className="relative mx-auto w-[90%] lg:w-full xl:w-2/3 flex justify-center items-center">
                    <input
                      type="search"
                      id="search"
                      name="search"
                      placeholder="Top 10 books..."
                      className="w-full bg-opacity-50 border-2 bg-transparent border-gray-500 focus:shadow-xl focus:bg-transparent text-base placeholder-gray-500 outline-none text-black py-2 leading-8 transition-colors duration-200 ease-in-out rounded-full px-5 pr-12"
                      onKeyDown={searchHandler}
                    />
                    {/* search icon */}
                    <button
                      onClick={searchHandler}
                      className="absolute right-3"
                    >
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
            </div>

            <Lottie animationData={animationData} className="w-full md:w-1/2" />
          </div>

          {/* blogs */}
          <InfiniteScroll
            dataLength={postData?.length}
            next={loadMoreBlogs}
            hasMore={currentLastVisible !== null}
            loader={
              // this is the loading animtion to show that we have more data to read
              <div className="flex items-center justify-center w-full">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </div>
            }
            endMessage={
              <div className="text-blue-500 mb-5 text-center flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 mr-1.5 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Yay! You have seen it all
              </div>
            }
            style={{ overflow: "hidden" }}
          >
            <div className="mx-auto mt-5" style={{ width: "80%" }}>
              <h1
                className={`${styles["all-post-title"]} ms-2 md:ms-20 text-2xl md:text-3xl `}
              >
                All Posts
              </h1>
            </div>
            <section
              className="content flex flex-wrap justify-center items-center my-10 mx-auto"
              style={{ gap: "50px", width: "80%" }}
            >
              {postData?.map((post) => {
                return <Card postData={post} key={post.id} />;
              })}
            </section>
          </InfiniteScroll>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const page = 1;
  const pageSize = 12;
  try {
    const initialBlogs = await prisma.blogs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize, // Calculate the number of items to skip. ex: page is 2 then 2-1 = 1 and finallay pageSize is show many items do I want to show, so 1*pageSize = 1*12 = 12 to skip
      take: pageSize, // Define the number of items to take per page
    });

    return {
      props: {
        initialBlogs: JSON.stringify(initialBlogs),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        initialBlogs: null,
      },
      revalidate: 60,
    };
  }
}
