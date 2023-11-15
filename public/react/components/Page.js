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

  useEffect(() => {
    fetchPageDetails();
  }, []);

  return (
    <>
      {pageDetails ? (
        <div>
          {console.log(pageDetails)}
          <h1>{pageDetails.title}</h1>
          <h3>
            <p>{pageDetails.author.name}</p>
          </h3>
          <p>
            <b>created on:</b> {getDateOrTime(pageDetails.createdAt, "date")}
          </p>
          <p>
            <b>at:</b> {getDateOrTime(pageDetails.createdAt, "time")}
          </p>
          <p>{pageDetails.content}</p>
          {pageDetails.tags.map((tag, index) => (
            <p key={index}>#{tag.name}</p>
          ))}
        </div>
      ) : (
        <h1>LOADING</h1>
      )}
    </>
  );
};
