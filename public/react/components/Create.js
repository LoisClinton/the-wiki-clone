import React, { useState, useEffect } from "react";

// import { Page } from "./Page";  //dont seem to need for now

//the api url for any fetch calls
import apiURL from "../api";

export const Create = ({
  setCreate,
  pages,
  setPages,
  singlePage,
  setSinglePage,
  fetchPages,
  logInDetails,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const backToList = () => {
    setCreate(false);
  };

  const postSubmit = async (reqBody) => {
    if (!reqBody.hasOwnProperty("name")) {
      reqBody.name = "Default Name";
    }

    console.log(reqBody);
    // JSON.stringify()
    await fetch(`${apiURL}/wiki`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    await fetchPages();
    setTitle("");
    setContent("");
    setTags("");
    window.alert("Item posted");
    backToList();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = {
      name: logInDetails.name,
      email: logInDetails.email,
      title: title,
      content: content,
      status: "open",
      tags: tags,
    };
    postSubmit(request);
  };

  return (
    <div className="white-background-box background-box-form">
      <form className="form-template" aria-label="form" onSubmit={handleSubmit}>
        <h3 className="dark-text">Create a post</h3>
        <div className="input-container">
          <p className="dark-text">Title:</p>
          <input
            id="title"
            className="dark-text input-field"
            type="text"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              console.log(title);
            }}
          />
        </div>
        <div className="input-container">
          <p className="dark-text">Content:</p>
          <textarea
            id="content"
            className="dark-text input-field"
            type="text"
            placeholder="Write your post here..."
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <div className="input-container">
          <p className="dark-text">
            Tags<i className="faded-dark-text"> (seperate with comma) </i>:
          </p>
          <input
            id="tags"
            className="dark-text input-field"
            type="text"
            placeholder="tags"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={backToList}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
