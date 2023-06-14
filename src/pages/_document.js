import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* font awesome cdn */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />

        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />

        <meta charSet="UTF-8" />

        <meta
          name="description"
          content="Welcome to Explore Blog, a place where I share my passion for a variety of topics, including food, cooking, reviews, DIY projects, and more. Through this blog, I aim to provide you with valuable insights, inspiration, and practical tips to enhance your everyday life."
        />
        {/* <meta
          name="keywords"
          content="Recipes, cuisines, gastronomy, culinary experiences, Techniques, tricks, culinary prowess, kitchen skills, Honest, unbiased, recommendations, informed decisions, Destinations, travel guides, personal experiences, tips, Personal development, wellness, productivity, self-care, Home Decor, Ideas, inspiration, DIY projects, cozy living spaces, Crafts and DIY, Creativity, DIY projects, crafts, artistic endeavors, Book and Movie Reviews, Thoughts, recommendations, genres, themes, Fashion and Beauty, Fashion trends, beauty tips, product reviews, Health and Fitness, Advice, workout routines, nutrition tips, wellness, Technology, Advancements, gadget reviews, tech news, insights, Inspiration and Motivation, Uplifting stories, motivational quotes, personal growth, Parenting and Family, Gardening and Plants, Pets and Animals, Photography, Finance and Money Management, Art and Design, Career Development, Social Issues and Activism, Travel Tips, Relationships and Dating, Self-Care and Mental Health, Home Organization, Beauty and Skincare, Green Living and Sustainability, Home Renovation, Entrepreneurship and Business, Personal Stories and Reflections, Food, Cooking Tips, Product Reviews, Travel Adventures, Lifestyle, Home Decor, Crafts and DIY, Book and Movie Reviews, Fashion and Beauty, Health and Fitness, Technology, Inspiration and Motivation, Parenting and Family, Gardening and Plants, Pets and Animals, Photography, Finance and Money Management, Art and Design, Career Development, Social Issues and Activism, Travel Tips, Relationships and Dating, Self-Care and Mental Health, Home Organization, Beauty and Skincare, Green Living and Sustainability, Home Renovation, Entrepreneurship and Business, Personal Stories and Reflections, Recipes, Culinary Experiences, Travel Guides, Personal Development, Wellness Tips, DIY Projects, Artistic Endeavors, Product Recommendations, Technology News, Uplifting Stories, Gardening Tips, Pet Care, Budgeting, Career Advice, Social Justice, Healthy Living, Organization Ideas, Fashion Trends, Fitness Tips, Motivational Quotes, Creative Projects, Book Recommendations, Movie Reviews, Home Improvement, Entrepreneurial Success, Personal Growth, Eco-Friendly Living"
        /> */}

        {/* <!-- Open Graph tags --> */}
        <meta property="og:title" content="Your Blog Title" />
        <meta
          property="og:description"
          content="Brief description of your blog or blog post."
        />
        <meta
          property="og:image"
          content="URL to the featured image for your blog post."
        />
        <meta property="og:url" content="URL of the blog post or website." />

        {/* <!-- Twitter Card tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Blog Title" />
        <meta
          name="twitter:description"
          content="Brief description of your blog or blog post."
        />
        <meta
          name="twitter:image"
          content="URL to the featured image for your blog post."
        />

        <meta name="author" content="Parvez" />
        <link
          rel="canonical"
          href="URL of the canonical version of the page."
        />
        <meta name="robots" content="index,follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
