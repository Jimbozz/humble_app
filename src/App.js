import { Routes, Route, Router, Switch } from "react-router-dom";
import "./sass/styles.scss";
import HomePage from "./components/home/HomePage";
import Layout from "./layout/Layout";
import ProfilesPage from "./components/profiles/ProfilesPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./components/register/RegisterPage";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/profiles" element={<ProfilesPage />} />

        {/* <Route exact path="/page/:id" element={<PageSpecific />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/edit/:id" element={<EditPage />} /> */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
