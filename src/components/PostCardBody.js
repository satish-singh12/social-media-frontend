import React, { useState } from "react";
import "../styles/postCardBody.css";

const PostCardBody = ({ pos }) => {
  const [readMore, setReadMore] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  // const totalImage = pos.images.length;

  console.log(pos);

  return (
    <div className="post-card-body">
      {console.log(pos)}
      <div className="post-card-body-container">
        {pos.content.length > 60 ? (
          <>
            {readMore ? pos.content : pos.content.slice(0, 60) + "... "}
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? "Show less" : "...Read more"}
            </button>
          </>
        ) : (
          pos.content
        )}
      </div>

      <div className="post-card-body-image">
        <span className="post-card-body-image-next">V</span>
        <span className="post-card-body-image-prev">V</span>
        {pos.images.length > 0 &&
          pos.images.map((image) => (
            <img src={image.secure_url} alt={pos.user.fullname} />
          ))}
      </div>
    </div>
  );
};

export default PostCardBody;
