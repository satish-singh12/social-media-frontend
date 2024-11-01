import { DeleteData } from "./alertActions";
import { getDataApi, patchDataApi } from "../../utils/fetchDataApi";
import { imageUpload } from "../../utils/imageUpload";
import { createNotification, removeNotification } from "./notificationActions";

export const PROFILE_TYPES = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FRIEND: "FRIEND",
  UNFRIEND: "UNFRIEND",
  GET_IDS: "GET_IDS",
  USERPOSTS: "USERPOSTS",
};

export const getProfileUsersData =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_IDS, payload: id });

    // Set loading to true before API call
    dispatch({
      type: PROFILE_TYPES.LOADING,
      payload: { loading: true },
    });

    try {
      // Fetch user and userposts data concurrently
      const [res, res1] = await Promise.all([
        getDataApi(`user/${id}`, auth.token),
        getDataApi(`userposts/${id}`, auth.token),
      ]);

      const user = res;
      const posts = res1;

      // Dispatch user data to state
      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: user.data, // User data
      });

      // Dispatch user posts data to state
      dispatch({
        type: PROFILE_TYPES.USERPOSTS,
        payload: { ...posts.data, _id: id, result: posts.result || 0 },
      });
    } catch (err) {
      // Check if err.response exists before accessing it
      const errorMessage = err.response
        ? err.response.data.message
        : "An error occurred. Please try again.";

      dispatch({
        type: "ALERT",
        payload: { error: errorMessage },
      });
    } finally {
      dispatch({
        type: PROFILE_TYPES.LOADING,
        payload: { loading: false },
      });
    }
  };

export const updatedProfile =
  ({ editData, avatar, auth }) =>
  async (dispatch) => {
    if (!editData.fullname)
      return dispatch({
        type: "ALERT",
        payload: { error: "Add your fullname" },
      });

    if (editData.fullname.length > 25)
      return dispatch({
        type: "ALERT",
        payload: {
          error: "Fullname should not greater than 25 characters..",
        },
      });

    if (editData.story.length > 200)
      return dispatch({
        type: "ALERT",
        payload: {
          error: "Story should not greater than 200 charaters..",
        },
      });

    try {
      let media;
      dispatch({ type: "ALERT", payload: { loading: true } });
      if (avatar) media = await imageUpload([avatar]);
      // console.log(avatar, media[0].secure_url);

      const res = await patchDataApi(
        `user/${auth?.user._id}`,
        {
          ...editData,
          avatar: media ? media[0].secure_url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: "AUTH",
        payload: {
          auth,
          user: {
            ...auth.user,
            ...editData,
            avatar: avatar ? media[0].secure_url : auth?.user?.avatar,
          },
        },
      });
      if (res && res.data) {
        dispatch({ type: "ALERT", payload: { loading: false } });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred";
      dispatch({
        type: "ALERT",
        payload: { error: errorMessage },
      });
    }
  };

export const resetPassword =
  ({ currentPassword, newPassword, auth }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "ALERT", payload: { loading: true } });

      const res = await patchDataApi(
        `user/${auth?.user._id}/reset_password`,
        { currentPassword, newPassword },
        auth.token
      );

      dispatch({ type: "ALERT", payload: { success: res.data.message } });
      dispatch({ type: "ALERT", payload: { loading: false } });
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response?.data?.message || "Password reset failed",
        },
      });
    }
  };

export const addFriends =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    const alreadyFriends = user.friends.some(
      (friend) => friend._id === auth.user._id
    );

    if (alreadyFriends) {
      return dispatch({
        type: "ALERT",
        payload: { error: "You are already friends with this user." },
      });
    }
    const newUser = { ...users, friends: [...user.friends, auth.user] };

    dispatch({
      type: PROFILE_TYPES.FRIEND,
      payload: newUser,
    });

    dispatch({
      type: "AUTH",
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      const res = await patchDataApi(
        `user/${user._id}/friend`,
        null,
        auth.token
      );
      socket.emit("addFriend", res.data.newUser);

      const msg = {
        id: auth.user._id,
        text: "add you as a friend",
        url: `/profile/${auth.user._id}`,
        recipients: [newUser._id],
      };
      dispatch(createNotification({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };

export const unFriends =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    // Remove auth.user from the user's friends list and newUser from auth.user's following list
    const updatedFriendsList = DeleteData(user.friends, auth.user._id);
    const updatedFollowingList = DeleteData(auth.user.following, user._id);

    const newUser = {
      ...users,
      friends: updatedFriendsList,
    };

    dispatch({
      type: PROFILE_TYPES.UNFRIEND,
      payload: newUser,
    });

    dispatch({
      type: "AUTH",
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: updatedFollowingList,
        },
      },
    });

    try {
      const res = await patchDataApi(
        `user/${user._id}/unfriend`,
        null,
        auth.token
      );
      socket.emit("unFriend", res.data.newUser);

      const msg = {
        id: auth.user._id,
        text: "unfriend you",
        url: `/profile/${auth.user._id}`,
        recipients: [newUser._id],
      };
      dispatch(removeNotification({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: { error: err.response.data.message },
      });
    }
  };
