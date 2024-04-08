import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Container/Header";
import Home from "./Container/Home";
import ArticlesDetails from "./Container/ArticlesDetails";
import AddArticles from "./Container/AddArticles";
import ProfileDetails from "./Container/ProfileDetails";
import EditArticles from "./Container/EditArticles";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
