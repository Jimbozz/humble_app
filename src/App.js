import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import HomePage from "./components/home/HomePage";
import Layout from "./layout/Layout";
import ProfilesPage from "./components/profiles/ProfilesPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/profiles" element={<ProfilesPage />} />
        {/* <Route exact path="/page/:id" element={<PageSpecific />} />
      <Route exact path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/edit/:id" element={<EditPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
