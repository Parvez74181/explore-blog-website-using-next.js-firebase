import styles from "../styles/User.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import swal from "sweetalert";

export default function Registration() {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: "", password: "" });

  // handle form input
  const handleInput = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    setUserData({ ...userData, [id]: value }); // set email and password to the userData state
  };

  // handle loginUserWithEmailAndPassword
  const loginUserWithEmailAndPassword = async (e) => {
    try {
      // show the loading animation when login button clicked
      e.target.innerHTML = ` <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-3xl mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg> Loading...`;

      // make a request to the to login and create jwt token to verify admin
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      const token = data.token;

      localStorage.setItem("accessToken", token); // set token to the localStorage so that we can verify the user by this token

      // if api send a ok response then take user to the admin dashboard and the query is for to show a success message in dashboard
      if (res.ok) {
        router.push({
          pathname: "/admin/admin-dashboard",
          query: {
            icon: "success",
            title: "success",
            text: "Admin login successfull!",
          },
        });
      }
    } catch (error) {
      // if anything goes wrong then make the login button text to Login and show an error
      e.target.innerHTML = "Login";
      swal({ title: "Error", text: "Wrong credential!", icon: "warning" });
    }
  };

  return (
    <>
      <form
        className={`${styles["user-login-form"]} rounded-xl px-5 mx-auto my-20  w-11/12 md:w-2/5 xl:w-2/6 bg-white`}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h1
          className={`${styles["user-login-heading"]} mb-10  text-2xl md:text-3xl `}
        >
          User Login
        </h1>

        {/* email */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="border  text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-700  placeholder-slate-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="john.doe@company.com"
            value={userData.email}
            onChange={handleInput}
            required
          />
        </div>

        {/* password */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-700 placeholder-slate-600  focus:ring-blue-500 focus:border-blue-500"
            placeholder="•••••••••"
            value={userData.password}
            onChange={handleInput}
            required
          />
        </div>

        {/* remember me */}
        <div className="flex items-start mb-3 tracking-wider">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border rounded  focus:ring-3  bg-gray-100 cursor-pointer border-gray-600 focus:ring-blue-600 ring-offset-gray-800"
            />
          </div>
          <label htmlFor="remember" className="ml-2 text-sm font-medium ">
            Remember Me
          </label>
        </div>

        <div className="flex flex-wrap justify-between mb-6">
          {/* forget password */}
          <div className=" text-sm tracking-wider mb-3">
            Forget password?{" "}
            <Link href="#" className="text-blue-500">
              click here
            </Link>
          </div>

          {/* create account */}
          <div className="text-sm tracking-wider">
            New here?
            <Link href="/registration" className="text-blue-500">
              Register Now
            </Link>
          </div>
        </div>

        {/* submit button */}
        <button
          type="submit"
          className={`w-full mt-5 rounded-md text-xl flex justify-center items-center`}
          style={{
            background: `linear-gradient(45deg, #ff00cc, #4242ac)`,
            padding: "3px",
          }}
        >
          <span
            className="w-full tracking-widest relative py-2 transition-all duration-75 bg-gray-100 rounded-md group-hover:bg-opacity-0 hover:text-white"
            onClick={loginUserWithEmailAndPassword}
          >
            Login
          </span>
        </button>
      </form>

      {/* other login method, 
      ***********************
      NOTE: future implementation
      ********************/}
      <div
        className={`other-login-methodsrounded-xl  px-1 mx-auto select-none my-5 mt-0 w-11/12 md:w-2/5 xl:w-2/6`}
      >
        {/* google login */}
        {/* <div
          className={`google-login w-full mt-5 rounded-md cursor-pointer flex justify-center items-center`}
          style={{
            background: `linear-gradient(45deg, #ff00cc, #4242ac)`,
            padding: "1px",
          }}
        >
          <span
            className="w-full tracking-widest relative py-3 px-5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 hover:text-gray-500"
            onClick={registerUserWithGoogle}
          >
            <i className="fa-brands fa-google"></i> &nbsp; Login with google
          </span>
        </div> */}

        {/* facebook login */}
        {/* <div
          className={`fb-login w-full mt-5 rounded-md cursor-pointer flex justify-center items-center`}
          style={{
            background: `linear-gradient(45deg, #ff00cc, #4242ac)`,
            padding: "1px",
          }}
        >
          <span className="w-full tracking-widest relative py-3 px-5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 hover:text-gray-500">
            <i className="fa-brands fa-facebook"></i> &nbsp; Login with facebook
          </span>
        </div> */}

        {/* github login */}
        {/* <div
          className={`fb-login w-full mt-5 rounded-md cursor-pointer flex justify-center items-center`}
          style={{
            background: `linear-gradient(45deg, #ff00cc, #4242ac)`,
            padding: "1px",
          }}
        >
          <span className="w-full tracking-widest relative py-3 px-5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 hover:text-gray-500">
            <i className="fa-brands fa-github"></i> &nbsp; Login with github
          </span>
        </div> */}
      </div>
    </>
  );
}
