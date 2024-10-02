import { postDataApi } from "../../utils/fetchDataApi";
import { ALERT_TYPES } from "./alertActions";
import valid from "../../utils/valid";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await postDataApi("login", data);

    localStorage.setItem("login", true);

    // Dispatch authentication success action with token and user
    dispatch({
      type: "AUTH",
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    //const res = await postDataApi("login", data);

    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
      dispatch({
        type: ALERT_TYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    } else {
      console.log(error.message); // Fallback if error.response is not available
    }
  }
};

export const refreshToken = () => async (dispatch) => {
  const login = localStorage.getItem("login");
  if (login) {
    dispatch({
      type: "ALERT",
      payload: {
        loading: true,
      },
    });

    try {
      // Send refresh token request
      const res = await postDataApi("refresh_token");

      // Dispatch token and userdata to authReducder
      dispatch({
        type: "AUTH",
        payload: {
          token: res.data.accessToken,
          user: res.data.user,
        },
      });

      // Success message
      dispatch({
        type: "ALERT",
        payload: {
          success: res?.data?.message,
        },
      });
    } catch (error) {
      // Dispatch error to ALERT reducer
      //  console.error(error);
      dispatch({
        type: "ALERT",
        payload: {
          error: error.response ? error.response.data.message : error.message,
        },
      });
    }
  }
};

export const register = (data) => async (dispatch) => {
  try {
    const check = valid(data);
    if (check.errLength > 0) {
      dispatch({
        type: "ALERT",
        payload: check.errMsg,
      });
    }
    dispatch({
      type: "ALERT",
      payload: { loading: true },
    });

    const res = await postDataApi("register", data);
    localStorage.setItem("login", true);
    console.log("ACCESS TOKEN ON REGISTER", res.data.accessToken);

    dispatch({
      type: "AUTH",
      payload: {
        token: res.data.accessToken,
        user: res.data.user,
      },
    });

    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "ALERT",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("login");
    await postDataApi("logout");
    window.location.href = "/";
  } catch (error) {
    console.log(error);
    dispatch({
      type: "ALERT",
      payload: {
        error: error.response.data.message,
      },
    });
  }
};
