import axios from "axios";

// const baseURL = "http://localhost:5000/api";
// const baseURL = "https://social-media-backend-sra9.onrender.com/api";
const baseURL =
  `${process.env.REACT_APP_BASE_URL}/api` || "http://localhost:5000/api";

export const getDataApi = async (url, token) => {
  const response = await axios.get(`${baseURL}/${url}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });
  return response;
};

export const postDataApi = async (url, post, token) => {
  try {
    const response = await axios.post(`${baseURL}/${url}`, post, {
      headers: { Authorization: token ? token : "" },
      withCredentials: true, // Allow cookies to be sent with the request
    });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const putDataApi = async (url, post, token) => {
  const response = await axios.put(`${baseURL}/${url}`, post, {
    headers: { Authorization: token },
    withCredentials: true,
  });
  return response;
};

export const patchDataApi = async (url, post, token) => {
  const response = await axios.patch(`${baseURL}/${url}`, post, {
    headers: { Authorization: token },
    withCredentials: true,
  });
  return response;
};

export const deleteDataApi = async (url, token) => {
  const response = await axios.delete(`${baseURL}/${url}`, {
    headers: { Authorization: token },
    withCredentials: true,
  });
  return response;
};
