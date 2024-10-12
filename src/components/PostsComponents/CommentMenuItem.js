import React, { useState } from "react";
import "../../styles/commentMenuItem.css";

const CommentMenuItem = ({ comment, pos, auth, setOnEdit }) => {
  const [menuItem, setMenuItem] = useState(false);
  //   console.log(pos);
  const MenuItem = () => {
    return (
      <>
        <div className="comment-menu-item-list">
          <h6
            className="comment-menu-item-edit"
            onClick={() => {
              setOnEdit(true);
              setMenuItem(false); // Close the menu when Edit is clicked
            }}
          >
            Edit
          </h6>
          <h6 className="comment-menu-item-delete">Remove</h6>
        </div>
      </>
    );
  };
  return (
    <div className="comment-menu-item">
      {(pos.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div
          className="comment-menu-item"
          onClick={() => setMenuItem(!menuItem)}
        >
          ooo
        </div>
      )}
      {menuItem ? (
        pos.user._id === auth.user._id ? (
          comment.user._id === auth.user._id ? (
            MenuItem()
          ) : (
            <h6 className="comment-menu-item-delete">Remove</h6>
          )
        ) : (
          comment.user._id === auth.user._id && MenuItem()
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentMenuItem;
