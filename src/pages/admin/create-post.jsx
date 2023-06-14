import CategorieInput from "../../../components/CategorieInput";
import Editor from "../../../components/Editor";
import TagInputBox from "../../../components/TagInputBox";
import styles from "../../styles/Create-Post.module.scss";
import { useState, useEffect } from "react";
import { db } from "../../../utils/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import swal from "sweetalert";
import { useRouter } from "next/router";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    thumbnail: "",
    title: "",
    slug: "",
    description: "",
    category: "",
    tag: [],
  });
  const [adminAccessToken, setAdminAccessToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken"); // get the accessToken from localStorage

    // handle accessToken checking
    const checkAccessToken = async () => {
      // make a request to backend for checking the token is verifyed or not
      let res = await fetch("/api/checkAdminAccessToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (res.ok) setAdminAccessToken(true);
      // if accessToken is verifyed that means res is ok, make adminAccessToken is true so admin can see the admin panel
      else if (!res.ok) router.push("/"); // if accessToken isn't verifyed then send the user to home page
    };
    checkAccessToken();
  }, []);

  const sendDataToServer = async () => {
    try {
      await addDoc(collection(db, "blogs"), {
        postData,
        timeStamp: serverTimestamp(),
      });
      swal({
        title: "Success",
        text: "Post successfully created! ",
        icon: "success",
      });

      // after 200ms reload the page
      setTimeout(() => {
        location.reload();
      }, 200);
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
      {adminAccessToken && (
        <main className="min-h-screen">
          <h1 className="text-center text-4xl mt-20 md:mb-24">
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
                  className="block mb-2 text-sm font-medium "
                >
                  Thumbnail Image URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  id="thumbnail-image"
                  placeholder="thumbnail image url..."
                  className="mb-10 block w-full p-3 px-4  border rounded-lg placeholder-slate-600 focus:ring-blue-500 focus:border-blue-500   tracking-wider"
                  value={postData.thumbnail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* title */}
              <div className="mb-6">
                <label
                  htmlFor="post-title"
                  className="block mb-2 text-sm font-medium "
                >
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="post-title"
                  placeholder="post title..."
                  className="mb-10 block w-full p-3 px-4  border rounded-lg focus:ring-blue-500 focus:border-blue-500   placeholder-slate-600 tracking-wider"
                  value={postData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* slug */}
              <div className="mb-6">
                <label
                  htmlFor="post-title"
                  className="block mb-2 text-sm font-medium "
                >
                  Post Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  id="post-slug"
                  placeholder="this-is-slug..."
                  className="mb-10 block w-full p-3 px-4  border rounded-lg focus:ring-blue-500 focus:border-blue-500  placeholder-slate-600  tracking-wider"
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

              {/* metadata adding options */}
              {/* meta title */}
              <div className="mb-6 mt-6">
                <label
                  htmlFor="meta-title"
                  className="block mb-2 text-sm font-medium "
                >
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta-title"
                  id="meta-title"
                  placeholder="meta title..."
                  className="mb-10 block w-full md:w-9/12 p-3 px-4  border rounded-lg focus:ring-blue-500 focus:border-blue-500   placeholder-slate-600 tracking-wider"
                  value={postData.metaTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* meta description */}
              <div className="mb-6 mt-6">
                <label
                  htmlFor="meta-description"
                  className="block mb-2 text-sm font-medium "
                >
                  Meta Description
                </label>
                <textarea
                  type="text"
                  name="meta-description"
                  id="meta-description"
                  placeholder="meta description..."
                  className="mb-10 block w-full md:w-9/12 p-3 px-4  border rounded-lg focus:ring-blue-500 focus:border-blue-500   placeholder-slate-600 tracking-wider"
                  value={postData.metaDescription}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>

            {/* submit button */}
            <button
              type="submit"
              id={styles["post-submit-button"]}
              className={`fixed right-10 top-24 rounded-md  text-xl flex justify-center items-center`}
              style={{
                background: `linear-gradient(-45deg, #ff00cc, #8D39F8)`,
                padding: "2px",
              }}
            >
              <span
                className="w-full tracking-widest relative px-4 py-3 transition-all ease-in duration-75 bg-gray-100 hover:text-white  rounded-md"
                onClick={createPost}
              >
                Create Post
              </span>
            </button>
          </section>
        </main>
      )}
    </>
  );
}
