import axios from "axios";

export const getDataApi = async (url, token) => {
  const response = await axios.get(`http://localhost:5000/api/${url}`, {
    headers: { Authorization: token },
  });
  return response;
};

export const postDataApi = async (url, post, token) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/${url}`,
      post,
      {
        headers: { Authorization: token ? token : "" },
        withCredentials: true, // Allow cookies to be sent with the request
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error; // Rethrow or handle as needed
  }
};

export const putDataApi = async (url, post, token) => {
  const response = await axios.put(`http://localhost:5000/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return response;
};

export const patchDataApi = async (url, post, token) => {
  const response = await axios.patch(`http://localhost:5000/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return response;
};

export const deleteDataApi = async (url, token) => {
  const response = await axios.delete(`http://localhost:5000/api/${url}`, {
    headers: { Authorization: token },
  });
  return response;
};
