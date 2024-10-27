export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "file not found");

  const isImage = file.type.startsWith("image/");
  const isVideo = file.type.startsWith("video/");

  if (isImage && file.size > 1024 * 1024)
    return (err = "image size should be less than 1 MB.");
  if (isVideo && file.size > 1024 * 1024 * 10)
    return (err = "video size should be less than 10 MB.");

  if (!isImage && !isVideo)
    return (err = "file format should be jpeg, png, or mp4");

  if (isImage && file.type !== "image/jpeg" && file.type !== "image/png")
    return (err = "image format should be jpeg or png");

  if (isVideo && file.type !== "video/mp4")
    return (err = "video format should be mp4");

  return err;
};

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;

export const imageUpload = async (images) => {
  const imgArr = [];

  const cloudinaryCredentials = CLOUDINARY_URL.split("@")[0].split("//")[1];
  const cloudName = CLOUDINARY_URL.split("@")[1];

  for (const item of images) {
    const formData = new FormData();

    // Append file (image or video)
    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }

    // Cloudinary upload preset and cloud name
    formData.append("upload_preset", "iuiqlvok");
    formData.append("cloud_name", cloudName);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, // 'auto' supports both images and videos
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (res.ok) {
      imgArr.push({ public_id: data.public_id, secure_url: data.secure_url });
    } else {
      console.error("Cloudinary upload failed:", data);
      throw new Error(data.error.message);
    }
  }

  return imgArr; // Return array of uploaded medias
};
