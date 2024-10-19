import React from "react";
import "../../styles/profileVideoShow.css";

const ProfileVideoShow = ({ photos }) => {
  return (
    <div className="profile-video-show">
      <h4>Videos</h4>
      <div className="profile-video-show-map">
        {photos[0]?.posts?.length > 0 &&
          photos[0]?.posts?.slice(0, 4).map(
            (item, index) =>
              item.images[0]?.secure_url.match(/video/i) ? (
                <video
                  key={item._id || index} // Preferably use item.id if it's unique
                  className="profile-video-show-video"
                  controls
                  src={item.images[0]?.secure_url}
                />
              ) : null // Return null if it's not a video
          )}
      </div>
    </div>
  );
};

export default ProfileVideoShow;
