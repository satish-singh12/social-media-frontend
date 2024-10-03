import React, { useEffect, useState } from "react";
import "../styles/editProfile.css";
import { useSelector, useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { checkImage } from "../utils/imageUpload";
import { updatedProfile } from "../redux/actions/profileActions";

const EditProfile = ({ user, setOnEdit }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    website: "",
    fullname: "",
    story: "",
    phone: "",
    address: "",
  };

  const [editData, setEditData] = useState(initialState);
  const { website, fullname, story, phone, address } = editData;
  const [avatar, setAvatar] = useState("");

  const changeAvagar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err) return dispatch({ type: "ALERT", payload: { error: err } });
    file && setAvatar(file);
  };

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const selectUpload = () => {
    const fileUploadInput = document.getElementById("file-upload");
    fileUploadInput.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedProfile({ editData, avatar, auth }));
  };

  return (
    <div className="edit-profile">
      <div className="edit-profile-head">
        <h4 className="edit-profile-head-title">Edit Your Profile</h4>
        <button
          className="edit-profile-head-close"
          onClick={() => setOnEdit(false)}
        >
          Close
        </button>
      </div>
      <div className="edit-profile-avatar">
        {/* {console.log(avatar)} */}
        <img
          src={avatar ? URL.createObjectURL(avatar) : user?.avatar}
          alt="avatarimage"
        />
        <span
          className="edit-profile-avatar-camera-head"
          onClick={selectUpload}
        >
          <FaCamera className="edit-profile-avatar-camera" />
          <p>Change Picture</p>
        </span>

        <span>
          <input
            type="file"
            id="file-upload"
            accept="image/"
            style={{ display: "none" }}
            onChange={changeAvagar}
          />
        </span>
      </div>
      <div className="edit-profile-user-data">
        <label htmlFor="fullname">Full Name</label>
        <div className="edit-profile-user-data-fullname">
          <input
            type="text"
            value={fullname}
            onChange={handleChangeInput}
            name="fullname"
            placeholder="Type your name"
          />
        </div>
        <small>{fullname.length}/25</small>

        <label htmlFor="address">Address</label>
        <div className="edit-profile-user-data-address">
          <input
            type="text"
            value={address}
            onChange={handleChangeInput}
            name="address"
            placeholder="Type your address"
          />
        </div>

        <label htmlFor="website">Website</label>
        <div className="edit-profile-user-data-website">
          <input
            type="text"
            value={website}
            onChange={handleChangeInput}
            name="website"
            placeholder="Type your website name"
          />
        </div>
        <label htmlFor="phone">Phone</label>
        <div className="edit-profile-user-data-phone">
          <input
            type="text"
            value={phone}
            onChange={handleChangeInput}
            name="phone"
            placeholder="Type your phone"
          />
        </div>

        <label htmlFor="story">Story</label>
        <div className="edit-profile-user-data-story">
          <input
            type="text"
            value={story}
            onChange={handleChangeInput}
            name="story"
            placeholder="Type your Bio"
          />
        </div>
        <small>{story.length}/200</small>
      </div>

      <div className="stage">
        <button
          onClick={handleSubmit}
          className="edit-profile-user-data-button"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
