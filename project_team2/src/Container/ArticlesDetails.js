import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const ArticlesDetails = () => {
  const [articlesDetails, setArticlesDetails] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    const fetchArticlesDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}`
        );
        if (response.data && response.data.article) {
          setArticlesDetails(response.data.article);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("Fetch tagsDetails error", error);
      }
    };

    fetchArticlesDetails();
  }, [slug]);

  return (
    <div className="detail">
      <div
        className="banner"
        style={{
          backgroundColor: "#333333",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "left",
            width: "80%",
            marginLeft: "10%",
          }}
        >
          {articlesDetails.title}
        </h1>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10%" }}
        >
          <img
            style={{ borderRadius: "50%", marginRight: "5px" }}
            src={articlesDetails.author?.image}
            alt="avt"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              className="author-name"
              style={{ color: "#fff", fontSize: "70%", margin: "0" }}
            >
              {articlesDetails.author?.username}
            </span>
            <p
              className="date"
              style={{ fontSize: "60%", color: "#BBBBBB", margin: "0" }}
            >
              {moment(articlesDetails.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>
        </div>
      </div>
      <br />
      <div className="container" style={{ width: "80%", margin: "20px auto" }}>
        <p style={{ marginLeft: "20px" }}>{articlesDetails.description}</p>
        <br />
        <p style={{ marginLeft: "20px" }}>{articlesDetails.body}</p>
        <ul
          className="tag-list"
          style={{ listStyle: "none", padding: 0, marginLeft: "auto" }}
        >
          {articlesDetails.tagList &&
            articlesDetails.tagList.map((tag, index) => (
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
    </div>
  );
};

export default ArticlesDetails;
