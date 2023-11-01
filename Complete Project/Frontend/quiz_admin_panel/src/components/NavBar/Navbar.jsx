import { useContext, useEffect, useRef, useState } from "react";
import "../NavBar/NavbarStyles.css";
import BUSOMIcon from "../images/BUBCLSLogo.png";
import BUuserLogoIconIcon from "../images/UserLogo.png";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import { USER_ROLE } from "../../enums/role_enums";

let useClickOutside = (handler) => {
  let domNode = useRef();
  useEffect(() => {
    let maybeHandler = (e) => {
      if (!domNode.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};

function Navbar() {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [openProfile, setOpenProfile] = useState(false);
  const authCtx = useContext(AuthContext);

  let domNode = useClickOutside(() => {
    setOpenProfile(false);
  });

  let navigate = useNavigate();

  // const profileRoute = () =>{
  // let path = `/profile`;
  // navigate(path);
  // }
  const dahboardRoute = () => {
    let path = `/reports`;
    navigate(path);
  };
  // const reportRoute = () =>{
  //   let path = `/reports`;
  //   navigate(path);
  // }
  // const aboutUsRoute = () =>{
  //   let path = `/aboutUs`;
  //   navigate(path);
  // }
  const logoutRoute = () => {
    let path = `/`;
    authCtx.onLogout();
    navigate(path);
  };

  const imgClick = () => {
    if (authCtx.isLoggedIn) {
      navigate("/reports");
    } else {
      navigate("/", {
        state: {
          role: USER_ROLE.FACULTY,
        },
      });
    }
  };

  return (
    <>
      <nav className="NavbarItems">
        <div>
          <img
            src={BUSOMIcon}
            className="BUSOMImageClass"
            alt=""
            onClick={imgClick}
          />
        </div>

        <div ref={domNode}>
          {authCtx.isLoggedIn && (
            <div
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
            >
              <img
                src={BUuserLogoIconIcon}
                className="BUuserLogoImageClass"
                alt=""
              />
            </div>
          )}

          <div className={`dropDown ${openProfile ? "active" : "inactive"}`}>
            <div className="menuStyle">
              {user && (
                <div className="Dropdownlabel">
                  {user.firstName + " " + user.lastName}
                </div>
              )}
              <hr></hr>
              {/* <button onClick={profileRoute} className='ProfileBtn' >Profile</button> */}
              <button onClick={dahboardRoute} className="DashboardBtn1">
                Dashboard
              </button>
              {/* <button onClick={reportRoute} className='ReportsBtn1' >Reports</button> */}
              {/* <button onClick={aboutUsRoute} className='AboutUsBtn1' >About Us</button> */}
              <button onClick={logoutRoute} className="NAVLogoutBtn">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
