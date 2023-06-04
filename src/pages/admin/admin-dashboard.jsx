import styles from "../../styles/Admin-Panel.module.scss";
import Link from "next/link";

export default function Admin() {
  return (
    <>
      <section
        className="flex justify-center items-center"
        style={{ height: "90vh", width: "100%" }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 m-5 md:m-20"
          style={{ width: "100%" }}
        >
          {/* daily visitors */}
          <div
            className={`${styles["box"]} h-auto max-w-full rounded-md bg-gray-800 p-5 flex flex-col gap-4`}
          >
            {/* top */}
            <div
              className={`${styles["top"]} flex justify-between text-gray-400 items-center`}
            >
              <span>DAILY VISITORS</span>
              <span className="text-green-300">
                <i className="fa-solid fa-angle-up"></i>&nbsp; 20%
              </span>
            </div>

            {/* middle */}
            <div className={`${styles["middle"]}`}>
              <span className="text-gray-200 text-2xl">100</span>
            </div>

            {/* bottom */}
            <div
              className={`${styles["bottom"]} text-gray-300 flex justify-between items-center`}
            >
              <span className="cursor-pointer hover:text-gray-200 hover:underline">
                See all users
              </span>
              <span className="bg-red-200 w-9 h-9 rounded-md flex justify-center items-center">
                <i className="fa-regular fa-user text-red-600 text-xl"></i>
              </span>
            </div>
          </div>

          {/* unique visitors */}
          <div
            className={`${styles["box"]} h-auto max-w-full rounded-md bg-gray-800 p-5 flex flex-col gap-4`}
          >
            {/* top */}
            <div
              className={`${styles["top"]} flex justify-between text-gray-400 items-center`}
            >
              <span>UNIQUE VISITORS</span>
              <span className="text-green-300">
                <i className="fa-solid fa-angle-up"></i>&nbsp; 20%
              </span>
            </div>

            {/* middle */}
            <div className={`${styles["middle"]}`}>
              <span className="text-gray-200 text-2xl">100</span>
            </div>

            {/* bottom */}
            <div
              className={`${styles["bottom"]} text-gray-300 flex justify-between items-center`}
            >
              <span className="cursor-pointer hover:text-gray-200 hover:underline">
                See all users
              </span>
              <span className="bg-sky-200 w-9 h-9 rounded-md flex justify-center items-center">
                <i className="fa-regular fa-user text-sky-600 text-xl"></i>
              </span>
            </div>
          </div>

          {/* users */}
          <div
            className={`${styles["box"]} h-auto max-w-full rounded-md bg-gray-800 p-5 flex flex-col gap-4`}
          >
            {/* top */}
            <div
              className={`${styles["top"]} flex justify-between text-gray-400 items-center`}
            >
              <span>USERS</span>
              <span className="text-green-300">
                <i className="fa-solid fa-angle-up"></i>&nbsp; 20%
              </span>
            </div>

            {/* middle */}
            <div className={`${styles["middle"]}`}>
              <span className="text-gray-200 text-2xl">100</span>
            </div>

            {/* bottom */}
            <div
              className={`${styles["bottom"]} text-gray-300 flex justify-between items-center`}
            >
              <span className="cursor-pointer hover:text-gray-200 hover:underline">
                See all users
              </span>
              <span className="bg-violet-200 w-9 h-9 rounded-md flex justify-center items-center">
                <i className="fa-regular fa-user text-violet-600 text-xl"></i>
              </span>
            </div>
          </div>

          {/* all posts */}
          <div
            className={`${styles["box"]} h-auto max-w-full rounded-md bg-gray-800 p-5 flex flex-col gap-4`}
          >
            {/* top */}
            <div className={`${styles["top"]}  text-gray-400`}>
              <span>POSTS</span>
            </div>

            {/* middle */}
            <div className={`${styles["middle"]}`}>
              <span className="text-gray-200 text-2xl">100</span>
            </div>

            {/* bottom */}
            <div
              className={`${styles["bottom"]} text-gray-300 flex justify-between items-center`}
            >
              <span className="cursor-pointer hover:text-gray-200 hover:underline">
                See all posts
              </span>
              <span className="bg-orange-200 w-9 h-9 rounded-md flex justify-center items-center">
                <i className="fa-solid fa-rss text-orange-600 text-xl"></i>
              </span>
            </div>
          </div>

          {/* create post */}
          <Link
            href="/admin/create-post"
            className={`${styles["box"]} h-auto max-w-full rounded-md bg-gray-800 p-5 flex flex-col gap-4`}
          >
            {/* top */}
            <div className={`${styles["top"]} text-gray-400`}>
              <span>CREATE POST</span>
            </div>

            {/* middle */}
            <div className={`${styles["middle"]}`}>
              <i className="fa-solid fa-plus text-gray-200"></i>
            </div>

            {/* bottom */}
            <div
              className={`${styles["bottom"]} text-gray-300 flex justify-between items-center`}
            >
              <span className="cursor-pointer hover:text-gray-200 hover:underline">
                Create post
              </span>
              <span className="bg-teal-200 w-9 h-9 rounded-md flex justify-center items-center">
                <i className="fa-regular fa-pen-to-square text-teal-600 text-xl"></i>
              </span>
            </div>
          </Link>

          {/* add new categorie */}
          <div
            className={`${styles["box"]} h-auto max-w-full rounded-md bg-gray-800 p-5 flex flex-col gap-4`}
          >
            {/* top */}
            <div className={`${styles["top"]} text-gray-400`}>
              <span>ADD CATEGORY</span>
            </div>

            {/* middle */}
            <div className={`${styles["middle"]}`}>
              <i className="fa-solid fa-plus text-gray-200"></i>
            </div>

            {/* bottom */}
            <div
              className={`${styles["bottom"]} text-gray-300 flex justify-between items-center`}
            >
              <Link
                href={`add-category`}
                className="cursor-pointer hover:text-gray-200 hover:underline"
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
    </>
  );
}
