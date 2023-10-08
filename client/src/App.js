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
import UpdateProfile from "./pages/UpdateProfile";

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
            path="/blogDetails/:id"
            element={user ? <BlogDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/updateBlog/:id"
            element={user ? <UpdateBlog /> : <Navigate to="/login" />}
          />
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
          path="/update-profile"
          element={user ? <UpdateProfile /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
