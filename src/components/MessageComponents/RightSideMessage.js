import React, { useEffect, useRef, useState } from "react";
import UserCardMessages from "./UserCardMessages";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageDisplay from "./MessageDisplay";
import "./styles/rightSideMessage.css";
import { IoSend } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { imageUpload } from "../../utils/imageUpload";
import {
  addMessage,
  getMessages,
  deleteMessage,
  MESSAGE_TYPE,
} from "../../redux/actions/messageActions";
import loadIcon from "../../images/loading.gif";

const RightSideMessage = () => {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [text, setText] = useState("");
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);
  const { auth, message, socket } = useSelector((state) => state);

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id);
    if (newData) {
      setUser(newData);
    }
  }, [message.users, id]);

  const uploadmedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let mediaArr = [];
    console.log(files);
    files.forEach((file) => {
      if (!file) return (err = "no file found");
      if (file.size > 1024 * 1024 * 5) return (err = "file is too long");

      return mediaArr.push(file);
    });
    if (err) {
      dispatch({ type: "ALERT", payload: { error: err } });
    }
    setMedia([...media, ...mediaArr]);
    console.log(media);
  };

  const handleuploadinput = (e) => {
    e.preventDefault();
    const imagemedia = document.getElementById("fileuploadmsg");
    imagemedia.click();
  };

  const imageshow = (src) => {
    return (
      <>
        <img src={src} alt="" className="statusmsg-middleimages" />
      </>
    );
  };
  const handleDeleteMsg = (data) => {
    dispatch(deleteMessage({ message, data, auth }));
  };
  const videoshow = (src) => {
    return (
      <>
        <video controls src={src} alt="" className="statusmsg-middleimages" />
      </>
    );
  };
  const deleteimage = (inde) => {
    const newArrimage = [...media];
    newArrimage.splice(inde, 1);
    setMedia(newArrimage);
  };
  const refDisplay = useRef();

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
    setText(" ");
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
    <div className="Rightsidecontent">
      <div className="rightsidecontentheader">
        {user.length !== 0 && (
          <UserCardMessages user={user}>
            <RiDeleteBin6Fill style={{ color: "salmon" }} />
          </UserCardMessages>
        )}
      </div>

      <form className="rightsidecontentinput" onSubmit={handleSubmit}>
        <input
          className="rightsidecontentinputtext"
          type="text"
          placeholder="type the message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="rightsidecontentinputfileupload">
          <button
            className="rightsidecontentinputbtn"
            onClick={handleuploadinput}
          >
            {" "}
            <FaImages />{" "}
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
        <button
          type="submit"
          className="rightsidecontentinputbtn"
          disabled={text || media.length !== 0 ? false : true}
        >
          {" "}
          <IoSend />{" "}
        </button>
      </form>
      <div
        className="rightsidecontentinputmsg-mediadiv"
        style={{ display: media.length > 0 ? "grid" : "none" }}
      >
        {media.length > 0 &&
          media.map((item, index) => (
            <div className="rightsidecontentinputmsg-mediadivitem" key={index}>
              {item.type.match(/video/i)
                ? videoshow(URL.createObjectURL(item))
                : imageshow(URL.createObjectURL(item))}
              <span
                className="rightsidecontentinputmsg-mediadivitemdelete"
                onClick={() => deleteimage(index)}
              >
                {" "}
                x{" "}
              </span>
            </div>
          ))}
      </div>
      <div className="rightsidecontentmessages">
        <div className="rightsidecontentmessages-chatbox" ref={refDisplay}>
          {message.data.map((msg, index) => (
            <div key={index} ref={refDisplay}>
              {msg.sender !== auth.user._id && (
                <div className=" rightsidecontentmessagesother">
                  <MessageDisplay user={user} msg={msg} />
                </div>
              )}
              {msg.sender === auth.user._id && (
                <div className="rightsidecontentmessagesours">
                  <MessageDisplay user={auth.user} msg={msg} />
                  <RiDeleteBin6Fill
                    className="deletemessagechat"
                    onClick={() => handleDeleteMsg(msg)}
                    style={{ color: "salmon" }}
                  />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div>
              <img src={loadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSideMessage;
