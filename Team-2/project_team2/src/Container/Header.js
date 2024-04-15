import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loggedInUsername = localStorage.getItem("username");
  const loggedInUserProfile = localStorage.getItem("userProfile"); // Assuming you store the user profile picture URL in 'userProfile'

 

  return (
    <div
      className="header"
      style={{ display: "flex", backgroundColor: "#fff" }}
    >
      <div
        className="col-md-8"
        style={{ paddingLeft: "12%", paddingTop: "10px" }}
      >
        <Link
          to="/"
          style={{
            color: "#5cb85c",
            fontWeight: "bold",
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
        >
          conduit
        </Link>
      </div>
      <div className="col-md-4">
        <ul
          style={{ display: "flex", listStyleType: "none", fontSize: "0.9rem" }}
        >
          <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
            <Link
              to="/"
              style={{ color: "rgba(0, 0, 0, 0.6)", textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          {loggedInUsername ? (
            <>
              <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
                <Link
                  to="/setting"
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    textDecoration: "none",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCog}
                    style={{
                      marginRight: "5px",
                      color: "#00000099",
                      fontSize: "12px",
                    }}
                  />
                  Settings
                </Link>
              </li>
              <li
                style={{
                  paddingTop: "10px",
                  paddingRight: "10px",
                  whiteSpace: "nowrap",
                }}
              >
                <Link
                  to="/editor"
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    textDecoration: "none",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{
                      marginRight: "5px",
                      color: "#00000099",
                      fontSize: "12px",
                    }}
                  />{" "}
                  New Articles
                </Link>
              </li>
              <li
                style={{
                  paddingTop: "10px",
                  paddingRight: "20px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {loggedInUserProfile && (
                  <img
                    src={loggedInUserProfile}
                    alt="User Avatar"
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      marginRight: "5px",
                    }}
                  />
                )}
                <Link
                  to={`/profile/${loggedInUsername}`}
                  style={{
                    color: "rgba(0, 0, 0, 0.6)",
                    textDecoration: "none",
                  }}
                >
                  <img
                    style={{
                     width:'16px',
                      borderRadius: "50%",
                    }}
                    src="https://api.realworld.io/images/smiley-cyrus.jpeg"
                    alt=""
                  />{" "}
                  {loggedInUsername}
                </Link>
              </li>
            </>
          ) : (
            <>
              {location.pathname !== "/signup" && (
                <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
                  <Link
                    to="/signup"
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      textDecoration: "none",
                    }}
                  >
                    Sign up
                  </Link>
                </li>
              )}
              {location.pathname !== "/login" && (
                <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
                  <Link
                    to="/login"
                    style={{
                      color: "rgba(0, 0, 0, 0.6)",
                      textDecoration: "none",
                    }}
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
