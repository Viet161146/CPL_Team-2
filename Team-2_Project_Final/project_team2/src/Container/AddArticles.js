import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Khai báo một hằng số để lưu trữ token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODE1OX0sImlhdCI6MTcxMTk5NTcyMywiZXhwIjoxNzE3MTc5NzIzfQ.36ghfPyzEbXK48ltssZNV7SaR9CnCU7PA2-o5wab6oQ";

function AddArticles({ onArticleAdded }) {
  const [articleTitle, setArticleTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const nav = useNavigate();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://api.realworld.io/api/articles",
        {
          article: {
            title: articleTitle,
            description: description,
            body: body,
            tagList: tags.split(",").map((tag) => tag.trim()),
          },
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Article submitted successfully:", response.data.article);

      // Chuyển hướng đến trang / sau khi bài viết được thêm thành công
      nav("/");

      // Gọi hàm callback để cập nhật danh sách bài viết trên trang Home
      if (onArticleAdded) {
        onArticleAdded();
      }
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };
  return (
    <form>
      <fieldset className="container" style={{ width: "50%" }}>
        <fieldset className="form-group">
          <input
            type="text"
            name="articleTitle"
            className="form-control form-control-lg"
            placeholder="Article Title"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </fieldset>
        <br />
        <fieldset className="form-group">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="What's this article about?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <br />
        <fieldset className="form-group">
          <textarea
            className="form-control"
            name="body"
            rows="8"
            placeholder="Write your article (in markdown)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </fieldset>
        <br />
        <fieldset className="form-group">
          <input
            type="text"
            name="tags"
            className="form-control"
            placeholder="Enter tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div className="tag-list"></div>
        </fieldset>
        <br />
        <button
          className="btn btn-lg pull-xs-right btn-success"
          type="button"
          onClick={handleSubmit}
        >
          Publish Article
        </button>
      </fieldset>
    </form>
  );
}

export default AddArticles;
