import React from "react";
import { useSelector } from "react-redux";
import GlobalCard from "../ProfileComponents/GlobalCard";

const HomeLeft = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <GlobalCard user={auth.user} />
    </div>
  );
};

export default HomeLeft;
