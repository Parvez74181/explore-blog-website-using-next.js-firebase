import { useState, useEffect } from "react";
import Card from "../../../../components/Card";
import Lottie from "lottie-react";
import animationData from "../../../../public/notFound.json";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import Loader from "../../../../components/Loader";
import Link from "next/link";

export default function getPostsByCategory({ data }) {
  const router = useRouter();
  const { category } = router.query;
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPostData(data);
      setLoading(false);
    }, 200);
  }, [category]);

  useEffect(() => {
    document.title = `Explore Blog | category | ${category}`;
  }, [category]);
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
              Showing results based on '{category}'
            </p>
            <div
              className="flex justify-center items-center flex-wrap mt-10"
              style={{ gap: "50px" }}
            >
              {postData?.map((post) => {
                return <Card postData={post} key={post.id} />;
              })}
            </div>
          </>
        ) : (
          <>
            <div
              className={`mt-10 md:mt-20 text-gray-500 text-md text-center `}
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              Nothing found about '{category}'
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
  const { category } = context.query;
  const list = [];

  try {
    // Fetch data from Firebase
    await new Promise((resolve) => {
      const unsubscribe = onSnapshot(
        query(
          collection(db, "blogs"),
          where("postData.category", "array-contains", category),
          orderBy("timeStamp")
        ),
        (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const formattedData = {
              ...data,
              timeStamp: data.timeStamp.toDate().toISOString(),
            };
            list.unshift({ id: doc.id, data: formattedData });
          });
          unsubscribe();
          resolve();
        }
      );
    });
  } catch (error) {
    console.log(error);
  }

  // Pass data to the page via props
  return { props: { data: list } };
}
