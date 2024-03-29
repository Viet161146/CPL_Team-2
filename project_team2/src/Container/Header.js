import React from "react";
import style from "./Header.module.css";
const Header = () => {
  return (
    <div className={style.header}>
      <div className="container">
        <div className={style.row}>
          <div className={`${style.left} col-md-9`}>
            <a href="">conduit</a>
          </div>
          <div className={`${style.right} col-md-3`}>
            <ul>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="">Sign in</a>
              </li>
              <li>
                <a href="">Sign up</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
