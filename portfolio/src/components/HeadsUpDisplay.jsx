import React from "react";

function HeadsUpDisplay({ ref }) {
  return (
    <div className="headsUpContainer">
      <span ref={ref} className="instruction">
        TURN ON THE LIGHTS
      </span>
    </div>
  );
}

export default HeadsUpDisplay;
