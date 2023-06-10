import styles from "../src/styles/Create-Post.module.scss";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/pages/firebase";

export default function CategorieInput({ setCategory }) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [categories, setCategories] = useState();

  const handleClick = (e) => {
    let value = e.target.innerText;
    setSelectedCategory(value);
  };

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (querySnapshot) => {
      let list = [];
      querySnapshot?.forEach((doc) => {
        let data = doc.data();
        list.push({ id: doc.id, name: data?.name });
      });
      setCategories(list);
    });
  }, []);

  useEffect(() => {
    setCategory((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
  }, [selectedCategory, setCategory]);

  return (
    <>
      <div className="border shadow-md mt-10 md:mt-24 w-full md:w-9/12 bg-white rounded-md p-5 ">
        <h1 className={`${styles["category-heading"]} mb-5`}>
          Select Category
        </h1>
        <ul className="category-list max-h-80 overflow-auto">
          {categories?.map((category) => {
            return (
              <li
                key={category.id}
                className="my-3 p-3 border rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition delay-75 "
                onClick={handleClick}
                id={category.id}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </div>
      <textarea
        name="category-output"
        id="category-output"
        className="mt-5 w-full md:w-9/12 tags-output bg-transparent border border-gray-400  resize"
        value={selectedCategory}
        readOnly
      ></textarea>
    </>
  );
}
