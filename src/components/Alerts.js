import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Toast from "./Toast";

const Alerts = () => {
  // const { auth, alert } = useSelector((state) => state);
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const close = () => {
    dispatch({
      type: "ALERT",
      payload: {},
    });
  };

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && (
        <Toast
          msg={{ title: "Error", body: alert.error }}
          bgColor="rgb(247, 49, 49)"
          handleShow={close}
        />
      )}

      {alert.success && (
        <Toast
          msg={{ title: "Success", body: alert.success }}
          bgColor="rgb(68, 240, 68)"
          handleShow={close}
        />
      )}
    </div>
  );
};

export default Alerts;
