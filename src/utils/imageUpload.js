export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "file not found");
  if (file.size > 1024 * 1024)
    return (err = "file size should be less than 1 mb.");
  if (file.type !== "image/jpeg" && file.type !== "image/png")
    return (err = "file format should be jpeg or png");
};

const CLOUDINARY_URL = process.env.REACT_APP_CLOUDINARY_URL;

export const imageUpload = async (images) => {
  const imgArr = [];

  // Parsing Cloudinary credentials from the URL
  const cloudinaryCredentials = CLOUDINARY_URL.split("@")[0].split("//")[1];
  const [apiKey, apiSecret] = cloudinaryCredentials.split(":");
  const cloudName = CLOUDINARY_URL.split("@")[1];

  for (const item of images) {
    const formData = new FormData();
    if (item.camera) {
      formData.append("file", item.camera);
    } else {
      formData.append("file", item);
    }
    formData.append("upload_preset", "iuiqlvok");
    formData.append("cloud_name", cloudName); // Using cloud_name from URL

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
        // headers: {
        //   Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`, // Basic authentication with API key and secret
        // },
      }
    );

    const data = await res.json();

    if (res.ok) {
      imgArr.push({ public_id: data.public_id, secure_url: data.secure_url }); // Store uploaded image data
    } else {
      console.error("Cloudinary upload failed:", data);
      throw new Error(data.error.message);
    }
  }

  return imgArr; // Return array of uploaded images
};

//   imgArr.push({ public_id: data.public_id, secure_url: data.secure_url }); // Store uploaded image data
//   // console.log(data);
// }
// return imgArr; // Return array of uploaded images
// };
