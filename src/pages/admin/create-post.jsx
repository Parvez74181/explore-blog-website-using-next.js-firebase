import CategorieInput from "../../../components/CategorieInput";
import Editor from "../../../components/Editor";
import TagInputBox from "../../../components/TagInputBox";
import styles from "../../styles/Create-Post.module.scss";
import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import swal from "sweetalert";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    thumbnail: "",
    title: "",
    slug: "",
    description: "",
    category: [],
    tag: [],
  });

  const sendDataToServer = async () => {
    try {
      await addDoc(collection(db, "blogs"), {
        postData,
        timeStamp: serverTimestamp(),
      });
      swal({
        title: "Success",
        text: "Post successfully created! Now first reload the page and write a new post!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Error",
        text: `${error}`,
        icon: "info",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createPost = () => {
    sendDataToServer();
  };

  return (
    <>
      <main className="min-h-screen">
        <h1 className="text-gray-300 text-center text-4xl mt-20 md:mb-24">
          Create a new post
        </h1>

        <section
          className="flex justify-between items-start flex-wrap md:my-10 md:mt-16 mx-5"
          // style={{ gap: "50px" }}
        >
          {/* text editor */}
          <div className="editor mt-10 md:mt-20 w-full md:w-6/12 mx-auto">
            {/* thumbnail image url */}
            <div className="mb-6">
              <label
                htmlFor="thumbnail-image"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Thumbnail Image URL
              </label>
              <input
                type="url"
                name="thumbnail"
                id="thumbnail-image"
                placeholder="thumbnail image url..."
                className="mb-10 block w-full p-3 px-4 text-gray-100 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 tracking-wider"
                value={postData.thumbnail}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* title */}
            <div className="mb-6">
              <label
                htmlFor="post-title"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Post Title
              </label>
              <input
                type="text"
                name="title"
                id="post-title"
                placeholder="post title..."
                className="mb-10 block w-full p-3 px-4 text-gray-100 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 tracking-wider"
                value={postData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* slug */}
            <div className="mb-6">
              <label
                htmlFor="post-title"
                className="block mb-2 text-sm font-medium text-gray-100"
              >
                Post Slug
              </label>
              <input
                type="text"
                name="slug"
                id="post-slug"
                placeholder="post slug..."
                className="mb-10 block w-full p-3 px-4 text-gray-100 border rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 tracking-wider"
                value={postData.slug}
                onChange={handleInputChange}
                required
              />
            </div>

            <Editor setDescription={setPostData} />
          </div>

          {/* category and post tags */}
          <div className="w-full md:w-4/12">
            <CategorieInput setCategory={setPostData} />
            <TagInputBox setTags={setPostData} />
          </div>

          {/* submit button */}
          <button
            type="submit"
            id={styles["post-submit-button"]}
            className={`w-full my-10 md:mx-28 rounded-md text-gray-100 text-xl flex justify-center items-center`}
            style={{
              background: `linear-gradient(45deg, #ff00cc, #4242ac)`,
              padding: "2px",
            }}
          >
            <span
              className="w-full tracking-widest relative py-3 transition-all ease-in duration-75 bg-gray-900 rounded-md"
              onClick={createPost}
            >
              Create Post
            </span>
          </button>
        </section>
      </main>
    </>
  );
}
