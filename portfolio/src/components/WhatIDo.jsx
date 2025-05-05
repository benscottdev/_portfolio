import React, { forwardRef } from "react";

const WhatIDo = forwardRef((__, ref) => {
  return (
    <div className="whatIDoContainer" ref={ref}>
      <p>WHAT I DO</p>
    </div>
  );
});

export default WhatIDo;
