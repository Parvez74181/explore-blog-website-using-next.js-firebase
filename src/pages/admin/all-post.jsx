import {
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import { useEffect, useState, useRef } from "react";
import Loader from "../../../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import swal from "sweetalert";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

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

export default function allPosts({ initialBlogs }) {
  const [postData, setPostData] = useState([]);
  const [currentLastVisible, setCurrentLastVisible] = useState("");
  const [adminAccessToken, setAdminAccessToken] = useState(false);
  const page = useRef(1);

  const router = useRouter();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken"); // get the accessToken from localStorage

    // handle accessToken checking
    const checkAccessToken = async () => {
      // make a request to backend for checking the token is verifyed or not
      let res = await fetch("/api/checkAdminAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (res.ok) {
        setAdminAccessToken(true);
        setPostData(initialBlogs);
      }
      // if accessToken is verifyed that means res is ok, make adminAccessToken is true so admin can see the admin panel
      else if (!res.ok) router.push("/"); // if accessToken isn't verifyed then send the user to home page
    };
    checkAccessToken();
  }, []);

  // to load more blogs when user approach to the bottom of content
  const loadMoreBlogs = async () => {
    page.current = page.current + 1; // increament the page number
    const blogs = await getBlogs(page.current);
    setPostData((prevData) => [...prevData, ...blogs]);

    if (blogs.length === 0) setCurrentLastVisible(null);
  };

  const editPost = () => {
    swal({
      icon: "info",
      title: "Info",
      text: "Update from database directly!",
    });
  };
  const deletePost = async (e) => {
    let id = e?.target?.dataset?.id;
    try {
      await axios(`/api/deleteBlog?id=${id}`);

      swal({
        title: "Success",
        text: "Post is successfully deleted!",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "Post is not deleted!",
        icon: "error",
      });
    }
  };

  return (
    <>
      {adminAccessToken && (
        <main className={`min-h-screen`}>
          <InfiniteScroll
            dataLength={postData?.length}
            next={loadMoreBlogs}
            hasMore={currentLastVisible !== null}
            loader={
              // this is the loading animtion to show that we have more data to read
              <div className="flex items-center justify-center w-full my-3">
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
              <div className="text-blue-500 text-center flex justify-center items-center my-5">
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
            <section
              className="content flex flex-wrap justify-center items-center my-10 mx-auto"
              style={{ gap: "50px", width: "80%" }}
            >
              <h1 className="text-center text-4xl my-5">Blogs</h1>
              <table className="w-full text-sm text-center tracking-wider ">
                <thead className="text-xs  uppercase bg-slate-200 ">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      Blog title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Edit
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {postData?.map((post) => {
                    return (
                      <tr key={post.id} className=" border-b bg-white ">
                        <td className="px-6 py-4 font-medium text-left whitespace-nowrap">
                          <Link href={`/blog/${post.slug}/${post.id}`}>
                            {post.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-[10px]">
                          {post.createdAt}
                        </td>
                        <td className="px-6 py-4 ">
                          <i
                            className="fa-solid fa-pen-to-square text-green-500 cursor-pointer"
                            data-id={post.id}
                            onClick={editPost}
                          ></i>
                        </td>
                        <td className="px-6 py-4 ">
                          <i
                            title="delete"
                            className="fa-solid fa-trash text-red-500 cursor-pointer"
                            data-id={post.id}
                            onClick={deletePost}
                          ></i>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </InfiniteScroll>
        </main>
      )}
    </>
  );
}

export async function getStaticProps() {
  if (process.env.MODE === "production") {
    const baseUrl = process.env.URL_ORIGIN;

    try {
      const res = await fetch(`${baseUrl}/api/getBlogs?page=1&pageSize=12`);

      if (!res.ok) {
        throw new Error(`Request failed with status code ${res.status}`);
      }

      const initialBlogs = await res.json();

      return {
        props: {
          initialBlogs,
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
  } else {
    // Return default props for non-production environments
    return {
      props: {
        initialBlogs: null,
      },
      revalidate: 60,
    };
  }
}
