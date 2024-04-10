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
  const [liked, setLiked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // State lưu trữ trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // State lưu trữ tổng số trang
  const articlesPerPage = 10; // Số bài viết trên mỗi trang

  const nav = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles?limit=${articlesPerPage}&offset=${
            (currentPage - 1) * articlesPerPage
          }`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODE1OX0sImlhdCI6MTcxMjA0NjMyMiwiZXhwIjoxNzE3MjMwMzIyfQ.VB_sPjx8K6SPkJBr8CZaiI_-9sogz3FS1ylPZ1tg4JA",
            },
          }
        );
        if (response.data && Array.isArray(response.data.articles)) {
          setArticles(response.data.articles);
          setTotalPages(
            Math.ceil(response.data.articlesCount / articlesPerPage)
          );
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("fetch articles error", error);
      }
    };
    fetchArticles();
  }, [currentPage]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get("https://api.realworld.io/api/tags", {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODE1OX0sImlhdCI6MTcxMjA0NjMyMiwiZXhwIjoxNzE3MjMwMzIyfQ.VB_sPjx8K6SPkJBr8CZaiI_-9sogz3FS1ylPZ1tg4JA",
          },
        });
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

  const handleClickProfile = (username) => {
    nav(`profile/${username}`);
  };

  function handlePopularTags(tag) {
    setSelectedTag(tag);
    const filteredData = globalFeedData.filter((item) =>
      item.tagList.includes(tag)
    );
    setArticles(filteredData);
  }

  function handleGlobalFeed() {
    setSelectedTag(null);
    setArticles(globalFeedData);
  }

  const handleLike = (slug) => {
    setLiked(!liked);
    const updatedArticles = articles.map((article) => {
      if (article.slug === slug) {
        return {
          ...article,
          favoritesCount: liked
            ? article.favoritesCount - 1
            : article.favoritesCount + 1,
        };
      }
      return article;
    });
    setArticles(updatedArticles);
    const updatedGlobalFeed = globalFeedData.map((article) => {
      if (article.slug === slug) {
        return {
          ...article,
          favoritesCount: liked
            ? article.favoritesCount - 1
            : article.favoritesCount + 1,
        };
      }
      return article;
    });
    setGlobalFeedData(updatedGlobalFeed);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
                          style={{
                            borderRadius: "50%",
                            marginRight: "5px",
                            width: "32px",
                          }}
                          src={article.author.image}
                          alt="avt"
                        />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div className="row">
                            <div className="col-md-9">
                              <span className="author-name">
                                <span
                                  style={{
                                    color: "#5cb85c",
                                    cursor: "pointer",
                                  }}
                                  onClick={() =>
                                    handleClickProfile(article.author?.username)
                                  }
                                >
                                  {article.author.username}
                                </span>
                                <br />
                                <span
                                  className="date"
                                  style={{
                                    fontSize: "70%",
                                    color: "#BBBBBB",
                                  }}
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
                                onClick={() => handleLike(article.slug)}
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
                        <p
                          style={{
                            color: "#BBBBBB",
                            fontSize: "80%",
                          }}
                        >
                          {article.description}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
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
                  width: "250px",
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
      {/* Pagination */}
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Home;
