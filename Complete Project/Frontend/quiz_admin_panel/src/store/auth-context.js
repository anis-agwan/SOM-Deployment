import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_ROLE } from "../enums/role_enums";
import { TOKEN_ENUMS } from "../enums/token_enums";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (userName, password) => {},
  onSignup: (userName, password, fName, lName, userRole) => {},
  onGenerateToken: (email, access) => {},
  onTokenSubmit: (email, token) => {},
  onRegisterNewPassword: (email, newPass) => {},
  onUpdateStats: (email, section) => {},
});

export const AuthContextProvider = (props) => {
  const baseURL = "http://3.13.110.40:8080/login-register/";

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "1") {
      setLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userDetails");
    setLoggedIn(false);
  };

  const loginHandler = async (userName, password) => {
    const url = `${baseURL}login/verify-user`;
    const user = {
      emailId: userName,
      password: password,
    };

    // try {
    //   let res = await axios.post(url, user);
    //   // console.log(res.data["validationIndicator"]);
    //   let newUser = res.data;

    //   if (newUser["validationIndicator"] === "Invalid") {
    //     // throw new Error("Invalid Login");
    //     console.log("ERROR");
    //     alert("Invalid Login");
    //   } else if (newUser["validationIndicator"] === "Valid") {
    //     console.log("SUCCESS");
    //     localStorage.setItem("user", JSON.stringify(res.data));
    //     localStorage.setItem("isLoggedIn", "1");
    //   }
    //   // if (newUser["validationIndicator"] === "Valid") {
    //   //   console.log(res.data);
    //   //   localStorage.setItem("user", JSON.stringify(res.data));
    //   //   localStorage.setItem("isLoggedIn", "1");
    //   // } else if (newUser["validationIndicator"] === "Invalid") {
    //   //   throw new Error("Invalid Login");
    //   // }

    //   // localStorage.setItem("user", JSON.stringify(res.data));
    //   // localStorage.setItem("isLoggedIn", "1");

    //   // return true;
    // } catch (err) {
    //   console.log(err.response.data);
    //   // return false;
    // }

    let islog = false;

    await axios
      .post(url, user)
      .then((response) => {
        // console.log(response.data);
        let newUser = response.data;
        if (newUser["validationIndicator"] === "Invalid") {
          islog = false;
          throw new Error(
            "Invalid Login, Please check your email and password"
          );
        } else if (newUser["validationIndicator"] === "Valid") {
          if (newUser["role"] === "student") {
            islog = false;
            throw new Error("Students can not access the faculty portal");
          } else {
            localStorage.setItem("userDetails", JSON.stringify(response.data));
            localStorage.setItem("isLoggedIn", "1");
            setLoggedIn(true);
            islog = true;
          }
        }
      })
      .catch((err) => {
        alert(err.message);
        islog = false;
      });

    return islog;
  };

  const signUpHandler = async (
    userName,
    bNum,
    fName,
    lName,
    password,
    userRole
  ) => {
    let url = `${baseURL}register/user`;
    if (userRole === USER_ROLE.ADMIN) {
      console.log("ADMIN Auth");
      url = url + `?role=${USER_ROLE.ADMIN}`;
    } else if (userRole === USER_ROLE.FACULTY) {
      console.log("Faculty Auth");
      url = url + `?role=${USER_ROLE.FACULTY}`;
    } else if (userRole === USER_ROLE.STUDENT) {
      console.log("STUD Auth");
      url = url + `?role=${USER_ROLE.STUDENT}`;
    }

    console.log(url);

    const user = {
      emailId: userName,
      bingNumber: bNum,
      firstName: fName,
      lastName: lName,
      password: password,
    };

    // console.log(user);
    let islog = false;

    await axios
      .post(url, user)
      .then((response) => {
        console.log(response.data);
        user.role = userRole;
        // localStorage.setItem("userDetails", JSON.stringify(user));
        // localStorage.setItem("isLoggedIn", "1");
        setLoggedIn(false);
        islog = false;
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
        islog = false;
      });

    return islog;
  };

  const generateTokenHandler = async (email, access) => {
    console.log("CALLING");
    // const url = `${baseURL}login/generatetoken`;
    let url = "";
    if (access === TOKEN_ENUMS.REGISTER) {
      url = `${baseURL}register/generatetoken`;
    } else if (access === TOKEN_ENUMS.FORGOT) {
      url = `${baseURL}login/generatetoken`;
    } else {
      url = `${baseURL}login/generatetoken`;
    }

    const user = {
      email: email,
    };

    let token = "";

    await axios
      .post(url, user)
      .then((res) => {
        // console.log(res.data);
        if (
          res.data === "No Such email found" ||
          res.data === "User already exists"
        ) {
          throw new Error(res.data);
        } else {
          // console.log(res.data);
          token = res.data;
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });

    return token;
  };

  const tokenSubmitHandler = async (email, token, access) => {
    // const url = `${baseURL}login/confirmtoken`;
    let url = "";
    if (access === TOKEN_ENUMS.REGISTER) {
      url = `${baseURL}register/confirmtoken`;
    } else if (access === TOKEN_ENUMS.FORGOT) {
      url = `${baseURL}login/confirmtoken`;
    } else {
      url = `${baseURL}login/confirmtoken`;
    }

    const user = {
      email: email,
      token: token,
    };

    let tokenAuthValid = false;

    await axios
      .post(url, user)
      .then((res) => {
        console.log(res.data.isValid);
        if (res.data.isValid) {
          tokenAuthValid = res.data.isValid;
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        alert(err.message);
      });

    return tokenAuthValid;
  };

  const registerNewPassword = async (email, password) => {
    const url = `${baseURL}login/newPassword`;
    const user = {
      email: email,
      newPassword: password,
    };

    let registeredValid = false;

    await axios
      .post(url, user)
      .then((res) => {
        if (res.data.isValid && res.data.status === 200) {
          // navigate("/");
          registeredValid = res.data.isValid;
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return registeredValid;
  };

  const updateStats = async (email, section) => {
    const url = `${baseURL}login/updatestats`;
    const user = {
      email: email,
      section: section,
    };

    await axios
      .post(url, user)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
        onSignup: signUpHandler,
        onGenerateToken: generateTokenHandler,
        onTokenSubmit: tokenSubmitHandler,
        onRegisterNewPassword: registerNewPassword,
        onUpdateStats: updateStats,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
