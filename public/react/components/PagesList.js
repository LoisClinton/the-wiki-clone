import React, { useState, useEffect } from "react";

// import { Page } from "./Page";  //dont seem to need for now

//the api url for any fetch calls
import apiURL from "../api";

export const PagesList = ({ pages, singlePage, setSinglePage }) => {
  const handleViewClick = (thisPage) => {
    setSinglePage(thisPage);
  };
  const contentShortener = (content) => {
    const contArr = content.split(" ");

    const contentPreview = `${contArr[0]} ${contArr[1]} ${contArr[2]} ${contArr[3]} ${contArr[4]} ${contArr[5]} ${contArr[6]}...`;
    return contentPreview;
  };
  return (
    <div className="list-content-holder">
      {console.log(pages)}
      {pages.map((page, idx) => {
        return (
          <div className="white-background-box background-box-list">
            <h3 className="dark-text">{page.title}</h3>
            <p className="dark-text">{contentShortener(page.content)}</p>
            <div className="button-container">
              <button
                className="stylized-words"
                onClick={() => handleViewClick(page)}
              >
                View Page
              </button>
              <button
                className="stylized-words"
                onClick={() => handleViewClick(page)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
