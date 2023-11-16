import React, { useState, useEffect } from "react";
import apiURL from "../api";

export const AccountMaker = ({
  email,
  password,
  logInAttempt,
  setEmail,
  setPassword,
  setMakeAccount,
  setLoggedIn,
  setLogInDetails,
  logInDetails,
}) => {
  const [name, setName] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    const response = await fetch(`${apiURL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, email: email, password: password }),
    });
    const retrievedUser = await response.json();
    setLogInDetails(retrievedUser);
    setLoggedIn(true);
  };
  return (
    <>
      <div>
        <h1 className="logo-text stylized-words">WikiVerse</h1>
      </div>
      <div className="white-background-box background-box-login">
        <form
          className="form-login form-template"
          aria-label="form"
          onSubmit={createUser}
        >
          <h3 className="dark-text">Create Account</h3>
          <div>
            <p className="dark-text">Name:</p>
            <input
              id="username"
              className="dark-text input-field"
              type="text"
              placeholder="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="button-container">
            <button onChange={(event) => setMakeAccount(false)}>
              Back to Log In
            </button>
            <button type="submit">Create Account</button>
          </div>
        </form>
      </div>
    </>
  );
};
