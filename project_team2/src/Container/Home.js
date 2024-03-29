import React, { useEffect, useState } from "react";
import style from "./Home.module.css";

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Dữ liệu từ đoạn JSON bạn đã cung cấp
    const data = {
      "articles": [
        {
          "slug": "test",
          "title": "test",
          "description": "test",
          "body": "test",
          "tagList": [
            "test"
          ],
          "createdAt": "2024-03-29T16:00:41.342Z",
          "updatedAt": "2024-03-29T16:00:41.342Z",
          "favorited": true,
          "favoritesCount": 0,
          "author": {
            "username": "chun",
            "bio": "test",
            "image": "https://scontent.fhan14-2.fna.fbcdn.net/v/t39.30808-6/434201679_947972393407608_628235543591513876_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8hVAcEDk9g0AX_84M3G&_nc_ht=scontent.fhan14-2.fna&oh=00_AfDtxHZn3I1fepETmYUBVAA5coT546oNQQslFfsQenOSzw&oe=660BBE39",
            "following": true
          }
        }
      ],
      "articlesCount": 0
    };

    // Lưu trữ dữ liệu vào state
    setArticles(data.articles);
  }, []);

  return (
    <div className={style.home}>
      <div className="">
        <div className="banner">
          <h1>conduit</h1>
          <p>A place to share your knowledge</p>
        </div>
        <div className="content">
          <div className="row">
            <div className="col-md-9">
              {articles.map((article, index) => (
                <div key={index}>
                  <p>slug: {article.slug}</p>
                  <p>title: {article.title}</p>
                  <p>description: {article.description}</p>
                  <p> name: {article.author.username}</p>
                  {/* Add more fields if needed */}
                </div>
              ))}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
