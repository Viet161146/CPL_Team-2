import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import moment from "moment";

const DetailsProfile = () => {
  const [profileDetails, setProfileDetails] = useState({});
  const [userArticles, setUserArticles] = useState([]);
  const { username } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/profiles/${username}`
        );
        if (response.data && response.data.profile) {
          setProfileDetails(response.data.profile);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("Fetch profile details error", error);
      }
    };

    const fetchUserArticles = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles?author=${username}`
        );
        if (response.data && response.data.articles) {
          setUserArticles(response.data.articles);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("Fetch user articles error", error);
      }
    };

    fetchProfileDetails();
    fetchUserArticles();
  }, [username]);
  const handleArticleClick = (slug) => {
    nav(`/articles/${slug}`);
  };

  return (
    <div className="profile-details">
      <div
        className="banner"
        style={{
          backgroundColor: "rgb(243, 243, 243)",
          color: "rgb(55, 58, 60)",
          padding: "32px 0 16px",
          fontSize: "16px",
          fontWeight: "800",
          height: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ borderRadius: "50%", width: "100px" }}
          src={profileDetails.image}
          alt="avt"
        />
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {profileDetails.username}
        </p>
        <button
            style={{
              fontSize:'14px',
              color:'#999999',
              backgroundColor:'#FFFFFF',
              border:'solid 1px #999999',
              borderRadius:'5px'
            }}
          >
            <IoMdAddCircle />
            &nbsp; Follow {profileDetails.username}
          </button>
      </div>
      <br />
      <div className="container" style={{ width: "70%" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href=""
            style={{
              color: "#5cb85c",
              textDecoration: "none",
              marginRight: "20px",
            }}
          >
            My Articles
          </a>
          
        </div>
<br />
        <div>
          {userArticles.map((article, index) => (
            <div key={index}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  style={{ borderRadius: "50%", marginRight: "5px" }}
                  src={article.author.image}
                  alt="avt"
                />
                <span className="author-name">
                  <span style={{ color: "#5cb85c", cursor:'pointer' }}>
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
                        className=""
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
  );
};

export default DetailsProfile;
