import React, { forwardRef, useEffect } from "react";
import gsap from "gsap";

const WhatIDo = forwardRef((__, ref) => {
  const handleHover = (e) => {
    e.target.style.color = "orangered";
    e.target.style.scale = 1.4;
  };

  const handleLeave = (e) => {
    e.target.style.color = "#9498a1";
    e.target.style.scale = 1.1;
  };

  return (
    <div className="whatIDo" ref={ref}>
      <div className="work">
        <div className="workWrapper">
          <ul>
            <li class="workItem" onMouseOver={handleHover} onMouseLeave={handleLeave}>
              Songworks
            </li>
            <li class="workItem" onMouseOver={handleHover} onMouseLeave={handleLeave}>
              Claudia's
            </li>
            <li class="workItem" onMouseOver={handleHover} onMouseLeave={handleLeave}>
              Steph McCarthy
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export default WhatIDo;
