import React, { useState, useEffect } from "react";
import apiURL from "../api";

export const AccountMaker = ({ setLoggedIn, setLogInDetails }) => {
  return (
    <>
      <div>
        <h1 className="logo-text stylized-words">WikiVerse</h1>
      </div>
      <div className="white-background-box background-box-login">
        <form className="form-login form-template" aria-label="form">
          <h3 className="dark-text">Create Account</h3>
          <div>
            <p className="dark-text">Name:</p>
            <input
              id="username"
              className="dark-text input-field"
              type="text"
              placeholder="name"
            />
          </div>
          <div>
            <p className="dark-text">
              Email
              <i className="faded-dark-text"> (this will be your username) </i>:
            </p>
            <input
              id="username"
              className="dark-text input-field"
              type="text"
              placeholder="email"
            />
          </div>
          <div>
            <p className="dark-text">
              Password
              <i className="faded-dark-text">(must contain 8 characters )</i>:
            </p>
            <input
              id="password"
              className="dark-text input-field"
              type="text"
              placeholder="password"
            />
          </div>
          <div className="button-container">
            <button>Back to Log In</button>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </>
  );
};
