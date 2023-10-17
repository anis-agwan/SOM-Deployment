import { React, useReducer, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "../UserAuth/ForgotPasswordStyles.css";
import Binghamton_University_pic from "../images/Binghamton-University-pic.jpg";
import { passwordReducer } from "./AuthReducers";
import axios from "axios";

export default function RegisterNewPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state.email;

  const [formIsValid, setFormIsValid] = useState(false);

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { value: enteredPassword, isValid: passIsValid } = passwordState;
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      if (passIsValid && enteredPassword === enteredConfirmPassword) {
        setFormIsValid(passIsValid);
        if (formIsValid) {
          console.log("FORM OK");
        }
      } else {
        console.log("FORM NOT OK");
      }
    }, 500);

    return () => {
      console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [passIsValid, formIsValid, enteredConfirmPassword, enteredPassword]);

  const passwordChangehandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const confirmPasswordHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const validatePassword = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    // console.log(`FORM: ${formIsValid}`);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formIsValid) {
      const baseURL = "http://localhost:8440/login-register/";
      const url = `${baseURL}login/newPassword`;
      const user = {
        email: email,
        newPassword: passwordState.value,
      };

      await axios
        .post(url, user)
        .then((res) => {
          if (res.data.isValid && res.data.status === 200) {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="LoginMainComponent">
      <div className="ImageSlider">
        <img
          src={Binghamton_University_pic}
          alt="Binghamton_University"
          className="BinghamtonUniversityImage"
        />
      </div>
      <div className="UserAuth">
        <form id="loginForm" action="/">
          <h1 className="headingTitle">Login</h1>
          <p className="headText">Welcome to Leadership Assesment Program</p>
          <label htmlFor="text" className="userName">
            New Password
          </label>
          <div className="userNameInput">
            <input
              type={"password"}
              //className="userNameInput"
              placeholder="************"
              id="text"
              name="text"
              required
              onChange={passwordChangehandler}
              onBlur={validatePassword}
            />
          </div>
          <label htmlFor="password" className="password">
            Confirm Password
          </label>
          <div className="passInput">
            <input
              //type={"date"}
              //className="passInput"
              type={"password"}
              placeholder="************"
              id="password"
              name="password"
              required
              onChange={confirmPasswordHandler}
            />
          </div>
          <div className="LoginButton">
            <input
              className="ForgotPasswordSubmitBtn"
              value="Submit"
              onClick={submitHandler}
            ></input>
          </div>
        </form>
        <form id="signupForm" action="/Signup">
          <div className="NewUserDiv" type="submit">
            <input
              className="NewUserClass"
              type="submit"
              value="New User?"
            ></input>
            <input className="SignupClass" type="submit" value="Signup"></input>
          </div>
        </form>
        <form id="ForgotPasswordForm" action="/">
          <div type="submit">
            <input
              className="ForgotPasswordClass"
              type="submit"
              value="Existing User? Login"
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
