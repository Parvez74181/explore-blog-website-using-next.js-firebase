import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
  orderBy,
  serverTimestamp,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import swal from "sweetalert";

export default function AddCategory() {
  const [cateogries, setCateogries] = useState([]);

  const addCategory = async () => {
    try {
      let value = document.querySelector("#category-input").value.trim();
      // Add a new document with a generated id.
      await addDoc(collection(db, "categories"), {
        name: value,
        timeStamp: serverTimestamp(),
      });
      value = "";
      swal({
        title: "Success",
        text: "Category is successfully added!",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "Category is not added!",
        icon: "error",
      });
    }
  };

  // after every time category is updateDoc, deleted, added, show the realtime database data by order 'timeStamp'
  useEffect(() => {
    onSnapshot(collection(db, "categories"), (querySnapshot) => {
      let list = [];
      querySnapshot?.forEach((doc) => {
        let data = doc.data();

        let date = new Date(data?.timeStamp?.seconds * 1000);
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        let timeStamp =
          date.getDay() +
          "/" +
          months[date.getMonth()] +
          "/" +
          date.getFullYear();

        list.push({ id: doc?.id, name: data?.name, timeStamp });
      });

      setCateogries(list);
    });
  }, []);

  const editCategory = (e) => {
    let id = e?.target?.dataset?.id;
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Enter category",
          type: "text",
        },
      },
    });

    let swal_btn = document.querySelector(".swal-button--confirm");

    const updateData = async () => {
      let data = swal.getState();
      let value = data?.actions?.confirm?.value;
      if (value.length !== 0) {
        await updateDoc(doc(db, "categories", id), {
          name: value,
        });

        e.target.parentNode.parentNode.classList.add("bg-orange-100");
        setTimeout(() => {
          e.target.parentNode.parentNode.classList.remove("bg-orange-100");
        }, 1500);
      }
    };
    addEventListener("keydown", (e) => {
      if (e.key === "Enter") updateData();
    });
    swal_btn?.addEventListener("click", updateData);
  };

  const deleteCategory = async (e) => {
    let id = e?.target?.dataset?.id;
    try {
      await deleteDoc(doc(db, "categories", id));
      swal({
        title: "Success",
        text: "Category is successfully deleted!",
        icon: "success",
      });
    } catch (error) {
      swal({
        title: "Error",
        text: "Category is not deleted!",
        icon: "error",
      });
    }
  };
  return (
    <>
      <main className="min-h-screen tracking-wider">
        <h1 className="text-gray-300 text-center text-4xl mt-20 md:mb-24">
          Categories
        </h1>
        <div className="relative w-4/5 mx-auto bg-gray-700 mt-20">
          <input
            type="text"
            id="category-input"
            className="block w-full p-4 pl-10 text-sm text-gray-100 border rounded-md bg-gray-700 border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 tracking-wider  "
            placeholder="Add category..."
            required
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-0.5 font-medium text-sm px-4 py-2 rounded-md text-gray-100  flex justify-center items-center"
            style={{
              background: `linear-gradient(45deg, #ff00cc, #4242ac)`,
              padding: "2px",
            }}
          >
            <span
              className="w-full tracking-widest relative py-3 px-4 transition-all ease-in duration-75 bg-gray-900 rounded-md"
              onClick={addCategory}
            >
              Add Category
            </span>
          </button>
        </div>
        <div className="w-4/5 mx-auto mt-2 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center tracking-wider text-gray-400">
            <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Category name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {cateogries.map((category) => {
                return (
                  <>
                    <tr
                      key={category.id}
                      className=" border-b border-gray-700 bg-gray-800 hover:bg-gray-600 "
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-left whitespace-nowrap text-gray-100"
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4">{category.timeStamp}</td>
                      <td className="px-6 py-4 ">
                        <i
                          className="fa-solid fa-pen-to-square text-green-500 cursor-pointer"
                          data-id={category.id}
                          data-time={category.timeStamp}
                          onClick={editCategory}
                        ></i>
                      </td>
                      <td className="px-6 py-4 ">
                        <i
                          title="delete"
                          className="fa-solid fa-trash text-red-500 cursor-pointer"
                          data-id={category.id}
                          onClick={deleteCategory}
                        ></i>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
