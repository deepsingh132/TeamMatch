import React, { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import createSuccess from "../../anim/check.json";
import "./success.css"; // import the success.css file

const Success = ({ msg }) => {
  const lottieRef = useRef();

  useEffect(() => {
    lottieRef.current.setSpeed(1.8);
  }, []);

  return (
    <div className="successOverlay">
      <div className="successCard">
        {" "}
        <Lottie
          animationData={createSuccess}
          style={{ width: "100%", height: "auto" }}
          loop={false}
          autoplay={true}
          lottieRef={lottieRef}
        />
        <h2>{msg}</h2>
      </div>
    </div>
  );
};

export default Success;
