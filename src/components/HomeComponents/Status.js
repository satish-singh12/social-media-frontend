import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import "../../styles/status.css";
import { createPost, updatePost } from "../../redux/actions/postActions";
import { ALERT_TYPES } from "../../redux/actions/alertActions";

const Status = () => {
  const auth = useSelector((state) => state.auth);
  const status = useSelector((state) => state.status);

  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");

  const refVideo = useRef();
  const refCanvas = useRef();

  useEffect(() => {
    if (status.edit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  // ===========
  // Function to convert base64 data URL to Blob
  const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // Extract MIME type (e.g., 'image/png')
    const bstr = atob(arr[1]); // Base64 decode
    let n = bstr.length;
    const u8arr = new Uint8Array(n); // Create Uint8Array to store binary data
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n); // Convert characters to binary
    }
    return new Blob([u8arr], { type: mime }); // Return Blob with correct MIME type
  };

  // =============

  const uploadImages = (e) => {
    const files = [...e.target.files];
    let err;
    let imagesArr = [];

    files.forEach((file) => {
      if (!file) return (err = "no file found");
      if (file.size > 1024 * 1024 * 5) return (err = "File is too long");
      // if (file.type !== "image/jpeg" && file.type !== "image/png")
      // return (err = "Invalid format");
      return imagesArr.push(file);
    });

    if (err) dispatch({ type: "ALERT", payload: { error: err } });

    setImages((prevImages) => {
      return [...prevImages, ...imagesArr];
    });
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
    const dataURL = refCanvas.current.toDataURL(); // Base64 encoded string (data URL)
    const blob = dataURLtoBlob(dataURL); // Convert base64 to Blob

    setImages([...images, blob]); // Append Blob object to images array
  };

  const handleStreamStop = () => {
    tracks && tracks.stop(); // Only stop if tracks exists
    setStream(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({ type: "ALERT", payload: { error: "Add your image" } });

    if (status.edit) {
      dispatch(updatePost({ content, images, auth, status }));
      dispatch({ type: ALERT_TYPES.STATUS, payload: { edit: false } });
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
    dispatch({ type: ALERT_TYPES.STATUS, payload: { edit: false } });
  };

  const imagesShow = (src) => {
    return (
      <>
        <img src={src} alt="" className="status-show-images-middle" />
      </>
    );
  };

  return (
    <div className={status.edit ? "edit-status" : "status"}>
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
                  {image?.camera ? (
                    imagesShow(image.camera)
                  ) : image?.secure_url ? (
                    image.secure_url.match(/video/i) ? (
                      <video
                        controls
                        src={image.secure_url} // Use the existing URL for uploaded videos
                        className="status-show-images-middle"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      imagesShow(image.secure_url) // Use the existing URL for uploaded images
                    )
                  ) : (
                    <>
                      {console.log("image", image)}
                      {/* Only URL.createObjectURL() for new file objects */}
                      {image?.type?.match(/video/i) ? (
                        <video
                          controls
                          src={URL.createObjectURL(image)} // For local video files
                          className="status-show-images-middle"
                        />
                      ) : (
                        imagesShow(URL.createObjectURL(image)) // For new local image files
                      )}
                    </>
                  )}
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
