import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Page } from "./Page";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  // state for list of pages
  const [pages, setPages] = useState([]);

  // state for one page
  const [singlePage, setSinglePage] = useState("");

  // function to fetch the list of pages
  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  //fetches the List of pages on load
  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <main>
      <h1 className="logo-text stylized-words">WikiVerse</h1>
      <h3 className="stylized-words">
        <i>
          Read, Write, <span className="font-thin">what you </span> Love 📚
        </i>
      </h3>

      {/* {conditional statement to render either a list of pages or a single page} */}
      {singlePage ? (
        // single page
        <Page page={singlePage} setSinglePage={setSinglePage} />
      ) : (
        // list of all pages
        <PagesList
          pages={pages}
          singlePage={singlePage}
          setSinglePage={setSinglePage}
        />
      )}
    </main>
  );
};
