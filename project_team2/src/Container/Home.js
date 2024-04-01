import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import moment from "moment";
const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "https://api.realworld.io/api/articles"
        );
        if (response.data && Array.isArray(response.data.articles)) {
          setArticles(response.data.articles);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("fetch articles error", error);
      }
    };
    fetchArticles();
  }, []);
  //format date

  return (
    <div className={style.home}>
      <div className="">
        <div className="banner">
          <h1>conduit</h1>
          <p>A place to share your knowledge</p>
        </div>
        <br />
        <br />

        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="container" style={{ width: "80%" }}>
                <div className="feed-toggle">
                  <ul className="nav nav-pills outline">
                    <li className="nav-item">
                      <a
                        href=""
                        style={{ color: "#5cb85c", textDecoration: "none" }}
                      >
                        Global Feed
                      </a>
                      <hr
                        style={{
                          border: "2px solid green",
                          borderWidth: "4px",
                        }}
                      />
                    </li>
                  </ul>
                </div>
                <div>
                  {articles.map((article, index) => (
                    <div key={index}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          style={{ borderRadius: "50%", marginRight: "5px" }}
                          src={article.author.image}
                          alt="avt"
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span className="author-name">
                            <span style={{ color: "#5cb85c" }}>
                              {article.author.username}
                            </span>
                            <br />
                            <span
                              className="date"
                              style={{ fontSize: "70%", color: "#BBBBBB" }}
                            >
                              {moment(article.createdAt).format("MMMM D, YYYY")}
                            </span>
                          </span>
                        </div>
                      </div>

                      <h3> {article.title}</h3>
                      <p style={{ color: "#BBBBBB", fontSize: "80%" }}>
                        {article.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span
                          style={{
                            marginRight: "10px",
                            color: "#BBBBBB",
                            fontSize: "70%",
                          }}
                        >
                          Read more...
                        </span>
                        <ul
                          className="tag-list"
                          style={{
                            listStyle: "none",
                            padding: 0,
                            marginLeft: "auto",
                          }}
                        >
                          {article.tagList.map((tag, index) => (
                            <li
                              key={index}
                              className="tag-default tag-pill tag-outline"
                              style={{
                                marginRight: "5px",
                                marginBottom: "5px",
                                padding: "5px 10px",
                                borderRadius: "20px",
                                background: "#f0f0f0",
                                color: "#BBBBBB",
                                display: "inline-block",
                                fontSize: "70%",
                              }}
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="slidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  <a href="">x</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
