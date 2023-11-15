import React, { useState, useEffect } from "react";

// import { Page } from "./Page";  //dont seem to need for now

//the api url for any fetch calls
import apiURL from "../api";

export const PagesList = ({ pages, singlePage, setSinglePage }) => {
  const handleClick = (thisPage) => {
    setSinglePage(thisPage);
  };
  return (
    <>
      {console.log(pages)}
      {pages.map((page, idx) => {
        return (
          <>
            <h3>{page.title}</h3>
            <p>{page.content}</p>
            <button onClick={() => handleClick(page)}>View Page</button>
          </>
        );
      })}
    </>
  );
};
