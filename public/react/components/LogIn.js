import React, { useState, useEffect } from "react";
import { AccountMaker } from "./AccountMaker";
import apiURL from "../api";

export const LogIn = ({ setLoggedIn, logInDetails, setLogInDetails }) => {
  const [makeAccount, setMakeAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = () => {
    setMakeAccount(true);
  };

  const logInAttempt = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiURL}/users/${email}`);
    const retrievedUser = await response.json();
    console.log(retrievedUser);
    if (email == retrievedUser.email && password == retrievedUser.password) {
      setLogInDetails(retrievedUser);
      setLoggedIn(true);
    } else {
      console.log(email, retrievedUser.email, password, retrievedUser.password);
      window.alert("username or password incorrect");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      {makeAccount ? (
        <AccountMaker
          password={password}
          email={email}
          logInAttempt={logInAttempt}
          setEmail={setEmail}
          setPassword={setPassword}
          setMakeAccount={setMakeAccount}
          setLoggedIn={setLoggedIn}
          logInDetails={logInDetails}
          setLogInDetails={setLogInDetails}
        />
      ) : (
        <>
          <div>
            <h1 className="logo-text stylized-words">WikiVerse</h1>
          </div>
          <div className="white-background-box background-box-login">
            <form
              className="form-login form-template"
              aria-label="form"
              onSubmit={logInAttempt}
            >
              <h3 className="dark-text">Log In</h3>
              <div>
                <p className="dark-text">
                  Username<i className="faded-dark-text"> (email) </i>:
                </p>
                <input
                  id="username"
                  className="dark-text input-field"
                  type="text"
                  placeholder="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div>
                <p className="dark-text">
                  Password<i className="faded-dark-text"></i>:
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
              <p className="faded-dark-text">
                Dont have an account?{" "}
                <a className="faded-dark-text" onClick={createAccount}>
                  Create Account
                </a>
              </p>
              <button type="submit">Log In</button>
            </form>
          </div>
        </>
      )}
    </>
  );
};
