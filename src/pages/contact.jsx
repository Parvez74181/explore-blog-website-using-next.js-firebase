import Lottie from "lottie-react";
import animationData from "../../public/contact-us-bg.json";
import styles from "../styles/Contact.module.scss";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(null);
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userMessage: "",
  });

  // input and textarea handler
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let submitBtn = document.querySelector("#submit-btn");
    submitBtn.innerHTML = ` <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-3xl mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg> Sending...`; // show a loading animation

    let res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      submitBtn.innerHTML = ` <div class="svg-wrapper-1">
                  <div class="svg-wrapper">
                    <svg
                      height="24"
                      width="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Send</span>
                `; // show the send button again
      setFormSubmitted(true);
      setUserData({
        userName: "",
        userEmail: "",
        userMessage: "",
      });

      setTimeout(() => {
        setFormSubmitted(null);
      }, 3000); // after 3s hide the success message
    } else {
      setFormSubmitted(false);
      setTimeout(() => {
        setFormSubmitted(null);
      }, 3000); // after 3s hide the error message
    }
  };

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Welcome to 10m Blogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          name="keywords"
          content="Recipes, cuisines, gastronomy, culinary experiences, Techniques, tricks, culinary prowess, kitchen skills, Honest, unbiased, recommendations, informed decisions, Destinations, travel guides, personal experiences, tips, Personal development, wellness, productivity, self-care, Home Decor, Ideas, inspiration, DIY projects, cozy living spaces, Crafts and DIY, Creativity, DIY projects, crafts, artistic endeavors, Book and Movie Reviews, Thoughts, recommendations, genres, themes, Fashion and Beauty, Fashion trends, beauty tips, product reviews, Health and Fitness, Advice, workout routines, nutrition tips, wellness, Technology, Advancements, gadget reviews, tech news, insights, Inspiration and Motivation, Uplifting stories, motivational quotes, personal growth, Parenting and Family, Gardening and Plants, Pets and Animals, Photography, Finance and Money Management, Art and Design, Career Development, Social Issues and Activism, Travel Tips, Relationships and Dating, Self-Care and Mental Health, Home Organization, Beauty and Skincare, Green Living and Sustainability, Home Renovation, Entrepreneurship and Business, Personal Stories and Reflections, Food, Cooking Tips, Product Reviews, Travel Adventures, Lifestyle, Home Decor, Crafts and DIY, Book and Movie Reviews, Fashion and Beauty, Health and Fitness, Technology, Inspiration and Motivation, Parenting and Family, Gardening and Plants, Pets and Animals, Photography, Finance and Money Management, Art and Design, Career Development, Social Issues and Activism, Travel Tips, Relationships and Dating, Self-Care and Mental Health, Home Organization, Beauty and Skincare, Green Living and Sustainability, Home Renovation, Entrepreneurship and Business, Personal Stories and Reflections, Recipes, Culinary Experiences, Travel Guides, Personal Development, Wellness Tips, DIY Projects, Artistic Endeavors, Product Recommendations, Technology News, Uplifting Stories, Gardening Tips, Pet Care, Budgeting, Career Advice, Social Justice, Healthy Living, Organization Ideas, Fashion Trends, Fitness Tips, Motivational Quotes, Creative Projects, Book Recommendations, Movie Reviews, Home Improvement, Entrepreneurial Success, Personal Growth, Eco-Friendly Living"
        />

        {/* <!-- Open Graph tags --> */}
        <meta
          property="og:title"
          content="Discover a World of Diverse Insights | 10mBlogs"
        />
        <meta
          property="og:description"
          content="Welcome to 10mBlogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          property="og:image"
          content="https://i.postimg.cc/66HmCcBH/Screenshot-2023-06-19-111850.png"
        />
        <meta property="og:url" content="https://www.10mblogs.xyz" />

        {/* <!-- Twitter Card tags --> */}
        <meta
          name="twitter:card"
          content="Contact Us for Any Questions or Assistance | 10mBlogs | Contact Us"
        />
        <meta
          name="twitter:title"
          content="Contact Us for Any Questions or Assistance | 10mBlogs | Contact Us"
        />
        <meta
          name="twitter:description"
          content="Welcome to 10mBlogs, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        <meta
          name="twitter:image"
          content="https://i.postimg.cc/66HmCcBH/Screenshot-2023-06-19-111850.png"
        />

        <title>
          Contact Us for Any Questions or Assistance | Contact Us | 10m Blogs
        </title>
      </Head>

      <section
        className="pt-5 min-h-screen"
        style={{
          backgroundImage: "url('/contact-page-bg-shadow.svg')",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1
          className={`${styles["contact-header"]} text-5xl md:text-6xl lg:text-8xl tracking-wider text-center`}
        >
          Contact Us
        </h1>
        <p className="text-center my-5 w-[90%] md:w-1/3 mx-auto">
          We're here to help! Reach out with any questions or feedback. We value
          your input and will respond promptly.
        </p>
        <div
          className={`flex flex-col lg:flex-row justify-center items-center gap-20 pt-5`}
        >
          <Lottie animationData={animationData} className="w-full md:w-1/3" />

          <div className="w-[95%] md:w-1/2 lg:w-1/3 mb-10 p-5 mx-auto ">
            <form
              className=" mb-10 p-5 mx-auto shadow-lg rounded-md"
              onSubmit={handleSubmit}
            >
              <h1 className="text-center text-2xl font-bold mb-5">
                Contact Form
              </h1>

              {/* user email */}
              <div className="mb-5">
                <label
                  htmlFor="userEmail"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="userEmail"
                    className=" bg-transparent border border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                    placeholder="john@gmail.com"
                    required
                    value={userData.userEmail}
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* user name */}
              <div className="mb-5">
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 21 22"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.8977 21.6023C9.15909 21.6023 7.62216 21.3636 6.28693 20.8864C4.9517 20.4148 3.82955 19.7188 2.92045 18.7983C2.01136 17.8778 1.32386 16.75 0.857955 15.4148C0.392045 14.0795 0.159091 12.5511 0.159091 10.8295C0.159091 9.16477 0.394886 7.67614 0.866477 6.36364C1.34375 5.05114 2.03409 3.9375 2.9375 3.02273C3.84659 2.10227 4.94886 1.40057 6.24432 0.917614C7.54545 0.434659 9.01705 0.193181 10.6591 0.193181C12.2557 0.193181 13.6534 0.454545 14.8523 0.977272C16.0568 1.49432 17.0625 2.19602 17.8693 3.08239C18.6818 3.96307 19.2898 4.95454 19.6932 6.05682C20.1023 7.15909 20.3068 8.29545 20.3068 9.46591C20.3068 10.2898 20.267 11.125 20.1875 11.9716C20.108 12.8182 19.9403 13.5966 19.6847 14.3068C19.429 15.0114 19.0341 15.5795 18.5 16.0114C17.9716 16.4432 17.2557 16.6591 16.3523 16.6591C15.9545 16.6591 15.517 16.5966 15.0398 16.4716C14.5625 16.3466 14.1392 16.1392 13.7699 15.8494C13.4006 15.5597 13.1818 15.1705 13.1136 14.6818H13.0114C12.875 15.0114 12.6648 15.3239 12.3807 15.6193C12.1023 15.9148 11.7358 16.1506 11.2812 16.3267C10.8324 16.5028 10.2841 16.5795 9.63636 16.5568C8.89773 16.5284 8.24716 16.3636 7.68466 16.0625C7.12216 15.7557 6.65057 15.3409 6.26989 14.8182C5.89489 14.2898 5.6108 13.679 5.41761 12.9858C5.23011 12.2869 5.13636 11.5341 5.13636 10.7273C5.13636 9.96023 5.25 9.25852 5.47727 8.62216C5.70455 7.9858 6.01989 7.42898 6.4233 6.9517C6.83239 6.47443 7.30966 6.09375 7.85511 5.80966C8.40625 5.51989 9 5.34091 9.63636 5.27273C10.2045 5.21591 10.7216 5.24148 11.1875 5.34943C11.6534 5.4517 12.0369 5.60795 12.3381 5.81818C12.6392 6.02273 12.8295 6.25 12.9091 6.5H13.0114V5.54545H14.8182V13.25C14.8182 13.7273 14.9517 14.1477 15.2188 14.5114C15.4858 14.875 15.875 15.0568 16.3864 15.0568C16.9659 15.0568 17.4091 14.858 17.7159 14.4602C18.0284 14.0625 18.2415 13.4489 18.3551 12.6193C18.4744 11.7898 18.5341 10.7273 18.5341 9.43182C18.5341 8.67045 18.429 7.92045 18.2188 7.18182C18.0142 6.4375 17.7017 5.74148 17.2812 5.09375C16.8665 4.44602 16.3409 3.875 15.7045 3.38068C15.0682 2.88636 14.321 2.5 13.4631 2.22159C12.6108 1.9375 11.642 1.79545 10.5568 1.79545C9.22159 1.79545 8.02557 2.00284 6.96875 2.41761C5.91761 2.8267 5.02273 3.42614 4.28409 4.21591C3.55114 5 2.99148 5.95455 2.60511 7.07955C2.22443 8.19886 2.03409 9.47159 2.03409 10.8977C2.03409 12.3466 2.22443 13.6335 2.60511 14.7585C2.99148 15.8835 3.55966 16.8324 4.30966 17.6051C5.06534 18.3778 6 18.9631 7.11364 19.3608C8.22727 19.7642 9.51136 19.9659 10.9659 19.9659C11.5909 19.9659 12.2074 19.9063 12.8153 19.7869C13.4233 19.6676 13.9602 19.5369 14.4261 19.3949C14.892 19.2528 15.2273 19.1477 15.4318 19.0795L15.9091 20.6477C15.5568 20.7955 15.0966 20.9432 14.5284 21.0909C13.9659 21.2386 13.3636 21.3608 12.7216 21.4574C12.0852 21.554 11.4773 21.6023 10.8977 21.6023ZM9.90909 14.8182C10.6705 14.8182 11.2869 14.6648 11.7585 14.358C12.2301 14.0511 12.5739 13.5881 12.7898 12.9688C13.0057 12.3494 13.1136 11.5682 13.1136 10.625C13.1136 9.67045 12.9943 8.92614 12.7557 8.39205C12.517 7.85795 12.1648 7.48295 11.6989 7.26705C11.233 7.05114 10.6591 6.94318 9.97727 6.94318C9.32955 6.94318 8.77557 7.11364 8.31534 7.45455C7.8608 7.78977 7.51136 8.23864 7.26705 8.80114C7.02841 9.35795 6.90909 9.96591 6.90909 10.625C6.90909 11.3523 7.00568 12.0369 7.19886 12.679C7.39205 13.3153 7.70739 13.8324 8.14489 14.2301C8.58239 14.6222 9.17045 14.8182 9.90909 14.8182Z" />
                    </svg>
                  </div>

                  <input
                    type="text"
                    name="userName"
                    className=" bg-transparent border border-teal-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                    placeholder="John Wick"
                    required
                    value={userData.userName}
                    onChange={handleInput}
                  />
                </div>
              </div>

              {/* user message */}
              <div className="mb-5">
                <label
                  htmlFor="userMessage"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your message
                </label>
                <textarea
                  name="userMessage"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900  bg-transparent rounded-lg border border-teal-500 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Leave a message..."
                  required
                  value={userData.userMessage}
                  onChange={handleInput}
                ></textarea>
              </div>

              {/* submit button */}
              <div>
                <button
                  id="submit-btn"
                  className={`${styles["submit-btn"]} flex justify-center items-center border border-teal-500 w-full p-3 hover:shadow-xl rounded-xl transition-all delay-75`}
                >
                  <div className="svg-wrapper-1">
                    <div className="svg-wrapper">
                      <svg
                        height="24"
                        width="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </button>

                {/* success or error message */}
                {formSubmitted !== null && (
                  <div className="mt-5 mb-10">
                    {formSubmitted && (
                      <span className="absolute text-green-600">
                        Thank you for your opinion!💕
                      </span>
                    )}

                    {formSubmitted === false && (
                      <span className="absolute text-red-600">
                        Something wrong! Please try again.😢
                      </span>
                    )}
                  </div>
                )}
              </div>
            </form>

            {/* social media follow link */}
            <div className=" mb-10 p-5 shadow-lg rounded-md flex justify-between items-center">
              <span className="font-bold">Follow me on: </span>

              {/* facebook */}
              <Link
                href={
                  "https://www.facebook.com/profile.php?id=100093847536861&mibextid=ZbWKwL"
                }
                title="facebook"
                className="fa-brands fa-facebook-f cursor-pointer text-2xl"
                style={{ color: "#3b5998" }}
              ></Link>

              {/* instagram */}
              <Link
                href={"https://instagram.com/10mblogs?igshid=MzNlNGNkZWQ4Mg=="}
                title="instagram"
                className="fa-brands fa-instagram cursor-pointer text-2xl"
                style={{ color: "#fa7e1e " }}
              ></Link>

              {/* twitter */}
              <Link
                href={
                  "https://twitter.com/10mBlogs?t=PwsM0hnPHg7N52cfRs81Nw&s=09"
                }
                title="twitter"
                className="fa-brands fa-twitter cursor-pointer text-2xl"
                style={{ color: "#00acee" }}
              ></Link>

              {/* pinterest */}
              <Link
                href={"https://pin.it/2aOGNDd"}
                title="pinterest"
                className="fa-brands fa-pinterest-p cursor-pointer text-2xl"
                style={{ color: "#E60023" }}
              ></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
