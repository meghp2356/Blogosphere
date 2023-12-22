import React from "react";
import "../css/navBar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosMenu } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "../../app/userSlice";
import auth from "../../services/auth";

function navBar() {
  const [menus, setMenu] = React.useState(false);
  const userStatus = useSelector((state) => state.auth.userStatus);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navOptions = [
    {
      name: "HOME",
      link: "/",
      status: true,
    },
    {
      name: "CREATE",
      link: "/create",
      status: userStatus,
    },
    {
      name: "SEARCH",
      link: "/Search",
      status: userStatus,
    },
    {
      name: "YOURPOST",
      link: "/userPost",
      status: userStatus,
    },
    {
      name: "LOGIN",
      link: "/login",
      status: !userStatus,
    },
    {
      name: "LOGOUT",
      link: "/",
      status: userStatus,
    },
  ];

  function menuClick() {
    setMenu((menus) => !menus);
  }

  return (
    <>
      <nav>
        <div className="nav">
          <div className="logo">
            <h1>BLOGOSPHERE</h1>
          </div>
          <div className="menuBar">
            <ul>
              {navOptions
                .filter((op) => op.status === true)
                .map((op) => (
                  <li key={op.name} onClick={async()=> {
                    if(op.name === 'LOGOUT'){
                      const respone = await auth.logout()
                      if (respone) dispatch(logout())
                    }
                    navigate(op.link)
                    }} >
                    <b>{op.name}</b>
                  </li>
                ))}
            </ul>
          </div>
          <div className="hamp" onClick={menuClick}>
            <IoIosMenu size={"44px"} />
          </div>
        </div>
        {menus && (
          <div className="phoneMenu">
            <ul>
              {navOptions
                .filter((op) => op.status === true)
                .map((op) => (
                  <li key={op.name} onClick={()=> navigate(op.link)}>
                    <b>{op.name}</b>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
}

export default navBar;
