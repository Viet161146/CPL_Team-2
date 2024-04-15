import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Container/Header";
import Home from "./Container/Home";
import ArticlesDetails from "./Container/ArticlesDetails";
import AddArticles from "./Container/AddArticles";
import ProfileDetails from "./Container/ProfileDetails";
import EditArticles from "./Container/EditArticles";
import Login from "./Container/Login";

import Signup from "./Container/Signup"; // Import Signup component
import EditProfile from "./Container/EditProfile";

function App() {
  return (
    <div className="App">
      <Router>
      <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Home />} />
          <Route path="/articles/:slug" element={<ArticlesDetails />} />
          <Route path="/editor" element={<AddArticles/>}/>
          <Route path="/profile/:username" element={<ProfileDetails/>}/>
          <Route path="/editor/:slug" element={<EditArticles/>}/>
      
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> {/* Add Route for Signup component */}
          <Route path="/editor" element={<AddArticles />} />
          <Route path="/editor" element={<AddArticles />} />
          <Route path="/setting" element={<EditProfile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
