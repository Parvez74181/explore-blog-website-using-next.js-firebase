import { useState, useEffect, useRef } from "react";
import Card from "../../../../components/Card";
import Lottie from "lottie-react";
import animationData from "../../../../public/notFound.json";
import { useRouter } from "next/router";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import Head from "next/head";
import Button from "../../../../components/Button";
import axios from "axios";
import prisma from "../../../../lib/prisma";

// to get more blogs by InfiniteScroll component
async function getBlogs(search, page) {
  const pageSize = 12; // Number of items to load per page
  try {
    let res = await axios(
      `/api/getBlogsBySearch?search=${search}&page=${page}&pageSize=${pageSize}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    swal({
      title: "Error",
      text: "Something Wrong! Please try again later!",
      icon: "error",
    });
  }
}

export default function getPostsBySearch({ blogs }) {
  const router = useRouter();
  const { search } = router.query;
  const [postData, setPostData] = useState([]);
  const page = useRef(1);
  const [currentLastVisible, setCurrentLastVisible] = useState(null);

  useEffect(() => {
    setPostData(JSON.parse(blogs));
  }, [blogs]);
  // to load more blogs when user approach to the bottom of content
  const loadMoreBlogs = async () => {
    page.current = page.current + 1; // increament the page number
    const blogs = await getBlogs(search, page.current);
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

        <title>
          {postData
            ? `${search} | Discover a World of Diverse Insights | 10mBlogs`
            : "Discover a World of Diverse Insights | 10mBlogs"}
        </title>
      </Head>

      <section
        className={`min-h-screen mx-auto mb-10 `}
        style={{ width: "80%" }}
      >
        {postData?.length > 0 ? (
          <>
            <p
              className={`mt-10 text-gray-500 text-md text-center `}
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              Showing results based on '{search}'
            </p>

            <InfiniteScroll
              dataLength={postData.length}
              next={loadMoreBlogs}
              hasMore={currentLastVisible !== null}
              loader={
                // this is the loading animtion to show that we have more data to read
                <div className="flex items-center justify-center w-full mt-5">
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
                <div className="text-blue-500 text-center flex justify-center items-center mt-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-1.5 text-blue-500 "
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
              <div
                className="flex justify-center items-center flex-wrap mt-10"
                style={{ gap: "50px" }}
              >
                {postData?.map((post) => {
                  return <Card postData={post} key={post.id} />;
                })}
              </div>
            </InfiniteScroll>
          </>
        ) : (
          <>
            <div
              className={`mt-10 md:mt-20 text-gray-500 text-md text-center `}
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              Nothing found about '{search}'
              <Lottie
                animationData={animationData}
                style={{ height: "300px" }}
              />
              <Link
                href={"/"}
                className={`rounded-md relative mx-auto inline-flex justify-center items-center drop-shadow-xl`}
                style={{
                  padding: "3px",
                }}
              >
                <Button text={"Back to home"} />
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export async function getStaticPaths() {
  // Return an empty array of paths
  // By setting the paths array to an empty array, Next.js will generate the search pages dynamically based on user input. The fallback: "blocking" option ensures that if a path is not pre-rendered, it will be generated on the server at request time.

  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { search } = params;
  const page = 1;
  const pageSize = 12;

  try {
    const blogs = await prisma.blogs.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize, // Calculate the number of items to skip. ex: page is 2 then 2-1 = 1 and finallay pageSize is show many items do I want to show, so 1*pageSize = 1*12 = 12 to skip
      take: pageSize, // Define the number of items to take per page
      where: {
        OR: [
          { title: search },
          { category: search },
          { metaTitle: search },
          { title: { contains: search } },
          { tags: { some: { name: search } } },
          { metaTitle: { contains: search } },
          { metaDescription: { contains: search } },
        ],
      },
    });

    return {
      props: {
        blogs: JSON.stringify(blogs),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        blogs: null,
      },
      revalidate: 60,
    };
  }
}
