import React, { useEffect, useState } from "react";
import "./styles/resetPassword.css";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../redux/actions/profileActions";

const ResetPassword = ({ user, setOnReset }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [editData, setEditData] = useState(initialState);
  const { currentPassword, newPassword, confirmPassword } = editData;

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        return dispatch({
          type: "ALERT",
          payload: { error: "Passwords do not match" },
        });
      }

      dispatch(resetPassword({ currentPassword, newPassword, auth }))
        .then(() => {
          setOnReset(false);
        })
        .catch((err) => {
          return err;
        });
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-head">
        <h4 className="reset-password-head-title">Reset Your Password</h4>
        <button
          className="reset-password-head-close"
          onClick={() => setOnReset(false)}
        >
          Close
        </button>
      </div>
      <div className="reset-password-user-data">
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleChangeInput}
          placeholder="Enter current password"
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChangeInput}
          placeholder="Enter new password"
        />

        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeInput}
          placeholder="Confirm new password"
        />
      </div>

      <div className="reset-password-stage">
        <button
          onClick={handleSubmit}
          className="reset-password-user-data-button"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
