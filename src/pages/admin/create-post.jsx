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
    metaDescription: "",
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

  const createPost = (e) => {
    // show the loading animation when login button clicked
    e.target.innerHTML = ` <svg aria-hidden="true" role="status" class="inline w-4 h-4 text-3xl mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
    </svg> Creating...`;
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

              {/* meta description */}
              <div className="mb-6 mt-6">
                <label
                  htmlFor="meta-description"
                  className="block mb-2 text-sm font-medium "
                >
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
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
