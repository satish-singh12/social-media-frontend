import React from "react";
import "./styles/profilePhotoShow.css";

const ProfilePhotoShow = ({ photos }) => {
  return (
    <div className="profile-photo-show">
      <h4>Photos</h4>
      <div className="profile-photo-show-map">
        {photos[0]?.posts?.length > 0 &&
          photos[0]?.posts?.slice(0, 12).map((item) =>
            item.images[0]?.secure_url.match(/video/i) ? null : (
              <img
                key={item._id} // key should be on the img tag directly
                className="profile-photo-show-images"
                src={item.images[0]?.secure_url}
                alt="User post"
              />
            )
          )}
      </div>
    </div>
  );
};

export default ProfilePhotoShow;
