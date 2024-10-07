import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import "../styles/status.css";
import { createPost } from "../redux/actions/postActions";

const Status = () => {
  // const {auth} = useSelector((state) => state);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const refVideo = useRef();
  const refCanvas = useRef();

  const uploadImages = (e) => {
    const files = [...e.target.files];
    let err;
    let imagesArr = [];

    files.forEach((file) => {
      if (!file) return (err = "no file found");
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Invalid format");
      return imagesArr.push(file);
    });

    if (err) dispatch({ type: "ALERT", payload: { error: err } });

    // setImages([...images, imagesArr]);
    setImages((prevImages) => [...prevImages, ...imagesArr]);

    console.log(images);
  };

  const handleDeleteImage = (inde) => {
    const newArrImage = [...images];
    newArrImage.splice(inde, 1);
    setImages(newArrImage);
  };

  const handleUploadInput = () => {
    const imageUploadFun = document.getElementById("post-upload");
    imageUploadFun.click();
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          refVideo.current.srcObject = stream;
          refVideo.current.play();
          const track = stream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCameraImage = () => {
    const width = refVideo.current.clientWidth;
    const height = refVideo.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);
    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(refVideo.current, 0, 0, width, height);
    const URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
    console.log(images);
  };

  const handleStreamStop = () => {
    tracks && tracks.stop(); // Only stop if tracks exists
    setStream(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      dispatch({ type: "ALERT", payload: { error: "Add your image" } });
    } else {
      dispatch(createPost({ content, images, auth }));
    }
    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setContent("");
    setImages([]);
    if (tracks) tracks.stop();
  };

  return (
    <div className="status">
      <form onSubmit={handleSubmit}>
        <div className="status-header">
          <img src={auth.user && auth.user.avatar} alt="" />
          <h4>Status</h4>
        </div>
        <div className="status-middle">
          <textarea
            typeof="text"
            value={content}
            rows="5"
            cols="10"
            placeholder="Share your thoughts"
            onChange={(e) => setContent(e.target.value)}
          />
          <small>{content?.length}</small>
          <div className="status-show-images-middle">
            {images &&
              images.map((image, index) => (
                <div
                  className="status-show-middle-images-container"
                  key={index}
                >
                  <img
                    className="status-show-images"
                    src={
                      image.camera ? image.camera : URL.createObjectURL(image)
                    }
                    alt=""
                  />
                  <span
                    className="status-show-middle-images-delete"
                    onClick={() => handleDeleteImage(index)}
                  >
                    X
                  </span>
                </div>
              ))}
          </div>
        </div>

        {stream && (
          <div className="status-stream">
            <video
              autoPlay
              muted
              ref={refVideo}
              style={{ height: "250px", width: "100%" }}
            />
            <span
              className="status-show-middle-stream-stop"
              onClick={handleStreamStop}
            >
              {" "}
              X{" "}
            </span>
            <canvas ref={refCanvas} style={{ display: "none" }} />
          </div>
        )}

        <div className="status-footer">
          <div className="status-footer-right">
            {stream ? (
              <MdInsertPhoto
                onClick={handleUploadInput}
                onClick={handleCameraImage}
              />
            ) : (
              <>
                <FaCamera onClick={handleStream} />
                <MdInsertPhoto onClick={handleUploadInput} />
              </>
            )}
            <span>
              <input
                style={{ display: "none" }}
                type="file"
                id="post-upload"
                onChange={uploadImages}
                multiple
                accept="image/*"
              />
            </span>
          </div>
          <div className="status-footer-left">
            <button className="status-footer-discard" onClick={handleDiscard}>
              Discard
            </button>
            <button className="status-footer-left-create" type="submit">
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Status;
