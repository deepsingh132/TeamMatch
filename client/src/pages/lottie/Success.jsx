import React from "react";
import Lottie from "lottie-react";
import createSuccess from "../../anim/check.json";

const Success = () => {
  return (
        <Lottie
          animationData={createSuccess}
          style={{ width: "100%", height: "auto" }}
          loop={false}
          autoplay={true}
        />);
};

export default Success;
