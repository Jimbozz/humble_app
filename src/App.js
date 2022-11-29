import { Routes, Route, Router, Switch, useLocation } from "react-router-dom";
import "./sass/styles.scss";
import HomePage from "./components/home/HomePage";
import Layout from "./layout/Layout";
import ProfilesPage from "./components/profiles/ProfilesPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";

import ProfileSpecificPage from "./components/profile-specific/ProfileSpecificPage";
import PostSpecificPage from "./components/post-specific/PostSpecificPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="post">
          <Route path=":id/:title" element={<PostSpecificPage />} />
        </Route>

        <Route path="/profiles" element={<ProfilesPage />} />
        <Route path="/profiles/:id" element={<ProfileSpecificPage />} />
        <Route path="/profiles/:name" element={<ProfileSpecificPage />} />
        {/* <Route path="profiles">
          <Route path=":id" element={<ProfileSpecificPage />} />
          <Route path=":id/:id" element={<ProfileSpecificPage />} />
          <Route path=":name" element={<ProfileSpecificPage />} />
        </Route> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
