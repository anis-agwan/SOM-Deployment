import React, { useContext, useEffect, useReducer, useState } from "react";
import login_styles from "../UserAuth/LoginStyles.module.css";
import { userNameReducer, passwordReducer } from "./AuthReducers";
import { AuthContext } from "../../store/auth-context";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Binghamton_University_pic from "../images/Binghamton-University-pic.jpg";
import { USER_ROLE } from "../../enums/role_enums";

export default function Login() {
  const [formIsValid, setFormIsValid] = useState(false);

  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: userNameIsValid } = userNameState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity");
      setFormIsValid(userNameIsValid && passwordIsValid);
      if (formIsValid) {
        console.log("FORM OK");
      }
    }, 500);

    return () => {
      console.log("cleanup");
      clearTimeout(identifier);
    };
  }, [userNameIsValid, passwordIsValid, formIsValid]);

  const userNameChangeHandler = (event) => {
    dispatchUserName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const validateUserNameHandler = () => {
    // setUserNameIsValid(enteredUserName.includes("@binghamton.edu"));
    // console.log(userNameIsValid);
    dispatchUserName({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // console.log(passwordIsValid);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [queryParams] = useSearchParams();

  const signUpSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/Signup", {
      state: {
        role: USER_ROLE.FACULTY,
      },
    });
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    // console.log(formIsValid);
    // console.log(userNameState.value, userNameState.isValid);
    // console.log(passwordState.value, passwordState.isValid);

    if (formIsValid) {
      authCtx
        .onLogin(userNameState.value, passwordState.value)
        .then((response) => {
          if (response) {
            navigate("/reports");
          }
        });
    }
  };

  return (
    <div className={login_styles.LoginMainComponent}>
      <div className={login_styles.ImageSlider}>
        <img
          src={Binghamton_University_pic}
          alt="Binghamton_University"
          className={login_styles.BinghamtonUniversityImage}
        />
      </div>
      <div className={login_styles.UserAuth}>
        <form id="loginForm" action="/SelectionScreen">
          <h1 className={login_styles.headingTitle}>Login</h1>
          <p className={login_styles.headText}>
            Welcome to Leadership Assesment Program
          </p>
          <label htmlFor="email" className={login_styles.userName}>
            B-mail
          </label>
          <div className={login_styles.userNameInput}>
            <input
              type={"email"}
              //className="userNameInput"
              placeholder="xyz@binghamton.edu"
              id="email"
              name="email"
              required
              onChange={userNameChangeHandler}
              onBlur={validateUserNameHandler}
            />
          </div>
          <label htmlFor="password" className={login_styles.password}>
            Password
          </label>
          <div className={login_styles.passInput}>
            <input
              type={"password"}
              //className="passInput"
              placeholder="*************"
              id="password"
              name="password"
              required
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={login_styles.LoginButton}>
            <input
              className={login_styles.LoginText}
              type="submit"
              value="Login"
              onClick={loginSubmitHandler}
            ></input>
          </div>
        </form>

        <div className={login_styles.Signup_forgot_class} type="submit">
          <div className={login_styles.ButtonsContainer}>
            <input
              type="button"
              className={`${login_styles.NewUserClass} custom-button`}
              onClick={signUpSubmitHandler}
              value="New User? "
            />
            <input
              type="button"
              className={`${login_styles.SignupClass} custom-button`}
              onClick={signUpSubmitHandler}
              value="Signup "
            />
          </div>
          <form id="ForgotPasswordForm" action="/ForgotPassword">
            <div className={login_styles.ForgotPasswordContainer}>
              <input
                className={`${login_styles.ForgotPasswordClass} custom-button`}
                type="submit"
                value="Forgot your password?  "
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
