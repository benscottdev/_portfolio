import React, { forwardRef } from "react";

const WhatIDo = forwardRef((__, ref) => {
  return (
    <div className="whatIDoContainer" ref={ref}>
      <h1>WHAT I DO</h1>
    </div>
  );
});

export default WhatIDo;
