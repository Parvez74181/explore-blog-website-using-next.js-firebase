import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-gray-200 w-full ">
        <div className="mx-auto w-full">
          {/* upper part */}
          <div className="flex items-center justify-center flex-col md:justify-between md:flex-row p-5 md:w-3/4 md:mx-auto">
            <Link href="/" className="flex items-center mb-4 sm:mb-0">
              <img
                src="/footer-logo.png"
                className=" w-[150px] mr-3"
                alt="=Logo"
              />
            </Link>
            <ul className="flex flex-wrap items-center mb-6 font-medium  sm:mb-0">
              <li>
                <Link href="/" className="mr-4 hover:underline md:mr-6 ">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <Link href="/explore" className="mr-4 hover:underline md:mr-6 ">
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* bottom part */}
          <div className="px-10 md:px-32 py-6 bg-gray-700 md:flex md:items-center md:justify-between ">
            <span className="text-sm sm:text-center flex justify-center md:justify-normal">
              © 2023 <Link href="/">10mBlogs™</Link>. All Rights Reserved.
            </span>
            {/* social media icons */}
            <div className="mt-4 space-x-6 flex justify-center md:justify-normal md:mt-0">
              <Link href="#">
                <i
                  className="fa-brands fa-facebook-f cursor-pointer text-xl"
                  style={{ color: "#3b5998" }}
                ></i>
              </Link>

              <Link href="#">
                <i
                  className="fa-brands fa-instagram cursor-pointer text-xl"
                  style={{ color: "#fa7e1e " }}
                ></i>
              </Link>

              <Link href="#">
                <i
                  className="fa-brands fa-twitter cursor-pointer text-xl"
                  style={{ color: "#00acee" }}
                ></i>
              </Link>

              <Link href="#">
                <i className="fa-brands fa-github cursor-pointer text-xl"></i>
              </Link>

              <Link href="#">
                <i
                  className="fa-brands fa-pinterest-p cursor-pointer text-xl"
                  style={{ color: "#E60023" }}
                ></i>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
