import styles from "../src/styles/Create-Post.module.scss";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/pages/firebase";

export default function CategorieInput({ setCategory }) {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleClick = (e) => {
    e.target.classList.toggle("bg-gray-400");
    e.target.classList.toggle("text-black");

    if (e.target.dataset.select === "selected") {
      e.target.dataset.select = "";
      let value = e.target.innerText;
      let index = selectedCategory.indexOf(value);

      selectedCategory.splice(index, 1);
      setSelectedCategory([...selectedCategory]);
    } else {
      e.target.dataset.select = "selected";
      let value = e.target.innerText;
      setSelectedCategory([...selectedCategory, value]);
    }
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
      <div className="mt-10 md:mt-24 w-full md:w-9/12 bg-gray-800 rounded-md p-5 text-gray-300">
        <h1 className={`${styles["category-heading"]} mb-5`}>
          Select Category
        </h1>
        <ul className="category-list max-h-80 overflow-auto">
          {categories?.map((category) => {
            return (
              <li
                key={category.id}
                className="my-3 p-3 rounded-md bg-gray-700 hover:bg-gray-600 cursor-pointer transition delay-75 "
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
        className="tags-output bg-transparent border border-gray-400 text-gray-300 resize"
        value={selectedCategory}
        readOnly
      ></textarea>
    </>
  );
}
