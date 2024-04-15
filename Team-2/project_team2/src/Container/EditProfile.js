import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  // State để lưu trữ giá trị của các trường nhập
  const [profilePicture, setProfilePicture] = useState("https://api.realworld.io/images/smiley-cyrus.jpeg");
  const [name, setName] = useState("team2");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi dữ liệu cập nhật đến server
    // Code xử lý cập nhật dữ liệu ở đây
  };

  // Hàm xử lý khi nhấn logout
  const handleLogout = () => {
    // Xử lý đăng xuất ở đây, ví dụ:
    localStorage.removeItem("username");
    navigate("/login"); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                  />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="8"
                    placeholder="Short bio about you"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <br />
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <br />
                <button
                  type="submit"
                  className="btn btn-lg btn-primary float-right"
                  style={{
                    backgroundColor: '#5cb85c'
                  }}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            {/* Gắn hàm xử lý handleLogout vào sự kiện onClick */}
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
