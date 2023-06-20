import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../src/styles/Navbar.module.scss";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";
import { useRouter } from "next/router";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  // const [loading, setLoading] = useState(true);
  const router = useRouter();

  // to show dropdown menu
  const dropdown = () => {
    document.querySelector(".dropdown").classList.toggle("hidden"); // show or hide dropdown menu
    document.querySelector(".fa-angle-down").classList.toggle("fa-angle-up"); // when dropdown menu is showed, make the dropdown icon up side rotate else make down side rotate
  };

  //  to open navbar menu in the mobile or tab view
  const openNavbar = () => {
    let navbrSearch = document.querySelector("#navbar-search");
    navbrSearch.classList.toggle("hidden");

    // if in the navbar menu the explore navLink dropdown is active then deactivate means hide the dropdown and make the arrow down side when the navbar is collapse or hidden
    if (navbrSearch.classList.contains("hidden")) {
      document.querySelector(".dropdown").classList.add("hidden");
      document.querySelector(".fa-angle-down").classList.remove("fa-angle-up");
    }
  };

  // to close the navbar when user clicks to the navLinks or dropdown navLinks
  const closeNavbar = () => {
    document.querySelector("#navbar-search").classList.add("hidden"); // add hidden class to the navbar-search to hide the navbar when user clicks on any navLinks
    document.querySelector(".dropdown").classList.add("hidden"); //  hide dropdown menu
    document.querySelector(".fa-angle-down").classList.remove("fa-angle-up"); // remove the up side rotate angle
    document.querySelector(".fa-angle-down").classList.add("fa-angle-down"); // make the dropdown icon down side rotate
  };

  useEffect(() => {
    onSnapshot(
      collection(db, "categories"),
      (querySnapshot) => {
        let list = [];
        querySnapshot?.forEach((doc) => {
          let data = doc.data();
          list.push({ id: doc.id, name: data?.name });
        });
        setCategories(list);
      },
      (error) => {
        console.log("Error fetching categories:", error);
      }
    );
  }, []);

  const searchHandler = (e) => {
    if (e.keyCode === 13 || e.key === "Enter") {
      let searchText = e.target.value.trim().toLowerCase();
      if (searchText) router.push(`/blog/search/${searchText}`);
      closeNavbar();
    }
  };
  return (
    <>
      <nav
        className={`${styles["nav"]} border-gray-200 bg-white sticky top-0 z-50`}
      >
        <div className="mx-auto md:mx-10  md:px-5 p-4  flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              className="w-[100px] mr-3"
              alt="10m blogs logo"
            />
          </Link>

          <div className="flex md:order-2">
            {/* search icon for mobile devices */}
            <button
              type="button"
              id="navbar-search-icon"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-lg text-sm p-2.5 mr-1"
              onClick={openNavbar}
            >
              <svg
                className="w-5 h-5"
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
              <span className="sr-only">Search</span>
            </button>

            {/* search input for large devices */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
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
                <span className="sr-only">Search icon</span>
              </div>
              <input
                type="search"
                id={styles["search-navbar"]}
                className="block w-full p-2 pl-10 text-sm  border rounded-lg focus:ring-blue-500 focus:border-blue-500 font-normal border-gray-700 placeholder-gray-600 tracking-wider"
                onKeyUp={searchHandler}
                placeholder="Search..."
              />
            </div>

            {/* hamburger menu for mobile devices */}
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={openNavbar}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            {/* search input for mobile devices */}
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5"
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
              </div>

              {/* this search input for only mobile and tab devices */}
              <input
                type="search"
                // id={styles["search-navbar"]}
                className="block w-full p-2 pl-10 text-sm  border rounded-lg border-gray-700 placeholder-gray-600 font-normal focus:border-gray-900 outline-none"
                placeholder="Search..."
                onKeyUp={searchHandler}
              />
            </div>

            {/* naigations */}
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white">
              {/* home */}
              <li>
                <Link
                  href="/"
                  className="block py-2 pl-3 pr-4  rounded md:p-0 hover:text-blue-400 hover:bg-gray-200  md:hover:bg-transparent border-gray-700 transition ease-in-out delay-50"
                  aria-current="page"
                  onClick={() => {
                    closeNavbar();
                  }}
                >
                  Home
                </Link>
              </li>
              {/* Explore */}
              <li>
                <span>
                  <Link
                    href="/explore"
                    id="explore-dropdown"
                    className="inline-block py-2 pl-3 pr-4 cursor-pointer rounded md:p-0 hover:text-blue-400  hover:bg-gray-200 md:hover:bg-transparent border-gray-700 transition ease-in-out delay-50"
                    onClick={() => {
                      closeNavbar();
                    }}
                  >
                    Explore
                  </Link>
                  <i
                    className="ms-2 fa-solid fa-angle-down cursor-pointer"
                    onClick={dropdown}
                  ></i>
                </span>

                {/* dropdown */}
                <div
                  className={`hidden absolute bg-white border shadow-md mt-2 mx-0 px-4 p-2 w-2/4 md:w-fit  rounded-md dropdown`}
                >
                  <ul style={{ maxHeight: "300px", overflowY: "auto" }}>
                    {categories?.map((category) => {
                      return (
                        <li id={category.id} key={category.id}>
                          <Link
                            href={`/blog/category/${category.name}`}
                            className="hover:bg-gray-200 rounded block py-2 pl-3 pr-4 tracking-wide"
                            onClick={() => {
                              closeNavbar();
                            }}
                          >
                            {category.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              {/* about */}
              <li>
                <Link
                  href="/about"
                  className="block py-2 pl-3 pr-4  rounded md:p-0 hover:text-blue-400  hover:bg-gray-200  md:hover:bg-transparent border-gray-700 transition ease-in-out delay-50"
                  onClick={() => {
                    closeNavbar();
                  }}
                >
                  About
                </Link>
              </li>
              {/* contact us */}
              <li>
                <Link
                  href="/contact"
                  className="block py-2 pl-3 pr-4  rounded md:p-0 hover:text-blue-400 hover:bg-gray-200 md:hover:bg-transparent border-gray-700 transition ease-in-out delay-50"
                  onClick={() => {
                    closeNavbar();
                  }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
