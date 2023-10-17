import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import "../UserAuth/SignupStyles.css";
import {
  firstNameReducer,
  lastNameReducer,
  // bNumberReducer,
  passwordReducer,
  userNameReducer,
} from "./AuthReducers";
import Binghamton_University_pic from "../images/Binghamton-University-pic.jpg";
import "./PasswordValidation";
import { AuthContext } from "../../store/auth-context";
import { useLocation, useNavigate } from "react-router-dom";

export default function Signup() {
  const inputRef = useRef(null);

  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState();
  const location = useLocation();
  const userRole = location.state.role;
  console.log(userRole);

  const [fNameState, dispatchFName] = useReducer(firstNameReducer, {
    value: "",
    isValid: null,
  });

  const [lNameState, dispatchLName] = useReducer(lastNameReducer, {
    value: "",
    isValid: null,
  });

  // const [bNumState, dispatchBNum] = useReducer(bNumberReducer, {
  //   value: "",
  //   isValid: null,
  // });

  const [userNameState, dispatchUserName] = useReducer(userNameReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: fNameIsValid } = fNameState;
  const { isValid: lNameIsValid } = lNameState;
  // const { isValid: bNumIsValid } = bNumState;
  const { isValid: userNameIsValid } = userNameState;
  const { value: enteredPassword, isValid: passIsValid } = passwordState;

  useEffect(() => {
    // console.log(USER_ROLE.STUDENT);
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      if (
        fNameIsValid &&
        lNameIsValid &&
        // bNumIsValid &&
        userNameIsValid &&
        passIsValid &&
        enteredPassword === enteredConfirmPassword
      ) {
        setFormIsValid(
          fNameIsValid &&
            lNameIsValid &&
            // bNumIsValid &&
            userNameIsValid &&
            passIsValid
        );
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
  }, [
    fNameIsValid,
    lNameIsValid,
    // bNumIsValid,
    userNameIsValid,
    passIsValid,
    formIsValid,
    enteredConfirmPassword,
    enteredPassword,
  ]);

  const fNameChangeHandler = (event) => {
    // var regexConst = /^B\d{8}$/;
    // console.log(regexConst.test(event.target.value));
    console.log(event.target.value);
    dispatchFName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const lNameChangeHandler = (event) => {
    // var regexConst = /^B\d{8}$/;
    // console.log(regexConst.test(event.target.value));
    dispatchLName({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  // const bNumChangeHandler = (event) => {
  //   // var regexConst = /^B\d{8}$/;
  //   // console.log(regexConst.test(event.target.value));
  //   dispatchBNum({
  //     type: "USER_INPUT",
  //     val: event.target.value,
  //   });
  // };

  const userNameChangeHandler = (event) => {
    // console.log(event.target.value);
    dispatchUserName({
      type: "USER_INPUT",
      val: event.target.value,
    });
    // console.log(formIsValid);
  };

  const passwordChangehandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };

  const confirmPasswordHandler = (event) => {
    setEnteredConfirmPassword(event.target.value);
  };

  const validateFNameHandler = () => {
    dispatchFName({ type: "INPUT_BLUR" });
    // console.log(formIsValid);
  };

  const validateLNameHandler = () => {
    dispatchLName({ type: "INPUT_BLUR" });
    // console.log(formIsValid);
  };

  // const validateBNumHandler = () => {
  //   dispatchBNum({ type: "INPUT_BLUR" });
  //   // console.log(formIsValid);
  // };

  const validateUserName = () => {
    dispatchUserName({ type: "INPUT_BLUR" });
  };

  const validatePassword = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
    // console.log(`FORM: ${formIsValid}`);
  };

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      // console.log(formIsValid);
      // console.log(bNumState.value, bNumState.isValid);
      // console.log(userNameState.value, userNameState.isValid);
      // console.log(passwordState.value, passwordState.isValid);
      // console.log(enteredConfirmPassword);
      authCtx
        .onSignup(
          userNameState.value,
          "",
          fNameState.value,
          lNameState.value,
          passwordState.value,
          userRole
        )
        .then((response) => {
          console.log(response);
          if (response) {
            navigate("/reports");
          }
        });
    } else {
      alert("Form not valid, check your information");
    }
  };

  const loginButSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/");
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
        <form id="loginForm" action="/reports">
          <h1 className="headingTitle">Signup</h1>
          <p className="headText">Welcome to Leadership Assesment Program</p>

          <label className="FirstName">First Name</label>
          <div className="FirstNameInputText">
            <input
              ref={inputRef}
              required
              type="text"
              placeholder="Enter First Name"
              onChange={fNameChangeHandler}
              onBlur={validateFNameHandler}
            />
          </div>
          <label className="LastName">Last Name</label>
          <div className="LastNameInputText">
            <input
              ref={inputRef}
              required
              type="text"
              placeholder="Enter Last Name"
              onChange={lNameChangeHandler}
              onBlur={validateLNameHandler}
            />
          </div>
          {/* <label className="BNumber">B-Number</label>
          <div className="BNumberInputText">
            <input
              ref={inputRef}
              required
              onChange={bNumChangeHandler}
              onBlur={validateBNumHandler}
              type="text"
              placeholder="Please enter your B-Number"
            />
          </div> */}

          <label htmlFor="email" className="userName1">
            B-mail
          </label>
          <div className="userNameInput1">
            <input
              type={"email"}
              //className="userNameInput1"
              placeholder="xyz@binghamton.edu"
              id="email"
              name="email"
              required
              onChange={userNameChangeHandler}
              onBlur={validateUserName}
            />
          </div>
          <label htmlFor="password" className="password1">
            Password
          </label>
          <div className="passInput1">
            <input
              type={"password"}
              //className="passInput1"
              placeholder="*************"
              id="password"
              name="password"
              required
              onChange={passwordChangehandler}
              onBlur={validatePassword}
            />
          </div>
          <label htmlFor="password" className="confirmPassword">
            Confirm Password
          </label>
          <div className="confirmPassInput">
            <input
              type={"password"}
              //className="confirmPassInput"
              placeholder="*************"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={confirmPasswordHandler}
            />
          </div>
          <div className="LoginButton1">
            <input
              className="LoginText1"
              type="submit"
              value="Submit"
              onClick={submitHandler}
            ></input>
          </div>
        </form>
        <div className="LoginForm">
          <div className="LoginDiv" type="submit">
            <input
              className="AlreadyMemberClass"
              type="submit"
              value="Already a Member?"
            ></input>
            <input
              className="LoginClass"
              type="submit"
              value="Login"
              onClick={loginButSubmitHandler}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
