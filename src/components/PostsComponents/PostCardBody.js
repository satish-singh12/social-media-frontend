import React, { useState } from "react";
import "../../styles/postCardBody.css";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";

const PostCardBody = ({ pos }) => {
  const [readMore, setReadMore] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const showNextImage = (images) => {
    setCurrentImage((prev) => {
      // Ensure the next index does not exceed the bounds
      return (prev + 1) % images.length;
    });
  };

  const showPrevImage = (images) => {
    setCurrentImage((prev) => {
      // Ensure the previous index wraps around correctly
      return (prev - 1 + images.length) % images.length;
    });
  };

  return (
    <div className="post-card-body">
      <div className="post-card-body-container">
        {pos.content?.length > 60 ? (
          <>
            {readMore ? pos.content : pos.content.slice(0, 60) + "... "}
            <button onClick={() => setReadMore(!readMore)}>
              {readMore ? <span>Show less</span> : <span>...Read more</span>}
            </button>
          </>
        ) : (
          pos.content
        )}
      </div>

      <div className="post-card-body-image">
        {/* Only show buttons if there is more than one image */}
        {pos.images?.length > 1 && (
          <>
            <span
              className="post-card-body-image-next"
              onClick={() => showNextImage(pos.images)}
            >
              <GrCaretPrevious />
            </span>
            <span
              className="post-card-body-image-prev"
              onClick={() => showPrevImage(pos.images)}
            >
              <GrCaretNext />
            </span>
          </>
        )}

        {pos.images?.length > 0 &&
          pos.images?.map(
            (image, index) =>
              index === currentImage && (
                <div className="post-card-body-image" key={index}>
                  {image.secure_url.match(/video/i) ? (
                    <video
                      className="post-card-body-image-video"
                      controls
                      src={image.secure_url}
                      alt={pos.user.fullname}
                    />
                  ) : (
                    <img src={image.secure_url} alt={pos.user.fullname} />
                  )}
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default PostCardBody;
