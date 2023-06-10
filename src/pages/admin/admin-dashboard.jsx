import styles from "../../styles/Admin-Panel.module.scss";
import Link from "next/link";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function Admin() {
  const [adminAccessToken, setAdminAccessToken] = useState(false);
  const router = useRouter();
  const { icon, title, text } = router.query;

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

      if (res.ok) setAdminAccessToken(true);
      // if accessToken is verifyed that means res is ok, make adminAccessToken is true so admin can see the admin panel
      else if (!res.ok) router.push("/"); // if accessToken isn't verifyed then send the user to home page
    };
    checkAccessToken();
  }, []);

  // if admin successfully get access to the admin panel
  useEffect(() => {
    if (title && text && icon) {
      swal({
        title: title,
        text: text,
        icon: icon,
      });
    }
  }, [title]);

  return (
    <>
      {adminAccessToken && (
        <section
          className="flex justify-center items-center min-h-[90vh]"
          style={{ width: "100%" }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 m-5 my-10 md:m-20"
            style={{ width: "100%" }}
          >
            {/* daily visitors */}
            <div
              className={`${styles["box"]} shadow-md h-auto max-w-full rounded-md bg-white  p-5 flex flex-col gap-4`}
            >
              {/* top */}
              <div
                className={`${styles["top"]} flex justify-between items-center`}
              >
                <span>DAILY VISITORS</span>
                <span className="text-green-400">
                  <i className="fa-solid fa-angle-up"></i>&nbsp; 20%
                </span>
              </div>

              {/* middle */}
              <div className={`${styles["middle"]}`}>
                <span className=" text-2xl">100</span>
              </div>

              {/* bottom */}
              <div
                className={`${styles["bottom"]} text-gray-500  flex justify-between items-center`}
              >
                <span className="cursor-pointer hover:text-gray-600  hover:underline">
                  See all users
                </span>
                <span className="bg-red-200 w-9 h-9 rounded-md flex justify-center items-center">
                  <i className="fa-regular fa-user text-red-600 text-xl"></i>
                </span>
              </div>
            </div>

            {/* unique visitors */}
            <div
              className={`${styles["box"]} shadow-md h-auto max-w-full rounded-md bg-white p-5 flex flex-col gap-4`}
            >
              {/* top */}
              <div
                className={`${styles["top"]} flex justify-between  items-center`}
              >
                <span>UNIQUE VISITORS</span>
                <span className="text-green-400">
                  <i className="fa-solid fa-angle-up"></i>&nbsp; 20%
                </span>
              </div>

              {/* middle */}
              <div className={`${styles["middle"]}`}>
                <span className="text-2xl">100</span>
              </div>

              {/* bottom */}
              <div
                className={`${styles["bottom"]} text-gray-500  flex justify-between items-center`}
              >
                <span className="cursor-pointer hover:text-gray-600  hover:underline">
                  See all users
                </span>
                <span className="bg-sky-200 w-9 h-9 rounded-md flex justify-center items-center">
                  <i className="fa-regular fa-user text-sky-600 text-xl"></i>
                </span>
              </div>
            </div>

            {/* users */}
            <div
              className={`${styles["box"]} shadow-md h-auto max-w-full rounded-md bg-white  p-5 flex flex-col gap-4`}
            >
              {/* top */}
              <div
                className={`${styles["top"]} flex justify-between items-center`}
              >
                <span>USERS</span>
                <span className="text-green-400">
                  <i className="fa-solid fa-angle-up"></i>&nbsp; 20%
                </span>
              </div>

              {/* middle */}
              <div className={`${styles["middle"]}`}>
                <span className=" text-2xl">100</span>
              </div>

              {/* bottom */}
              <div
                className={`${styles["bottom"]} text-gray-500  flex justify-between items-center`}
              >
                <span className="cursor-pointer hover:text-gray-600  hover:underline">
                  See all users
                </span>
                <span className="bg-violet-200 w-9 h-9 rounded-md flex justify-center items-center">
                  <i className="fa-regular fa-user text-violet-600 text-xl"></i>
                </span>
              </div>
            </div>

            {/* all posts */}
            <div
              className={`${styles["box"]} shadow-md h-auto max-w-full rounded-md bg-white  p-5 flex flex-col gap-4`}
            >
              {/* top */}
              <div className={`${styles["top"]} `}>
                <span>POSTS</span>
              </div>

              {/* middle */}
              <div className={`${styles["middle"]}`}>
                <span className=" text-2xl">100</span>
              </div>

              {/* bottom */}
              <div
                className={`${styles["bottom"]} text-gray-500  flex justify-between items-center`}
              >
                <Link
                  href={"/admin/all-post"}
                  className="cursor-pointer hover:text-gray-600  hover:underline"
                >
                  See all posts
                </Link>
                <span className="bg-orange-200 w-9 h-9 rounded-md flex justify-center items-center">
                  <i className="fa-solid fa-rss text-orange-600 text-xl"></i>
                </span>
              </div>
            </div>

            {/* create post */}
            <Link
              href="/admin/create-post"
              className={`${styles["box"]} shadow-md bg-white h-auto max-w-full rounded-md p-5 flex flex-col gap-4`}
            >
              {/* top */}
              <div className={`${styles["top"]} `}>
                <span>CREATE POST</span>
              </div>

              {/* middle */}
              <div className={`${styles["middle"]}`}>
                <i className="fa-solid fa-plus "></i>
              </div>

              {/* bottom */}
              <div
                className={`${styles["bottom"]} text-gray-500  flex justify-between items-center`}
              >
                <span className="cursor-pointer hover:text-gray-600  hover:underline">
                  Create post
                </span>
                <span className="bg-teal-200 w-9 h-9 rounded-md flex justify-center items-center">
                  <i className="fa-regular fa-pen-to-square text-teal-600 text-xl"></i>
                </span>
              </div>
            </Link>

            {/* add new categorie */}
            <div
              className={`${styles["box"]} shadow-md h-auto max-w-full rounded-md bg-white  p-5 flex flex-col gap-4`}
            >
              {/* top */}
              <div className={`${styles["top"]} `}>
                <span>ADD CATEGORY</span>
              </div>

              {/* middle */}
              <div className={`${styles["middle"]}`}>
                <i className="fa-solid fa-plus "></i>
              </div>

              {/* bottom */}
              <div
                className={`${styles["bottom"]} text-gray-500  flex justify-between items-center`}
              >
                <Link
                  href={`add-category`}
                  className="cursor-pointer hover:text-gray-600  hover:underline"
                >
                  Add new category
                </Link>
                <span className="bg-pink-200 w-9 h-9 rounded-md flex justify-center items-center">
                  <i className="fa-solid fa-table-cells-large text-pink-600 text-xl"></i>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
