import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditArticles = () => {
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });

  const [tags, setTags] = useState([]); // State để lưu trữ danh sách các tag
  const { slug } = useParams(); // Lấy slug từ URL
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.realworld.io/api/articles/${slug}`
        );

        const { article } = response.data; // Lấy dữ liệu bài viết từ phản hồi API
        setArticleData(article); // Cập nhật state với dữ liệu bài viết
        setTags(article.tagList); // Cập nhật danh sách tag
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchData();
  }, [slug]); // Đảm bảo useEffect chạy lại khi slug thay đổi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    setTags(value.split(",")); // Cập nhật danh sách tag từ giá trị nhập vào
    setArticleData({ ...articleData, tagList: value }); // Cập nhật taglist trong articleData
  };

  const handleSubmit = async () => {
    try {
      const userToken =
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxODE1OX0sImlhdCI6MTcxMjA0NjMyMiwiZXhwIjoxNzE3MjMwMzIyfQ.VB_sPjx8K6SPkJBr8CZaiI_-9sogz3FS1ylPZ1tg4JA";
      await axios.put(
        `https://api.realworld.io/api/articles/${slug}`,
        { article: articleData },
        {
          headers: {
            Authorization: userToken,
          },
        }
      );
      nav("/");
    } catch (error) {
      console.error("Error submitting article:", error);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={articleData.title}
                    onChange={handleChange}
                  />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={articleData.description}
                    onChange={handleChange}
                  />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    name="body"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={articleData.body}
                    onChange={handleChange}
                  ></textarea>
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="tagList"
                    className="form-control"
                    placeholder="Enter tags"
                    value={articleData.tagList}
                    onChange={handleTagChange} // Sử dụng handleTagChange thay vì handleChange
                  />
                </fieldset>
                <br />
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleSubmit}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditArticles;
