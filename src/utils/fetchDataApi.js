import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "https://social-media-backend-sra9.onrender.com/api";

export const getDataApi = async (url, token) => {
  const response = await axios.get(`${baseURL}/${url}`, {
    // const response = await axios.get(
    // `https://social-media-backend-sra9.onrender.com/api/${url}`,
    // {
    headers: { Authorization: token },
    withCredentials: true,
  });
  return response;
};

export const postDataApi = async (url, post, token) => {
  try {
    const response = await axios.post(
      // `https://social-media-backend-sra9.onrender.com/api/${url}`,
      `${baseURL}/${url}`,
      post,
      {
        headers: { Authorization: token ? token : "" },
        withCredentials: true, // Allow cookies to be sent with the request
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putDataApi = async (url, post, token) => {
  const response = await axios.put(
    // `https://social-media-backend-sra9.onrender.com/api/${url}`,
    `${baseURL}/${url}`,
    post,
    {
      headers: { Authorization: token },
      withCredentials: true,
    }
  );
  return response;
};

export const patchDataApi = async (url, post, token) => {
  const response = await axios.patch(
    // `https://social-media-backend-sra9.onrender.com/api/${url}`,
    `${baseURL}/${url}`,
    post,
    {
      headers: { Authorization: token },
      withCredentials: true,
    }
  );
  return response;
};

export const deleteDataApi = async (url, token) => {
  const response = await axios.delete(
    // `https://social-media-backend-sra9.onrender.com/api/${url}`,
    `${baseURL}/${url}`,
    {
      headers: { Authorization: token },
      withCredentials: true,
    }
  );
  return response;
};
