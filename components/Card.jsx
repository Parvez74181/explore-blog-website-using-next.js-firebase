import styles from "../src/styles/Cards.module.scss";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

export default function Card({ postData }) {
  const { thumbnail, title, slug, category } = postData?.data?.postData;
  const { timeStamp } = postData?.data;
  const { id } = postData;

  const date = new Date(timeStamp);
  let day = date.getDate();
  let months = date.getMonth();
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (months < 10) months = `0${months + 1}`;
  let blogUploadDate = `${year}-${months}-${day}`;

  return (
    <>
      <div
        className={`${styles["card"]} w-[19rem] relative rounded-lg shadow-lg bg-white`}
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        {/* thumbnail image */}
        <div className="w-full relaive px-3 pt-3 md:p-3">
          <Link href={`/blog/${slug}/${id}`} className="w-1/3">
            <Image
              className="rounded-md "
              src={`https://drive.google.com/uc?export=view&id=${
                thumbnail.split("/")[5]
              }`}
              alt={slug}
              height={170}
              width={170}
              style={{ objectFit: "cover", width: "100%", height: "200px" }}
              priority={true}
            />
          </Link>
        </div>

        <div
          className="p-4 w-full "
          // style={{ height: "268px" }}
        >
          {/* author and upload time */}
          <div className=" mb-2 flex justify-between items-center ">
            <span>
              <i className="fa-regular fa-clock"></i> {blogUploadDate}
            </span>

            <Link
              href={`/blog/category/${category}`}
              className="hover:underline"
            >
              <i className="font-bold text-sm">#</i> {category}
            </Link>
          </div>

          {/* title */}
          <Link href={`/blog/${slug}/${id}`}>
            <h5
              className={`${styles["title"]} font-bold text-xl md:text-2xl tracking-wider leading-7 `}
            >
              {title}
            </h5>
          </Link>

          {/* description */}
          <div
            className={`${styles["desc"]} mb-3 font-normal text-md tracking-wider leading-7 `}
            style={{ height: "115px" }}
          >
            {postData?.data?.postData?.["meta-description"] ||
              postData?.data?.postData?.["metaDescription"]}
          </div>
          <Link
            href={`/blog/${slug}/${id}`}
            className={`${styles["read-more-btn"]} inline-flex items-center text-sm tracking-wide text-center  rounded-md text-blue-500 transition-all delay-75 `}
          >
            Read more &nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={14}
              height={14}
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
