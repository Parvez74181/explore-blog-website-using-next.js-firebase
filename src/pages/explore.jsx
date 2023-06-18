import Card from "../../components/Card";
import styles from "../styles/Explore.module.scss";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import swal from "sweetalert";
import Lottie from "lottie-react";
import animationData from "../../public/explore-bg.json";
import Head from "next/head";

// to get more blogs by InfiniteScroll component
async function getBlogs(lastVisible = null) {
  const blogCollection = collection(db, "blogs");
  const limitItem = 12; // how many item do i want to show

  // if lastVisible is not null then add startAfter to the query
  const queryCursor = lastVisible
    ? query(
        blogCollection,
        orderBy("timeStamp", "desc"),
        startAfter(lastVisible),
        limit(limitItem)
      )
    : query(blogCollection, orderBy("timeStamp", "desc"), limit(limitItem));

  try {
    const documentSnapshots = await getDocs(queryCursor); // get the documents from the firebase
    // serialize the data and store them into list variable
    const list = documentSnapshots?.docs?.map((doc) => {
      const data = doc?.data();
      const formattedData = {
        ...data,
        timeStamp: data?.timeStamp?.toDate().toISOString(),
      };

      return { id: doc?.id, data: formattedData };
    });

    const lastVisibleDoc =
      documentSnapshots?.docs[documentSnapshots?.docs?.length - 1]; // Get the last visible document

    const isLastDocument =
      documentSnapshots?.empty || documentSnapshots?.docs.length < limitItem; // check is this the last document or not

    return { list, lastVisible: isLastDocument ? null : lastVisibleDoc };
  } catch (error) {
    swal({
      title: "Error",
      text: "Something Wrong! Please try again later!",
      icon: "error",
    });
  }
}

export default function Explore({ data, lastVisibleId }) {
  const [postData, setPostData] = useState([]);
  const [currentLastVisible, setCurrentLastVisible] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setPostData(data);

    // get the lastVisible blog from the getServerSideProps lastVisibleId and set them to currentLastVisible
    const getLastVisibleBlogById = async () => {
      let lastVisibleRef = await getDoc(doc(db, "blogs", lastVisibleId));
      setCurrentLastVisible(lastVisibleRef);
    };
    if (lastVisibleId !== null) getLastVisibleBlogById();
  }, [data]);

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
    // if currentLastVisible is not null only then call the getBlogs funtion
    // cause if there is no more data then do not need to call the getBlogs function
    if (currentLastVisible !== null) {
      const { list, lastVisible: newLastVisible } = await getBlogs(
        currentLastVisible
      );

      // setPostData((prevData) => [...prevData, ...list]);
      setPostData((prevData) => prevData.concat(list));

      // if newLastVisible is not null then set the currentLastVisible to newLastVisible else setCurrentLastVisible null
      // cause if currentLastVisible is not set null when all data has been fethced, then the getBlogs function will be call everytime  when user approach to the bottom of content and this will add the same data to the postData which is not good
      if (newLastVisible !== null) {
        setCurrentLastVisible(newLastVisible);
      } else {
        setCurrentLastVisible(null);
      }
    }
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

        <title>
          10m Blogs | Explore | Discover a World of Diverse Insights
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
            dataLength={postData.length}
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

export async function getServerSideProps() {
  const { list, lastVisible } = await getBlogs();
  // Pass data to the page via props
  return {
    props: { data: list, lastVisibleId: lastVisible ? lastVisible.id : null },
  };
}
