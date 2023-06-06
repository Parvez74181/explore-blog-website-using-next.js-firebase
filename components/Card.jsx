import styles from "../src/styles/Cards.module.scss";
import Link from "next/link";
import Image from "next/image";
import parse from "html-react-parser";

export default function Card({ postData }) {
  const { thumbnail, title, description, slug, category } =
    postData?.data?.postData;
  const { timeStamp } = postData?.data;
  const { id } = postData;
  const date = new Date(timeStamp);
  let day = date.getDate();
  let months = date.getMonth();
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (months < 10) months = "0" + months;
  let blogUploadDate = `${day}.${months}.${year}`;

  return (
    <>
      <div
        className={`${styles["card"]}  rounded-lg shadow bg-gray-800 border-gray-700`}
        style={{ width: "19rem", height: "29rem" }}
        data-aos="zoom-in-up"
        data-aos-duration="1000"
      >
        {/* thumbnail image */}
        <Link href={`/blog/${slug}/${id}`}>
          <Image
            className="rounded-t-lg "
            src={`https://drive.google.com/uc?export=view&id=${
              thumbnail.split("/")[5]
            }`}
            alt={slug}
            height={170}
            width={170}
            style={{ objectFit: "cover", height: "190px", width: "100%" }}
            priority={true}
          />
        </Link>

        <div
          className="p-5"
          // style={{ height: "268px" }}
        >
          {/* title */}
          <Link href={`/blog/${slug}/${id}`}>
            <h5
              className={`${styles["title"]} mb-2 text-2xl md:text-xl font-bold tracking-wide leading-7 text-gray-300`}
            >
              {title}
            </h5>
          </Link>

          {/* author and upload time */}
          <div className="flex justify-between items-center text-gray-400">
            <span>{category}</span>
            <span>{blogUploadDate}</span>
          </div>

          {/* description */}
          <div
            className={`${styles["desc"]} mb-3 font-normal text-md tracking-wider leading-7 text-gray-400`}
            style={{ height: "125px" }}
          >
            {parse(`${description}`)}
          </div>
          <Link
            href={`/blog/${slug}/${id}`}
            className="inline-flex items-center p-3 px-5 text-sm text-center text-gray-200 bg-slate-700 rounded-lg focus:outline-none hover:bg-slate-900 tracking-wide transition delay-50"
          >
            Read more
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
