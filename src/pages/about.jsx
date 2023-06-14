import Link from "next/link";
import styles from "../styles/About.module.scss";
import Image from "next/image";
import Lottie from "lottie-react";
import animationData from "../../public/about-bg.json";
const About = () => {
  return (
    <>
      <section
        style={{
          backgroundImage: "url('/about-page-bg-shadow.svg')",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* hero section for about page  */}
        <div
          className={`flex justify-center items-center flex-col lg:flex-row px-5 md:px-20 gap-5 pt-5`}
        >
          <div className="w-full lg:w-1/2 lg:order-last">
            <h2
              className={`${styles["about-main-title"]} text-5xl md:text-6xl lg:text-8xl tracking-wider text-center`}
            >
              About
            </h2>
            <p className="lg:text-xl text-center mt-5 leading-8">
              Welcome to Explore Blog, a place where I share my passion for a
              variety of topics, including food, cooking, reviews, DIY projects,
              and more. Through this blog, I aim to provide you with valuable
              insights, inspiration, and practical tips to enhance your everyday
              life.
            </p>
          </div>
          <Lottie animationData={animationData} className="w-full md:w-1/2" />
        </div>

        {/* content category's */}
        <div className={`px-5 md:px-20`}>
          <h3
            className={`${styles["heading"]} text-3xl md:text-5xl mt-20 font-bold text-center`}
          >
            Explore Our Content
          </h3>
          <div className="flex justify-center items-center">
            <Image
              src="/about-page-blog-category.svg"
              className="w-full md:w-2/3  mt-10"
              width={100}
              height={100}
              alt="about-page-blog-category"
            />
          </div>

          <p className="text-center pt-8 md:text-xl">
            That's not all! you can find many more{" "}
            <Link className="text-blue-500 hover:underline" href={"/explore"}>
              here.
            </Link>
          </p>

          <p className="md:text-xl mt-10 text-center leading-10  ">
            Thank you for visiting{" "}
            <Link className="text-blue-500 hover:underline" href={"/explore"}>
              Explore Blog
            </Link>
            .😊 <br /> Enjoy exploring my content as much as I enjoy sharing it
            with you.🤩 <br /> Happy reading!💕
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
