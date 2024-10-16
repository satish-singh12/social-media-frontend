import moment from "moment";
import React from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdInsertComment } from "react-icons/md";
import "../../styles/savedPostCard.css";
import { Link } from "react-router-dom";

const SavedPostCard = ({ savedpost }) => {
  return (
    <div className="saved-post-card">
      <Link className="no-decoration" to={`/post/${savedpost._id}`}>
        <div className="s ">
          <div className="saved-post-card-user-info">
            <img
              className="saved-post-card-user-info-avatar"
              src={savedpost.user?.avatar}
              alt=""
            />
            <div className="saved-post-card-content-info-detail">
              <h5 className="saved-post-card-content-info-detail-fullname">
                {savedpost.user?.fullname}
              </h5>
              <small className="saved-post-card-content-info-detail-username">
                {savedpost.user?.username}
              </small>
            </div>
          </div>

          <div className="saved-post-card-content-middle">
            {savedpost.images[0].secure_url.match(/video/i) ? (
              <video controls src={savedpost.images[0].secure_url} alt="" />
            ) : (
              <img src={savedpost.images[0].secure_url} alt="" />
            )}
            {/* {savedpost.images.length > 0 &&
            savedpost.images.map((image, index) => (
              <div className="saved-post-card-content-middle-image" key={index}>
                {image.secure_url.match(/video/i) ? (
                  <video
                    className="saved-post-card-content-middle-video"
                    controls
                    src={image.secure_url}
                    alt=""
                  />
                ) : (
                  <img src={image.secure_url} alt="" />
                )}
              </div>
            ))} */}
          </div>

          <div className="saved-post-card-content-end">
            <div className="saved-post-card-content-end-item">
              <h6 className="saved-post-card-content-end-item-text">
                {savedpost?.likes?.length}
              </h6>
              <MdOutlineFavoriteBorder
                style={{
                  color: savedpost.likes.length === 0 ? "black" : "red",
                }}
              />
            </div>
            <div className="saved-post-card-content-end-item">
              <h6 className="saved-post-card-content-end-item-text">
                {savedpost?.comments?.length}
              </h6>
              <MdInsertComment
                style={{
                  color: savedpost.comments.length === 0 ? "black" : "gray",
                }}
              />
            </div>
          </div>

          <div className="saved-post-card-content-end-time">
            <small className="saved-post-card-content-end-time-text">
              Post Created At:
            </small>
            <small className="saved-post-card-content-end-time-timeformat">
              {moment(savedpost.createdAt).format("MM/DD/YYYY")}
            </small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SavedPostCard;
