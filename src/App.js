import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Post from "./pages/Post";
import Alerts from "./components/Alerts";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Message from "./pages/Message";
import PrivateRouter from "./utils/PrivateRouter";
import Profile from "./pages/Profile";

import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authActions";

function App() {
  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Alerts />
        {auth.token && <Navbar />}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={auth.token ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/message"
            element={<PrivateRouter element={<Message />} />}
          />
          <Route
            path="/explore"
            element={<PrivateRouter element={<Explore />} />}
          />
          <Route
            path="/notification"
            element={<PrivateRouter element={<Notifications />} />}
          />
          <Route
            path="/post/:id"
            element={<PrivateRouter element={<Post />} />}
          />
          <Route
            path="/profile/:id"
            element={<PrivateRouter element={<Profile />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
