import { useState, useEffect } from "react";
import Card from "../../../../components/Card";
import Lottie from "lottie-react";
import animationData from "../../../../public/notFound.json";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  doc,
  where,
  or,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Loader from "../../../../components/Loader";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

// to get more blogs by InfiniteScroll component
async function getBlogs(lastVisible = null, search = null) {
  const blogCollection = collection(db, "blogs");
  const limitItem = 12; // how many item do i want to show
  search = search.toLowerCase();

  // if lastVisible is not null then add startAfter to the query
  const queryCursor = lastVisible
    ? query(
        blogCollection,
        or(
          where("postData.tag", "array-contains", search),
          where("postData.category", "==", search)
        ),
        orderBy("timeStamp", "desc"),
        startAfter(lastVisible),
        limit(limitItem)
      )
    : query(
        blogCollection,
        or(
          where("postData.tag", "array-contains", search),

          where("postData.category", "==", search)
        ),
        orderBy("timeStamp", "desc"),
        limit(limitItem)
      );

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
}

export default function getPostsBySearch({ data, lastVisibleId }) {
  const router = useRouter();
  const { search } = router.query;
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLastVisible, setCurrentLastVisible] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPostData(data);
      setLoading(false);
    }, 200);
    // get the lastVisible blog from the getServerSideProps lastVisibleId and set them to currentLastVisible
    const getLastVisibleBlogById = async () => {
      let lastVisibleRef = await getDoc(doc(db, "blogs", lastVisibleId));
      setCurrentLastVisible(lastVisibleRef);
    };
    if (lastVisibleId !== null) getLastVisibleBlogById();
  }, [data]);

  // to load more blogs when user approach to the bottom of content
  const loadMoreBlogs = async () => {
    // if currentLastVisible is not null only then call the getBlogs funtion
    // cause if there is no more data then do not need to call the getBlogs function
    if (currentLastVisible !== null) {
      const { list, lastVisible: newLastVisible } = await getBlogs(
        currentLastVisible,
        search
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
      <section
        className={`min-h-screen mx-auto mb-10 `}
        style={{ width: "80%" }}
      >
        {loading && <Loader />}
        {postData.length > 0 ? (
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
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <div className="text-gray-200 text-center flex justify-center items-center mt-5">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 mr-1.5 text-gray-200"
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
                href={`/`}
                className="inline-flex items-center p-3 px-5 text-sm text-center text-gray-200 bg-slate-700 rounded-lg focus:outline-none hover:bg-slate-800 tracking-wide transition delay-50"
              >
                Back to home
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const { search } = context.query;

  const { list, lastVisible } = await getBlogs(null, search);
  // Pass data to the page via props
  console.log(list);
  return {
    props: { data: list, lastVisibleId: lastVisible ? lastVisible.id : null },
  };
}
