import React from "react";
import "../../styles/profileVideoShow.css";

const ProfileVideoShow = ({ photos }) => {
  return (
    <div className="profile-video-show">
      <h4>Videos</h4>
      <div className="profile-video-show-map">
        {photos[0]?.posts?.length > 0 &&
          photos[0]?.posts
            ?.slice(0, 4)
            .map((item) => (
              <>
                {item.images[0]?.secure_url.match(/video/i) ? (
                  <video
                    className="profile-video-show-video"
                    controls
                    src={item.images[0]?.secure_url}
                  />
                ) : (
                  ""
                )}
              </>
            ))}
      </div>
    </div>
  );
};

export default ProfileVideoShow;
