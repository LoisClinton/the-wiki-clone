import React, { useState, useEffect } from "react";
//the api url for any fetch calls
import apiURL from "../api";

export const Page = (props) => {
  const [pageDetails, setPageDetails] = useState();

  const pageSlug = props.page.slug; // the thing to put in the fetch url

  async function fetchPageDetails() {
    try {
      const response = await fetch(`${apiURL}/wiki/${pageSlug}`);
      const pageDetailsData = await response.json();
      setPageDetails(pageDetailsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  // Function to get date of time (could move this into App.js to use across all components)
  const getDateOrTime = (str, valueToGet) => {
    str = str.replace("T", " ");
    str = str.replace("Z", " ");
    str.trim();

    const dateTime = str.split(" ");

    const ymd = dateTime[0].split("-");
    const date = `${ymd[2]}/${ymd[1]}/${ymd[0]}`;

    const time = dateTime[1].substr(0, 5);

    switch (valueToGet) {
      case "date":
        return date;
      case "time":
        return time;
    }
  };

  const backToList = () => {
    props.setSinglePage("");
  };

  useEffect(() => {
    fetchPageDetails();
  }, []);

  return (
    <>
      {pageDetails ? (
        <div className="white-background-box background-box-page">
          {console.log(pageDetails)}
          <div className="page-header-container">
            <div>
              <h1 className="dark-text">{pageDetails.title}</h1>
              <h3 className="dark-text">{pageDetails.author.name}</h3>
            </div>
            <div>
              <p className="dark-text">
                <b className="dark-text">created on:</b>{" "}
                {getDateOrTime(pageDetails.createdAt, "date")}
              </p>
              <p className="dark-text">
                <b className="dark-text">at:</b>{" "}
                {getDateOrTime(pageDetails.createdAt, "time")}
              </p>
            </div>
          </div>
          <div className="page-content-container">
            <p className="dark-text">{pageDetails.content}</p>
          </div>

          {pageDetails.tags.map((tag, index) => (
            <p className="faded-dark-text font-bold tag-text" key={index}>
              #{tag.name}
            </p>
          ))}
        </div>
      ) : (
        <h1>LOADING</h1>
      )}
      <button onClick={backToList}>Back to Wiki List</button>
    </>
  );
};
