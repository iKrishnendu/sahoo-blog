import { Navigate, Route, Routes } from "react-router-dom";
import BlogDetails from "./pages/BlogDetails";
import Create from "./pages/Create";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdateBlog from "./pages/UpdateBlog";
import { useSelector } from "react-redux";
import Layout from "./layout/Layout";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import CategoryPage from "./pages/CategoryPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AboutPage from "./pages/AboutPage";

// import UpdateProfile from "./pages/UpdateProfile";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/create"
            element={user ? <Create /> : <Navigate to="/login" />}
          />
          <Route
            path="/blog-details/:id"
            element={user ? <BlogDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/update-blog/:id"
            element={user ? <UpdateBlog /> : <Navigate to="/login" />}
          />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route
            path="/categories/:category"
            element={user ? <CategoryPage /> : <Navigate to="/login" />}
          />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!user ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* <Route
          path="/update-profile"
          element={user ? <UpdateProfile /> : <Navigate to="/" />}
        /> */}
        {/* <Route path="/page/:page" component={Home} /> */}
      </Routes>
    </div>
  );
}

export default App;
