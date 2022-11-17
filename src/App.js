import { Routes, Route, Router, Switch, useLocation } from "react-router-dom";
import "./sass/styles.scss";
import HomePage from "./components/home/HomePage";
import Layout from "./layout/Layout";
import ProfilesPage from "./components/profiles/ProfilesPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";

import ProfileSpecificPage from "./components/profile-specific/ProfileSpecificPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/profile/:id" element={<ProfileSpecificPage />} />
        <Route path="profiles/profile/:id" element={<ProfileSpecificPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/profiles" element={<ProfilesPage />} />
        {/* <Route exact path="/create" element={<CreatePost />} /> */}
      </Routes>
      {/* <Routes location={background || location}>
        <Route path="/" element={<HomePage />}>
          <Route path="modal" element={<OptionsButton />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route path="modal" element={<OptionsButton />} />
        </Routes>
      )} */}
    </AuthProvider>
  );
}

export default App;
