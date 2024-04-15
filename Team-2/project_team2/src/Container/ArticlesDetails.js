import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { IoMdAddCircle } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ArticlesDetails = () => {
  const [articlesDetails, setArticlesDetails] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { slug } = useParams();
  const nav = useNavigate();

  // Fix cứng token vào đây
  const userToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODE1OX0sImlhdCI6MTcxMjA0NjMyMiwiZXhwIjoxNzE3MjMwMzIyfQ.VB_sPjx8K6SPkJBr8CZaiI_-9sogz3FS1ylPZ1tg4JA";

  const currentUser = JSON.parse(atob(userToken.split(".")[1])).user;

  useEffect(() => {
    const fetchArticlesDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}`,
          {
            headers: {
              Authorization: userToken,
            },
          }
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
  }, [slug, userToken]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}/comments`,
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        if (response.data && Array.isArray(response.data.comments)) {
          setComments(response.data.comments);
        } else {
          console.error("Invalid response data");
        }
      } catch (error) {
        console.error("Fetch comments error", error);
      }
    };

    fetchComments();
  }, [slug, userToken]);

  const handleClickProfile = (username) => {
    nav(`/profile/${username}`);
  };

  const handleEditArticle = () => {
    nav(`/editor/${slug}`);
  };

  const handleDeleteArticle = async () => {
    try {
      await axios.delete(`https://api.realworld.io/api/articles/${slug}`, {
        headers: {
          Authorization: userToken,
        },
      });
      nav("/");
    } catch (error) {
      console.error("Delete article error", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        { comment: { body: commentText } },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      if (response.data && response.data.comment) {
        setComments([...comments, response.data.comment]);
        setCommentText("");
      } else {
        console.error("Invalid response data");
      }
    } catch (error) {
      console.error("Post comment error", error);
    }
  };
  const handleDeleteComment = async (commentId) => {
    try {
      // Gửi request DELETE đến API để xóa comment
      await axios.delete(
        `https://api.realworld.io/api/articles/${slug}/comments/${commentId}`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      // Sau khi xóa thành công, cập nhật state comments bằng cách loại bỏ comment có id tương ứng
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Delete comment error", error);
    }
  };

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
            style={{ borderRadius: "50%", marginRight: "5px", width: "32px" }}
            src={articlesDetails.author?.image}
            alt="avt"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "20px",
            }}
          >
            <span
              className="author-name"
              style={{
                color: "#fff",
                fontSize: "70%",
                margin: "0",
                cursor: "pointer",
              }}
              onClick={() =>
                handleClickProfile(articlesDetails.author.username)
              }
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
          {articlesDetails.author?.username === "team2" ? (
            <>
              <button
                onClick={handleEditArticle}
                style={{
                  fontSize: "14px",
                  color: "#999999",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  border: "solid 1px #999999",
                  borderRadius: "5px",
                  marginRight: "5px",
                }}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Article
              </button>
              <button
                onClick={handleDeleteArticle}
                style={{
                  fontSize: "14px",
                  color: "#b85c5c",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  border: "solid 1px #999999",
                  borderRadius: "5px",
                }}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete Article
              </button>
            </>
          ) : (
            <button
              style={{
                fontSize: "14px",
                color: "#999999",
                backgroundColor: "rgba(0, 0, 0, 0)",
                border: "solid 1px #999999",
                borderRadius: "5px",
              }}
              onClick={() => {
                // Logic for following the author
              }}
            >
              <IoMdAddCircle />
              &nbsp; Follow {articlesDetails.author?.username}
            </button>
          )}
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
      <hr />
      <div className="col-xs-12 col-md-6 offset-md-3">
        <div className="comment-form" style={{ border: "1px solid #e5e5e5" }}>
          <textarea
            name="comment"
            className="form-control"
            placeholder="Write a comment..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <div
            className="comment-footer"
            style={{
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              padding: "12px 20px ",
            }}
          >
            <img
              src={articlesDetails.author?.image}

              alt="avt"
              style={{ borderRadius: "30px", width: "30px", height: "30px" }}
            />
            <button
              onClick={handleCommentSubmit}
              style={{
                backgroundColor: "#5CB85C",
                color: "#fff",
                border: "none",
                padding: "4px 8px",
                borderRadius: "4px",
                marginLeft: "auto",
              }}
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
      <br />
      <div className="col-xs-12 col-md-6 offset-md-3">
        {comments.map((cmt) => (
          <div
            className="comment-form"
            style={{ border: "1px solid #e5e5e5", margin: "10px 0 20px" }}
            key={cmt.id}
          >
            <div
              className="form-control"
              placeholder="Write a comment..."
              rows={3}
            >
              {cmt.body}
            </div>
            <div
              className="comment-footer"
              style={{
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                padding: "12px 20px ",
                fontSize: "12px",
              }}
            >
              <img
                src={cmt.author.image}
                className="comment-author-img"
                alt="comment author avatar"
                style={{
                  borderRadius: "30px",
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                }}
              />
              <span
                style={{
                  color: "#5cb85c",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => handleClickProfile(cmt.author.username)}
              >
                {cmt.author.username}
              </span>
              <span>{moment(cmt.createdAt).format("MMMM D, YYYY")}</span>
              {cmt.author?.username === "team2" && (
  <button
    style={{
      backgroundColor: "#5CB85C",
      color: "#fff",
      border: "none",
      padding: "4px 8px",
      borderRadius: "4px",
      marginLeft: "auto",
    }}
    onClick={() => handleDeleteComment(cmt.id)}
  >
    <FontAwesomeIcon icon={faTrash} />
  </button>
)}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesDetails;
