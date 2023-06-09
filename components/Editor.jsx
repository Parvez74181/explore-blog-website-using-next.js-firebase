import { useState, useEffect, useCallback, useRef } from "react";
import styles from "../src/styles/Create-Post.module.scss";

export default function Editor({ setDescription }) {
  const [textEditor, setTextEditor] = useState("");
  const textEditorRef = useRef(null);
  // this function stores all the formating html and text so that we can use the data with all the formating that we have done
  const outputText = useCallback(() => {
    const textEditor = textEditorRef.current.innerHTML;
    const dummyTextEditor = document.querySelector(".text-editor-output");
    dummyTextEditor.value = textEditor;
  }, []);

  // main function to formate the editor values
  const format = useCallback(
    (command, value = null) => {
      document.execCommand(command, false, value);
      outputText();
    },
    [outputText]
  );

  // insert headings to text editor
  const formatHeading = useCallback(() => {
    const heading = document.getElementById("heading").value;
    if (heading) {
      format("formatBlock", heading);
    }
  }, [format]);

  // insert font size to text editor
  const formatFontSize = useCallback(() => {
    const size = document.getElementById("fontSize").value;
    if (size) {
      format("fontSize", size);
    }
  }, [format]);

  // insert link to text editor
  const insertLink = useCallback(() => {
    const url = prompt("Enter the URL:");
    if (url) {
      format("createLink", url);
    }
  }, [format]);

  // insert image to text editor
  const insertImage = useCallback(() => {
    let url = prompt("Enter the URL of the image: ");
    const title = prompt("Enter the image alt text: ");

    if (url) {
      if (url.includes("drive.google.com")) {
        url = url.split("/")[5];
        format(
          "insertHTML",
          `<img src="https://drive.google.com/uc?export=view&id=${url}" loading='lazy' alt='${title}'/>`
        );
      } else {
        console.log(url);
        format(
          "insertHTML",
          `<img src="${url}" loading='lazy' alt='${title}'/>`
        );
      }
    }
  }, [format]);

  // font color
  const chooseForeColor = useCallback(() => {
    let foreColorInput = document.querySelector("#foreColor");
    foreColorInput.click();

    foreColorInput.addEventListener("change", (e) => {
      format("foreColor", e.target.value);
    });
  }, [format]);

  // background color
  const chooseBackColor = useCallback(() => {
    let backColorInput = document.querySelector("#backColor");
    backColorInput.click();

    backColorInput.addEventListener("change", (e) => {
      format("backColor", e.target.value);
    });
  }, [format]);

  // insertTable
  const insertTable = useCallback(() => {
    const rows = prompt("Enter the number of rows:");
    const columns = prompt("Enter the number of columns:");

    if (rows && columns) {
      let tableHTML = "<table class='w-full text-left text-gray-500 p-3'>";
      for (let i = 0; i < rows; i++) {
        tableHTML += "<tr>";
        for (let j = 0; j < columns; j++) {
          tableHTML += "<td contenteditable='true' class='px-6 py-4'></td>";
        }
        tableHTML += "</tr>";
      }
      tableHTML += "</table>";

      format("insertHTML", tableHTML);
    }
  }, [format]);

  // table of content
  const tableOfContent = useCallback(() => {
    const textEditor = document.querySelector(".text-box");
    // Get all heading elements
    const headings = textEditor.querySelectorAll("h1, h2, h3, h4, h5, h6");

    const headingList = document.createElement("ul"); // Create a ul html tag
    headingList.id = "table-of-content";
    let listHtml = "";

    // Iterate over each heading
    headings.forEach((heading, i) => {
      // Generate a unique ID for the heading if it doesn't have one
      if (!heading.id) heading.id = "heading" + (i + 1);

      // Create a list item with a link to the heading
      listHtml += `<li><a href='#${heading.id}'>${heading.textContent}</a></li>`;
    });

    // Insert the headingList at the beginning of the text editor
    format("insertHTML", `<ul id='table-of-content'>${listHtml}</ul>`);
  });

  const handleInput = (e) => {
    setTextEditor(e.target.innerHTML);
  };

  useEffect(() => {
    setDescription((prevData) => ({
      ...prevData,
      description: textEditor,
    }));
  }, [textEditor, setDescription]);

  return (
    <>
      <div className="editor" style={{ width: "100%" }}>
        {/* tools */}
        <div className="tools mb-10 flex flex-wrap gap-5 md:gap-7 sticky top-24 bg-white shadow-md p-5 rounded-md">
          <button
            title="bold"
            className="fa-solid fa-bold cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("bold");
            }}
          ></button>

          <button
            title="add button"
            className="fa-solid fa-toggle-on cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              const buttonTxt = prompt("Enter button text: ");
              format(
                "insertHTML",
                `<button class="p-2 px-5 rounded-full outline-none flex justify-center items-center shadow-lg bg-yellow-400 hover:bg-yellow-300 transition-all delay-75" style='min-width:100px;'>${buttonTxt}</button>`
              );
            }}
          ></button>

          <button
            title="italic"
            className="fa-solid fa-italic cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("italic");
            }}
          ></button>
          <button
            title="underline"
            className="fa-solid fa-underline cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("underline");
            }}
          ></button>

          <button
            title="insert table"
            className="fa-solid fa-table cursor-pointer border border-gray-700 p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white"
            onClick={insertTable}
          ></button>

          <button
            title="link"
            className="fa-solid fa-link cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={insertLink}
          ></button>
          <button
            title="image"
            className="fa-solid fa-image cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={insertImage}
          ></button>

          {/* unorder list */}
          <button
            title="unorder list"
            className="fa-solid fa-list cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("insertUnorderedList");
            }}
          ></button>

          {/* order list */}
          <button
            title="order list"
            className="fa-solid fa-list-ol cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("insertOrderedList");
            }}
          ></button>

          {/* justify left */}
          <button
            title="justifyLeft"
            className="fa-solid fa-align-left cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("justifyLeft");
            }}
          ></button>

          {/* justify center */}
          <button
            title="justifyCenter"
            className="fa-solid fa-align-center cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("justifyCenter");
            }}
          ></button>

          {/* justify right */}
          <button
            title="justifyRight"
            className="fa-solid fa-align-right cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("justifyRight");
            }}
          ></button>

          {/* justify all */}
          <button
            title="justifyFull"
            className="fa-solid fa-align-justify cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("justifyFull");
            }}
          ></button>

          {/* table of content */}
          <button
            title="table of content"
            className="fa-solid fa-table-list cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={tableOfContent}
          ></button>

          {/* undo button */}
          <button
            title="undo"
            className="fa-solid fa-rotate-left cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("undo");
            }}
          ></button>

          {/* redo button */}
          <button
            title="redo"
            className="fa-solid fa-rotate-right cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("redo");
            }}
          ></button>

          {/* subscript button */}
          <button
            title="subscript"
            className="fa-solid fa-subscript cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("subscript");
            }}
          ></button>

          {/* superscript button */}
          <button
            title="superscript"
            className="fa-solid fa-superscript cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("superscript");
            }}
          ></button>

          {/* <!-- font Color --> */}
          <button
            title="color"
            className="fa-solid fa-droplet cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={chooseForeColor}
          ></button>
          <input type="color" id="foreColor" className="hidden" />

          {/* backColor color */}
          <button
            title="background"
            className="fa-solid fa-fill cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={chooseBackColor}
          ></button>
          <input type="color" id="backColor" className="hidden" />

          {/* remove all formate */}
          <button
            title="remove all formatting"
            className="fa-solid fa-eraser cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-12 flex justify-center items-center bg-white "
            onClick={() => {
              format("removeFormat");
            }}
          ></button>

          {/* font-size */}
          <select
            title="font size"
            id="fontSize"
            className="cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-26 flex justify-center items-center "
            onChange={formatFontSize}
          >
            <option value="">Size</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>

          {/* headings */}
          <select
            title="heading"
            id="heading"
            className="cursor-pointer border border-gray-700  p-2 px-4 rounded-md w-26 flex justify-center items-center "
            onChange={formatHeading}
          >
            <option value="">Heading</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        </div>

        {/* text-editor */}
        <div className="text-editor w-full h-full">
          <div
            ref={textEditorRef}
            id={styles["text-box"]}
            className="text-box border bg-white border-gray-700 0 rounded-md w-full h-full p-4  mt-10 resize-y"
            contentEditable={true}
            value={textEditor}
            onInput={handleInput}
          ></div>
        </div>
        <textarea
          name="desc"
          id="desc"
          className="mt-5 w-full h-20 text-editor-output p-3 bg-transparent border border-gray-600 resize "
          value={textEditor}
          readOnly
        ></textarea>
      </div>
    </>
  );
}
