import React from "react";
import { ClockLoader } from "react-spinners";
const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClockLoader color="black" />
    </div>
  );
};

export default Loading;
