import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCardMessages from "./UserCardMessages";
import "./styles/leftSideMessage.css";
import { getDataApi } from "../../utils/fetchDataApi";
import { addUser } from "../../redux/actions/messageActions";
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

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataApi(`search?username=${search}`, auth.token);
      setSearchUser(res.data.users);
      setLoad(false);
    } catch (err) {
      dispatch({
        type: "ALERT",
        payload: {
          error: err.response.data.message,
        },
      });
    }
  };

  const handleAddChat = (user) => {
    setSearch("");
    setSearchUser([]);
    dispatch(addUser({ user, message }));
    navigate(`/message/${user._id}`);
  };

  return (
    <div className="left-side-message">
      <div className="left-side-message-content-search">
        <input
          type="text"
          className="left-side-message-content-search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search the user for chat"
        />
        <button
          className="left-side-message-content-search-button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className="left-side-message-content-user-list">
        {searchUser.length !== 0 ? (
          <>
            {searchUser.map((user) => (
              <div key={user._id} onClick={() => handleAddChat(user)}>
                <UserCardMessages user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users?.length > 0 &&
              message.users.map((user) => (
                <div key={user._id} onClick={() => handleAddChat(user)}>
                  <UserCardMessages user={user}>
                    <MdFiberManualRecord />
                  </UserCardMessages>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default LeftSideMessage;
