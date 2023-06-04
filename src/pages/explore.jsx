import Card from "../../components/Card";
import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "../pages/firebase";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

export default function Explore({ data }) {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Explore Blog | Explore";

    setPostData(data);
    setLoading(false);
  }, [data]);

  return (
    <>
      <main className={`min-h-screen`}>
        {loading ? (
          <Loader />
        ) : (
          <section
            className="content flex flex-wrap justify-center items-center my-10 mx-auto"
            style={{ gap: "50px", width: "80%" }}
          >
            {postData?.map((post) => {
              return <Card postData={post} key={post.id} />;
            })}
          </section>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from Firebase
  const list = [];

  let querySnapshot = await getDocs(
    query(collection(db, "blogs"), orderBy("timeStamp"), limit(3))
  );

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    // serializing the data
    const formattedData = {
      ...data,
      timeStamp: data.timeStamp.toDate().toISOString(),
    };
    // add data to the list variable
    list.unshift({ id: doc.id, data: formattedData });
  });

  // Pass data to the page via props
  return { props: { data: list } };
}
