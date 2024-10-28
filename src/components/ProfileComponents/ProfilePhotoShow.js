import React from "react";
import "./styles/profilePhotoShow.css";

const ProfilePhotoShow = ({ photos }) => {
  return (
    <div className="profile-photo-show">
      <h4>Photos</h4>
      <div className="profile-photo-show-map">
        {photos[0]?.posts?.length > 0 &&
          photos[0].posts.slice(0, 12).map((item) => {
            // Check if images exist and if the first item is an image (not a video)
            if (
              item.images &&
              item.images[0] &&
              !item.images[0].secure_url.match(/video/i)
            ) {
              return (
                <img
                  key={item._id}
                  className="profile-photo-show-images"
                  src={item.images[0].secure_url}
                  alt="User post"
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

export default ProfilePhotoShow;
