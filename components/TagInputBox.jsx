import { useState, useEffect } from "react";
import styles from "../src/styles/Create-Post.module.scss";

function TagInputBox({ setTags }) {
  const [tags, setLocalTags] = useState([]); // for storing the tags first and then save the tags into documentationData

  // for adding tags into the tag box
  const addTag = (e) => {
    if (e.key === "Enter") e.preventDefault(); // if keyDown is 'enter' then don't do anything and don't submit the form

    if (e.key === " ") {
      let value = e.target.value;

      if (value === " ") return;

      setLocalTags([...tags, value.trim()]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    setTags((prevData) => ({
      ...prevData,
      tag: tags,
    }));
  }, [tags, setTags]);

  // for removing tags
  const removeTag = (e) => {
    tags.splice(parseInt(e.target.id), 1);
    setLocalTags([...tags]);
  };

  return (
    <>
      <div className="border shadow-md mt-10 md:mt-24  w-full md:w-9/12 bg-white  rounded-md p-5 ">
        <h1 className={`${styles["tag-heading"]} mb-7`}>Enter Post Tags</h1>
        {/* tag box */}
        <div className="tag-box w-full my-5 flex flex-wrap justify-start items-center gap-2  max-h-64 overflow-auto">
          {tags?.map((tag, i) => (
            <span key={i} className="bg-gray-100  p-3 rounded-md">
              {tag} &nbsp;
              <i
                className="bg-gray-200  p-1 w-6 h-6 text-center rounded-full cursor-pointer hover:bg-gray-300 transition delay-75 fa-solid fa-xmark"
                id={i}
                onClick={removeTag}
              ></i>
            </span>
          ))}
        </div>

        {/* tag input box */}
        <input
          type="text"
          name="tag-input"
          id="tag-input"
          className=" my-3 w-full p-3 bg-gray-100 border rounded-md"
          placeholder="Enter Tags"
          onKeyDown={addTag}
        />
      </div>

      <textarea
        name="tags-output"
        id="tags-output"
        className="mt-5 w-full md:w-9/12 tags-output bg-transparent border border-gray-400  resize "
        value={tags}
        readOnly
      ></textarea>
    </>
  );
}

export default TagInputBox;
