import React, { useEffect, useState } from "react";
import { getDataApi } from "../../utils/fetchDataApi";
import SavedPostCard from "./SavedPostCard";
import { useDispatch } from "react-redux";

const SavedPost = ({ auth }) => {
  const [savedposts, setSavedPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      getDataApi("getsavedpost", auth.token)
        .then((res) => setSavedPosts(res.data.savedPosts))
        .catch((err) => {
          dispatch({
            type: "ALERT",
            payload: { error: err.response?.data?.message },
          });
        });
    }
    return () => setSavedPosts([]);
  }, [auth.token, dispatch]);

  return (
    <div
      style={{
        display: "grid",
        width: "1200px",
        maxWidth: "100%",
        margin: "1rem auto",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "2rem",
        gridAutoFlow: "row",
      }}
    >
      {savedposts.map((savedpost) => (
        <SavedPostCard key={savedpost._id} savedpost={savedpost} />
      ))}
    </div>
  );
};

export default SavedPost;
