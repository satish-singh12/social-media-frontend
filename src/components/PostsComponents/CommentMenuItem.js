import React, { useState } from "react";
import "../../styles/commentMenuItem.css";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../redux/actions/commentActions";

const CommentMenuItem = ({ comment, pos, auth, setOnEdit }) => {
  const [menuItem, setMenuItem] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(deleteComment({ comment, pos, auth }));
  };

  const MenuItem = () => {
    const handleEditComment = () => {
      setOnEdit(true);
      setMenuItem(false);
    };

    return (
      <>
        <div className="comment-menu-item-list">
          <h6 className="comment-menu-item-edit" onClick={handleEditComment}>
            Edit
          </h6>
          <h6 className="comment-menu-item-delete" onClick={handleRemove}>
            Remove
          </h6>
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
            <h6 className="comment-menu-item-delete" onClick={handleRemove}>
              Remove
            </h6>
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
