import React, { useState, useEffect } from "react";

// import { Page } from "./Page";  //dont seem to need for now

//the api url for any fetch calls
import apiURL from "../api";

export const PagesList = ({
  pages,
  setPages,
  singlePage,
  setSinglePage,
  fetchPages,
}) => {
  const handleViewClick = (thisPage) => {
    setSinglePage(thisPage);
  };
  const handleDeleteClick = async (thisPage) => {
    const pageSlug = thisPage.slug;
    await fetch(`${apiURL}/wiki/${pageSlug}`, {
      method: "DELETE",
    });
    const response = await fetchPages();
    window.alert("item deleted");
  };
  const contentShortener = (content) => {
    const contArr = content.split(" ");
    const contentPreview = `${contArr[0]} ${contArr[1]} ${contArr[2]} ${contArr[3]} ${contArr[4]} ${contArr[5]} ${contArr[6]}...`;
    return contentPreview;
  };
  return (
    <div className="list-content-holder">
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
                onClick={() => handleDeleteClick(page)}
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
