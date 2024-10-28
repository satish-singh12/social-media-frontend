import React, { useEffect, useRef, useState } from "react";
import UserCardMessages from "./UserCardMessages";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageDisplay from "./MessageDisplay";
import "./styles/rightSideMessage.css";
import { IoSend } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { MdOutlineAttachFile } from "react-icons/md";
import { imageUpload } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  deleteMessage,
  deleteAllMessages,
} from "../../redux/actions/messageActions";
import loadIcon from "../../images/loading.gif";
const RightSideMessage = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const socket = useSelector((state) => state.socket);

  const refDisplay = useRef();

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id);
    if (newData) {
      setUser(newData);
    }
  }, [message.users, id]);

  useEffect(() => {
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [message.data]); // Trigger scroll every time message.data changes

  const uploadmedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let mediaArr = [];
    files.forEach((file) => {
      if (!file) return (err = "no file found");
      if (file.size > 1024 * 1024 * 5) return (err = "file is too large");

      return mediaArr.push(file);
    });
    if (err) {
      dispatch({ type: "ALERT", payload: { error: err } });
    }
    setMedia([...media, ...mediaArr]);
  };

  const handleuploadinput = (e) => {
    e.preventDefault();
    const imagemedia = document.getElementById("fileuploadmsg");
    imagemedia.click();
  };

  const imageshow = (src) => {
    return <img src={src} alt="" className="statusmsg-middleimages" />;
  };

  const handleDeleteAllMsgs = () => {
    dispatch(deleteAllMessages({ id, auth, socket }));
  };

  const handleDeleteMsg = (msg) => {
    dispatch(deleteMessage({ message, data: msg, auth, socket }));
  };

  const videoshow = (src) => {
    return (
      <video controls src={src} alt="" className="statusmsg-middleimages" />
    );
  };

  const deleteimage = (index) => {
    const newArrimage = [...media];
    newArrimage.splice(index, 1);
    setMedia(newArrimage);
  };

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({ auth, id }));
        if (refDisplay.current) {
          refDisplay.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setMedia([]);
    setText("");
    setLoadMedia(true);
    let medArr = [];

    if (media.length > 0) medArr = await imageUpload(media);

    const msg = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: medArr,
      createdAt: new Date().toISOString(),
    };
    setLoadMedia(false);
    await dispatch(addMessage({ auth, msg, socket }));
    if (refDisplay.current) {
      refDisplay.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className="right-side-content">
      <div className="right-side-content-header">
        {user.length !== 0 && (
          <UserCardMessages user={user}>
            <RiDeleteBin6Fill
              style={{ color: "salmon" }}
              onClick={handleDeleteAllMsgs}
            />
          </UserCardMessages>
        )}
      </div>

      <div className="right-side-content-messages">
        <div className="right-side-content-messages-chatbox">
          {message.data
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((msg) => (
              <div
                key={msg._id}
                ref={refDisplay}
                className={
                  msg.sender === auth.user._id
                    ? "right-side-content-messages-ours"
                    : "right-side-content-messages-other"
                }
              >
                <MessageDisplay
                  user={msg.sender === auth.user._id ? auth.user : user}
                  msg={msg}
                />
                {msg.sender === auth.user._id && (
                  <RiDeleteBin6Fill
                    className="delete-message-chat"
                    onClick={() => handleDeleteMsg(msg)}
                    style={{ color: "salmon" }}
                  />
                )}
              </div>
            ))}

          {loadMedia && (
            <div className="right-side-content-loading-icon">
              <img src={loadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>

      <div
        className="right-side-content-input-msg-mediadiv"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.length > 0 &&
          media.map((item, index) => (
            <div
              className="right-side-content-input-msg-media-divitem"
              key={index}
            >
              {item.type.match(/video/i)
                ? videoshow(URL.createObjectURL(item))
                : imageshow(URL.createObjectURL(item))}
              <span
                className="right-side-content-input-msg-media-divitem-delete"
                onClick={() => deleteimage(index)}
              >
                {" "}
                x{" "}
              </span>
            </div>
          ))}
      </div>

      <form className="right-side-content-input" onSubmit={handleSubmit}>
        <div className="right-side-content-input-file-upload">
          <button
            className="right-side-content-input-btn"
            onClick={handleuploadinput}
          >
            {" "}
            <MdOutlineAttachFile />{" "}
          </button>
          <input
            style={{ display: "none" }}
            type="file"
            id="fileuploadmsg"
            multiple
            accept="image/*, video/*"
            onChange={uploadmedia}
          />
        </div>
        <input
          className="right-side-content-input-text"
          type="text"
          placeholder="type the message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          type="submit"
          className="right-side-content-input-btn"
          disabled={text || media.length !== 0 ? false : true}
        >
          {" "}
          <IoSend />{" "}
        </button>
      </form>
    </div>
  );
};

export default RightSideMessage;
