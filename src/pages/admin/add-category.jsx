import { useEffect, useState } from "react";
import swal from "sweetalert";
import styles from "../../styles/Admin-Panel.module.scss";
import { useRouter } from "next/router";
import axios from "axios";
import Button from "../../../components/Button";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState("");
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
      // Add a new document
      await axios.post("/api/createCategory", {
        name: input,
      });

      setInput(""); // clear the input value from category input box
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
        text: error.response.data.error,
        icon: "error",
      });
    }
  };

  // get categories
  useEffect(() => {
    const getCategories = async () => {
      let res = await axios("/api/getCategories");
      setCategories(res.data);
    };
    getCategories();
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
        await axios.post("/api/updateCategory", {
          name: value,
          id: id,
        });

        e.target.parentNode.parentNode.classList.add("bg-green-100"); // set the updated table row backgorund orange and after 1500ms remove the class
        setTimeout(() => {
          e.target.parentNode.parentNode.classList.remove("bg-green-100");
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
      await axios.post("/api/deleteCategory", { id });

      swal({
        title: "Success",
        text: "Category is successfully deleted!",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Error",
        text: error.response.data.error,
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
          <div className="relative w-4/5 mx-auto mt-20 flex justify-between">
            <input
              type="text"
              id="category-input"
              className="block w-full p-4 pl-10 text-sm border rounded-md focus:ring-blue-500 focus:border-blue-500 tracking-wider  "
              placeholder="Add category..."
              value={input}
              onChange={(e) => {
                setInput(e.target.value.trim());
              }}
              required
            />
            {/* button to add category */}
            <span
              className="absolute -bottom-1.5 -right-3.5 font-medium text-sm px-4 py-2 rounded-md"
              onClick={addCategory}
            >
              <Button text={"Add Category"} />
            </span>
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
                      <td className="px-6 py-4">{category.createdAt}</td>
                      <td className="px-6 py-4 ">
                        <i
                          className="fa-solid fa-pen-to-square text-green-500 cursor-pointer"
                          data-id={category.id}
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
