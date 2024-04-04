import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null); // State lưu trữ tag được chọn
  const [globalFeedData, setGlobalFeedData] = useState([]); // Biến tạm thời lưu trữ dữ liệu global feed

  const nav = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let allArticles = [];
        let page = 1;
        let response;
        do {
          response = await axios.get(
            `https://api.realworld.io/api/articles?limit=100&offset=${
              (page - 1) * 1000
            }`
          );
          if (response.data && Array.isArray(response.data.articles)) {
            allArticles = [...allArticles, ...response.data.articles];
            page++;
          }
        } while (response.data.articles.length > 0);

        setArticles(allArticles);
        setGlobalFeedData(allArticles);
      } catch (error) {
        console.error("fetch articles error", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("https://api.realworld.io/api/tags");
        if (response.data && Array.isArray(response.data.tags)) {
          setTags(response.data.tags);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("Fetch tags error", error);
      }
    };
    fetchTags();
  }, []);

  const handleArticleClick = (slug) => {
    nav(`/articles/${slug}`);
  };

  const handleClickProfile=(username)=>{
    nav(`profile/${username}`)
  }
  // Filter và cập nhật dữ liệu dựa trên tag đã chọn
  function handlePopularTags(tag) {
    setSelectedTag(tag); // Cập nhật tag được chọn
    const filteredData = globalFeedData.filter((item) =>
      item.tagList.includes(tag)
    );
    setArticles(filteredData);
  }

  // Reset lại danh sách bài viết về ban đầu (global feed) và giữ lại tag được chọn
  function handleGlobalFeed() {
    setSelectedTag(null); // Reset tag được chọn
    setArticles(globalFeedData); // Reset lại danh sách bài viết về ban đầu
  }


  return (
    <div className={style.home}>
      <div className="">
        <div className="banner" style={{ color: "#fff" }}>
          <h1 style={{ fontWeight: "900" }}>conduit</h1>
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <a
                          href="/"
                          style={{
                            color: selectedTag ? "#333" : "#5cb85c",
                            textDecoration: "none",
                            marginRight: "20px",
                          }}
                          onClick={handleGlobalFeed}
                        >
                          Global Feed
                        </a>
                        {selectedTag && (
                          <>
                            <a
                              href="/"
                              style={{
                                color: "#5cb85c",
                                textDecoration: "none",
                                marginLeft: "20px",
                              }}
                            >
                              #{selectedTag}
                            </a>
                          </>
                        )}
                      </div>
                      <br />
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
                          <div className="row">
                            <div className="col-md-9">
                              <span className="author-name">
                                <span style={{ color: "#5cb85c", cursor:"pointer"}}  onClick={()=>handleClickProfile(article.author?.username)}>
                                  {article.author.username}
                                </span> 

                                <br />
                                <span
                                  className="date"
                                  style={{ fontSize: "70%", color: "#BBBBBB" }}
                                >
                                  {moment(article.createdAt).format(
                                    "MMMM D, YYYY"
                                  )}
                                </span>
                              </span>
                            </div>
                            <div className="col-md-2">
                              <button
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <FontAwesomeIcon icon={faHeart} />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {article.favoritesCount}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleArticleClick(article.slug)}
                      >
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
                                className={`tag-default tag-pill tag-outline ${
                                  tag === selectedTag ? "active" : ""
                                }`}
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className="slidebar"
                style={{
                  padding: "5px 10px 10px",
                  backgroundColor: "#f3f3f3",
                  borderRadius: "4px",
                  width: "230px",
                  height: "151px",
                }}
              >
                <p>Popular Tags</p>
                <ul
                  className="tag-list"
                  style={{
                    listStyle: "none",
                    padding: 0,
                    marginLeft: "auto",
                    cursor: "pointer",
                  }}
                >
                  {tags.map((tag, index) => (
                    <li
                      key={index}
                      onClick={() => handlePopularTags(tag)}
                      className={`tag-default tag-pill tag-outline ${
                        tag === selectedTag ? "active" : ""
                      }`}
                      style={{
                        marginRight: "5px",
                        marginBottom: "5px",
                        padding: "5px 10px",
                        borderRadius: "20px",
                        background: "#818a91",
                        color: "#FFFFFF",
                        display: "inline-block",
                        fontSize: "70%",
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
