import Lottie from "lottie-react";
import animationData from "../../public/404.json";
import Head from "next/head";
import Button from "../../components/Button";
import Link from "next/link";

export default function pageNotFound() {
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
          content="Discover a World of Diverse Insights | 10mBlogs"
        />
        <meta
          name="twitter:title"
          content="Discover a World of Diverse Insights | 10mBlogs"
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
          10m Blogs | 404 | Page Not Found | Discover a World of Diverse
          Insights
        </title>
      </Head>

      <main className="min-h-screen flex justify-center flex-col items-center">
        <Lottie animationData={animationData} style={{ width: "600px" }} />
        <Link href={"/"} className="mb-10">
          <Button text={"Back to Home"} />
        </Link>
      </main>
    </>
  );
}
