import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils/firebaseConfig";
import swal from "sweetalert";
import styles from "../../styles/Admin-Panel.module.scss";
import { useRouter } from "next/router";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [adminAccessToken, setAdminAccessToken] = useState(false);
  const router = useRouter();

  // to access that admin is logged or not
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

  // category add
  const addCategory = async () => {
    try {
      let value = document
        .querySelector("#category-input")
        .value.trim()
        .toLowerCase(); // get the input value and trim and convert into lower case

      // Add a new document
      console.log(db);
      await addDoc(collection(db, "categories"), {
        name: value,
        timeStamp: serverTimestamp(),
      });

      value = ""; // clear the input value from category input box
      // show a success message
      swal({
        title: "Success",
        text: "Category is successfully added!",
        icon: "success",
      });
    } catch (error) {
      // if something wrong, show an error
      console.log(error);
      swal({
        title: "Error",
        text: "Category is not added!",
        icon: "error",
      });
    }
  };

  // after every time category is updateDoc, deleted, added, show the realtime database data by order 'timeStamp'
  useEffect(() => {
    onSnapshot(
      query(collection(db, "categories"), orderBy("timeStamp", "desc")),
      (querySnapshot) => {
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

        setCategories(list);
      },
      (error) => {
        console.log("error when fethcing:", error);
      }
    );
  }, []);

  // category edit handler
  const editCategory = (e) => {
    let id = e?.target?.dataset?.id; // get the clicked element id
    // show an input modal to get the text
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Enter category",
          type: "text",
        },
      },
    });

    let swal_btn = document.querySelector(".swal-button--confirm"); // select the modal submit button

    // document update function
    const updateData = async () => {
      let data = swal.getState(); // get the swal modal state
      let value = data?.actions?.confirm?.value; // get the value that admin entered in the input box

      // if value is exist then update the docuemnt, else dont update
      if (value.length !== 0) {
        await updateDoc(doc(db, "categories", id), {
          name: value,
        });

        e.target.parentNode.parentNode.classList.add("bg-orange-100"); // set the updated table row backgorund orange and after 1500ms, remove the class

        setTimeout(() => {
          e.target.parentNode.parentNode.classList.remove("bg-orange-100");
        }, 1500);
      }
    };

    // if user press enter on keyboard of click on the swal modal button then update the document
    addEventListener("keydown", (e) => {
      if (e.key === "Enter") updateData();
    });
    swal_btn?.addEventListener("click", updateData);
  };

  // delete category handler

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
      {adminAccessToken && (
        <main className="min-h-screen tracking-wider">
          <h1 className="text-center text-4xl mt-20 md:mb-24">Categories</h1>
          {/* category input box */}
          <div className="relative w-4/5 mx-auto mt-20">
            <input
              type="text"
              id="category-input"
              className="block w-full p-4 pl-10 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 tracking-wider  "
              placeholder="Add category..."
              required
            />
            <button
              type="submit"
              className="absolute right-1 bottom-0.5 font-medium text-sm px-4 py-2 rounded-md  flex justify-center items-center"
              style={{
                background: `linear-gradient(-45deg, #ff00cc, #8D39F8)`,
                padding: "2px",
              }}
            >
              <span
                className={`${styles["add-category-btn"]} w-full tracking-widest relative py-3 px-4 transition-all ease-in duration-75 bg-gray-100 rounded-md`}
                onClick={addCategory}
              >
                Add Category
              </span>
            </button>
          </div>
          {/* category list table */}
          <div className="w-4/5 mx-auto mt-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center tracking-wider bg-white">
              <thead className="text-xs  uppercase bg-slate-200 ">
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
                {categories.map((category) => {
                  return (
                    <tr key={category.id} className=" border-b  ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-left whitespace-nowrap"
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      )}
    </>
  );
}
