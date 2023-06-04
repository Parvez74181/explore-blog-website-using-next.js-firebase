import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 w-full">
        <div className="mx-auto w-full">
          {/* upper part */}
          <div className="grid grid-cols-2 gap-8 px-10 py-6 lg:py-8 md:grid-cols-4 justify-items-center">
            <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8 mr-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Flowbite
                </span>
              </a>
            </div>

            {/* company portion */}
            <div className="">
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Company
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className=" hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Brand Center
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            {/* helo portion */}
            <div className="">
              <h2 className="mb-6 text-sm font-semibold  uppercase text-white">
                Help center
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Discord Server
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Facebook
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            {/* legal portion  */}
            <div className="ms-7 md:ms-0">
              <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                Legal
              </h2>
              <ul className="text-gray-400 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Licensing
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* bottom part */}
          <div className="px-10 md:px-32 py-6 bg-gray-800 md:flex md:items-center md:justify-between ">
            <span className="text-sm text-gray-300 sm:text-center flex justify-center md:justify-normal">
              © 2023 <a href="https://flowbite.com/">Flowbite™</a>. All Rights
              Reserved.
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
                <i className="fa-brands fa-github text-gray-300 cursor-pointer text-xl"></i>
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
