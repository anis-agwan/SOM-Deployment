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
  tokenReducer,
} from "./AuthReducers";
import Binghamton_University_pic from "../images/Binghamton-University-pic.jpg";
import "./PasswordValidation";
import { AuthContext } from "../../store/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { TOKEN_ENUMS } from "../../enums/token_enums";

export default function Signup() {
  const inputRef = useRef(null);

  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState();
  const [tokenFormIsValid, setTokenFormIsValid] = useState();
  const location = useLocation();
  const userRole = location.state.role;
  console.log(userRole);

  const [AuthTokenShow, setAuthTokenShow] = useState(false);
  const ShowAuthToken = (event) => {
    // console.log(userNameState.value, fNameState.value);
    event.preventDefault();
    if (formIsValid) {
      generateTokenHandler().then((res) => {
        console.log("GEN : ", res);
        if (res) {
          setAuthTokenShow(true);
          setSignupPageShow(!setAuthTokenShow);
        } else {
          console.log("SOME ISSUE");
        }
      });
    } else {
      alert("Please Fill the form completely");
    }
  };
  const [SignupPageShow, setSignupPageShow] = useState(true);
  const ShowSignupPage = () => {
    setSignupPageShow(true);
    setAuthTokenShow(false);
  };

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

  const [tokenState, dispatchToken] = useReducer(tokenReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: fNameIsValid } = fNameState;
  const { isValid: lNameIsValid } = lNameState;
  // const { isValid: bNumIsValid } = bNumState;
  const { isValid: userNameIsValid } = userNameState;
  const { value: enteredPassword, isValid: passIsValid } = passwordState;
  const { isValid: tokenIsValid } = tokenState;

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
      }

      if (
        fNameIsValid &&
        lNameIsValid &&
        userNameIsValid &&
        passIsValid &&
        enteredPassword === enteredConfirmPassword &&
        tokenIsValid
      ) {
        setTokenFormIsValid(
          fNameIsValid &&
            lNameIsValid &&
            userNameIsValid &&
            passIsValid &&
            tokenIsValid
        );
        if (tokenFormIsValid) {
          console.log("Token FORM OK");
          console.log(formIsValid);
        } else {
          console.log("Token FORM NOT OK");
        }
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
    tokenIsValid,
    tokenFormIsValid,
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

  const tokenChangeHandler = (event) => {
    console.log(event.target.value);
    dispatchToken({
      type: "USER_INPUT",
      val: event.target.value,
    });
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

  const validateToken = () => {
    // setUserNameIsValid(enteredUserName.includes("@binghamton.edu"));
    console.log(userNameIsValid);
    dispatchToken({ type: "INPUT_BLUR" });
  };

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const generateTokenHandler = async () => {
    let ttv = false;
    if (formIsValid) {
      await authCtx
        .onGenerateToken(userNameState.value, TOKEN_ENUMS.REGISTER)
        .then((response) => {
          if (response !== "") {
            ttv = true;
            console.log(response, ttv);
          }
        });
    }
    console.log(ttv);
    return ttv;
  };

  const confirmToken = async () => {
    // event.preventDefault();
    let tok = false;
    if (userNameIsValid && tokenIsValid) {
      await authCtx
        .onTokenSubmit(
          userNameState.value,
          tokenState.value,
          TOKEN_ENUMS.REGISTER
        )
        .then((response) => {
          if (response) {
            console.log("CONF ", response);
            tok = response;
            console.log("TOK ", tok);
          }
        });
    }

    return tok;
  };

  const registerFaculty = async () => {
    // event.preventDefault();
    if (formIsValid) {
      // console.log(formIsValid);
      // console.log(bNumState.value, bNumState.isValid);
      // console.log(userNameState.value, userNameState.isValid);
      // console.log(passwordState.value, passwordState.isValid);
      // console.log(enteredConfirmPassword);
      await authCtx
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
          alert("Successfully registered");
          navigate("/");
          // if (response) {
          //   alert("Successfully registered");
          //   navigate("/");
          // }
        });
    } else {
      alert("Form not valid, check your information");
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (tokenFormIsValid) {
      console.log("TOKEN FORM IS VALID");
      const tokenValid = confirmToken();
      confirmToken().then((res) => {
        if (res) {
          console.log("TOKEN IS VALID");
          // alert("TOKEN IS VALID");
          registerFaculty();
        } else {
          console.log("TOKEN IS NOT VALID");
          alert("TOKEN IS NOT VALID");
        }
      });
      // if (tokenValid) {

      // }
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
        {SignupPageShow && (
          <form id="loginForm">
            <h1 className="headingTitle">Signup</h1>
            <p className="headText">Welcome to Leadership Assesment Program</p>
            <div className="first_last_name_div">
              <div className="fl_Label">
                <label className="FirstName">First Name</label>
                <label className="LastName">Last Name</label>
              </div>
              <div className="fl_input">
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
              </div>
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
                // pattern="^[a-zA-Z0-9]+@binghamton\.edu$"
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
                value="Sign Up"
                onClick={ShowAuthToken}
                // onClick={submitHandler}
              ></input>
            </div>
          </form>
        )}
        {AuthTokenShow && (
          <div>
            <form id="loginForm" action="/SelectionScreen">
              <h1 className="headingTitle">Verify</h1>
              <p className="headText">
                Welcome to Leadership Assesment Program
              </p>
              <label className="userName1">Verify Token</label>
              <div className="userNameInput1">
                <input
                  type={"text"}
                  //className="userNameInput1"
                  placeholder="Token (12-digit)"
                  id="text"
                  name="text"
                  required
                  onChange={tokenChangeHandler}
                  onBlur={validateToken}
                />
              </div>
              <div className="LoginButton1">
                <input
                  className="LoginText1"
                  type="submit"
                  value="Verify"
                  onClick={submitHandler}
                ></input>
              </div>
            </form>
          </div>
        )}
        <div className="LoginForm ">
          <div className="LoginDiv" type="submit">
            <input
              className="AlreadyMemberClass"
              type="submit"
              value="Already a Member?   "
              onClick={ShowSignupPage}
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
