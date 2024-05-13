import React, { useState } from "react";
import "./Main.scss";

const Main = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleLogin = () => {
    if (!phoneNumber || !password) {
      setLoginMessage("Please enter your phone number and password");
      return;
    }

    fetch("https://dev-v11.cloudistic.net/UserApi/SignInByMobileUser", {
      method: "POST",
      body: JSON.stringify({ phoneNumber, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        if (data.isSuccess) {
          setLoginMessage("Log-In Successful!");
        } else {
          setLoginMessage("Log-In Failed!");
        }
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="heading-container">
            <h1 className="heading">Login</h1>
          </div>
          <div className="form-group">
            <input
              id="phoneNumber"
              className="phoneNumber"
              type="phoneNumber"
              placeholder="Enter Your Phone Number Here"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              id="password"
              className="password"
              type="password"
              placeholder="Enter Your Password Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <p className="login-message">{loginMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Main;
