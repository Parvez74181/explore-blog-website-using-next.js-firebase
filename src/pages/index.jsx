import { useEffect, useState } from "react";
import Card from "../../components/Card";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../pages/firebase";
import Loader from "../../components/Loader";

export default function Home({ data }) {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { icon, title, text } = router.query;

  useEffect(() => {
    setPostData(data);
    setLoading(false);

    if (title && text && icon) {
      swal({
        title: title,
        text: text,
        icon: icon,
      });
    }
  }, [data]);

  return (
    <main className={`min-h-screen`}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {/* hero section */}
          <section
            className={`${styles["hero-section"]} mx-5 mt-5 md:mt-20 flex justify-center items-center flex-col`}
            style={{ height: "70vh" }}
          >
            <h1
              className={`${styles["tracking-in-contract-bck-bottom"]} ${styles["hero-section-heading"]} text-center  text-4xl md:text-6xl md:leading-snug leading-snug`}
            >
              Discover All Your Interests <br /> in One Place.
            </h1>

            <Link
              href="/explore"
              className={`${styles["btn"]} ${styles["focus-in-expand-fwd"]} mt-5 rounded-md text-gray-100 text-xl bg-slate-600 flex justify-center items-center`}
              style={{
                boxShadow: `rgb(58 79 129) 20px 0px 60px, rgb(20, 28, 45) 0px 0px 60px`,
                padding: "3px",
              }}
              onClick={() => setLoading(true)}
            >
              <span className="tracking-widest relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Explore&nbsp;{" "}
                <i className="fa-solid fa-arrow-right fa-beat"></i>
              </span>
            </Link>
          </section>
          {/* recent post section */}
          <section
            className={`${styles["hero-section"]} mx-auto mb-10 `}
            style={{ width: "80%" }}
          >
            <h1
              className={`${styles["recent-post-title"]} ms-2 md:ms-20 text-gray-300 text-xl md:text-2xl `}
            >
              Recent Posts
            </h1>
            <div
              className="flex justify-center items-center flex-wrap mt-10"
              style={{ gap: "50px" }}
            >
              {postData?.map((post) => {
                return <Card postData={post} key={post.id} />;
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  // Fetch data from Firebase
  const list = [];

  await new Promise((resolve) => {
    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), orderBy("timeStamp")),
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

  // Pass data to the page via props
  return { props: { data: list } };
}
