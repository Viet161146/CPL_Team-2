import React from "react";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div
      className="header"
      style={{
        display: "flex",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="col-md-9"
        style={{ paddingLeft: "12%", paddingTop: "10px" }}
      >
        <a
          href="/"
          style={{
            color: "#5cb85c",
            fontWeight: 900,
            textDecoration: "none",
          }}
        >
          conduit
        </a>
      </div>
      <div className="col-md-3">
        <ul style={{ display: "flex", listStyleType: "none" }}>
          <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
            <a
              href="/articles"
              style={{
                color: "rgba(0, 0, 0, 0.3)",
                textDecoration: "none",
              }}
            >
              Home
            </a>
          </li>
          <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
            <a
              href=""
              style={{
                color: "rgba(0, 0, 0, 0.3)",
                textDecoration: "none",
              }}
            >
              Sign in
            </a>
          </li>
          <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
            <a
              href=""
              style={{
                color: "rgba(0, 0, 0, 0.3)",
                textDecoration: "none",
              }}
            >
              Sign up
            </a>
          </li>
          <li style={{ paddingTop: "10px", paddingRight: "20px" }}>
            <a
              href="/editor"
              style={{
                color: "rgba(0, 0, 0, 0.3)",
                textDecoration: "none",
              }}
            >
              New Aricles
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
