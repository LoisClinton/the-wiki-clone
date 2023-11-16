import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import { Page } from "./Page";
import { Create } from "./Create";
import { LogIn } from "./LogIn";
import { AccountMaker } from "./AccountMaker";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  //state for loggedIn
  const [loggedIn, setLoggedIn] = useState(false);

  //state for logInDetails
  const [logInDetails, setLogInDetails] = useState({});

  // state for list of pages
  const [pages, setPages] = useState([]);

  // state for one page
  const [singlePage, setSinglePage] = useState("");

  //state for create component
  const [create, setCreate] = useState(false);

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

  const handlePostClick = async (thisPage) => {
    setCreate(true);
  };

  const handlePost = async (thisPage) => {
    const pageSlug = thisPage.slug;
    await fetch(`${apiURL}/wiki/${pageSlug}`, {
      method: "POST",
    });
    const response = await fetchPages();
    window.alert("page added");
  };

  //fetches the List of pages on load
  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <main>
      {loggedIn ? (
        <>
          <header>
            <div className="title-container">
              <h1 className="logo-text stylized-words">WikiVerse</h1>
            </div>
            <div className="create-button-container">
              <button className="create-button" onClick={handlePostClick}>
                +
              </button>
            </div>
          </header>
          <h3 className="stylized-words">
            <i>
              Read, Write, <span className="font-thin">what you </span> Love 📚
            </i>
          </h3>

          {create ? (
            <Create
              setCreate={setCreate}
              pages={pages}
              setPages={setPages}
              singlePage={singlePage}
              setSinglePage={setSinglePage}
              fetchPages={fetchPages}
            />
          ) : singlePage ? (
            // single page
            <Page page={singlePage} setSinglePage={setSinglePage} />
          ) : (
            // list of all pages
            <PagesList
              pages={pages}
              setPages={setPages}
              singlePage={singlePage}
              setSinglePage={setSinglePage}
              fetchPages={fetchPages}
            />
          )}
        </>
      ) : (
        <LogIn setLoggedIn={setLoggedIn} setLogInDetails={setLogInDetails} />
      )}
    </main>
  );
};
