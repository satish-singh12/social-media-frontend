import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCardMessages from "./UserCardMessages";
import "./styles/leftSideMessage.css";
import { getDataApi } from "../../utils/fetchDataApi";
import { AddUser, getConversations } from "../../redux/actions/messageActions";
import { useNavigate } from "react-router-dom";
import { MdFiberManualRecord } from "react-icons/md";

const LeftSideMessage = () => {
  const [search, setSearch] = useState("");
  const [searchUser, setSearchUser] = useState([]);
  const [load, setLoad] = useState(false);
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch conversations on first load
  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations(auth));
  }, [dispatch, auth, message.firstLoad]);

  // Handle user search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setSearchUser(res.data?.users || []); // Handle case where no users are found
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response?.data?.msg || "An error occurred",
        },
      });
    } finally {
      setLoad(false);
    }
  };

  // Add user to chat and navigate to chat window
  const handleAddChat = (user) => {
    setSearch("");
    setSearchUser([]);
    dispatch(AddUser({ user, message }));
    navigate(`/message/${user._id}`);
  };

  return (
    <div className="left-side-content">
      <div className="left-side-content-search">
        <input
          className="left-side-content-search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find user for chat"
        />
        <button
          className="left-side-content-search-button"
          onClick={handleSearch}
          disabled={load}
        >
          Search
        </button>
      </div>

      <div className="left-side-content-user-list">
        {load && <p>Loading...</p>}
        {searchUser.length !== 0 ? (
          searchUser.map((user) => (
            <div onClick={() => handleAddChat(user)} key={user._id}>
              <UserCardMessages user={user} />
            </div>
          ))
        ) : search && !load ? (
          <p>No users found for your search.</p>
        ) : message.users && message.users.length > 0 ? (
          message.users.map((user) => (
            <div onClick={() => handleAddChat(user)} key={user._id}>
              <UserCardMessages user={user} msg={true}>
                {message?.onlineUsers.includes(user._id) && (
                  <MdFiberManualRecord
                    style={{ color: "yellow", fontSize: "20px" }}
                  />
                )}
              </UserCardMessages>
            </div>
          ))
        ) : (
          <p>No conversations found.</p>
        )}
      </div>
    </div>
  );
};

export default LeftSideMessage;
