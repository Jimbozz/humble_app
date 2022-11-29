import { Routes, Route } from "react-router-dom";
import "./sass/styles.scss";
import HomePage from "./components/home/HomePage";
import ProfilesPage from "./components/profiles/ProfilesPage";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./components/register/RegisterPage";
import LoginPage from "./components/login/LoginPage";
import ProfileSpecificPage from "./components/profile-specific/ProfileSpecificPage";
import PostSpecificPage from "./components/post-specific/PostSpecificPage";
import AdminProfile from "./components/profile-specific/AdminProfile";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route exact path="/register" element={<RegisterPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="post">
          <Route
            path=":id/:title"
            element={
              <ProtectedRoute>
                <PostSpecificPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          exact
          path="/my-profile/:id"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profiles"
          element={
            <ProtectedRoute>
              <ProfilesPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/profiles/:id"
          element={
            <ProtectedRoute>
              <ProfileSpecificPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
