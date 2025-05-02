import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Header() {
  const handleHover = (e) => {
    const links = e.currentTarget.querySelectorAll(".link");
    gsap.to(links, {
      y: "-23px",
      duration: 0.3,
    });
  };

  const handleLeave = (e) => {
    const links = e.currentTarget.querySelectorAll(".link");
    gsap.to(links, {
      y: "0",
      duration: 0.3,
    });
  };

  return (
    <div className="main-navigation">
      <div className="homeLink">
        <Link className=" home linkWrapper" to="/" onMouseOver={handleHover} onMouseOut={handleLeave}>
          <span className="link">home</span>
          <span className="link bottomLink">home</span>
        </Link>
      </div>

      <div className="whoLink">
        <Link className=" whoiam linkWrapper" to="/whoiam" onMouseOver={handleHover} onMouseOut={handleLeave}>
          <span className="link">who i am</span>
          <span className="link bottomLink">who i am</span>
        </Link>
      </div>

      <div className="whatLink">
        <Link className=" whatido linkWrapper" to="/whatido" onMouseOver={handleHover} onMouseOut={handleLeave}>
          <span className="link">what i do</span>
          <span className="link bottomLink">what i do</span>
        </Link>
      </div>

      <div className="talkLink">
        <Link className=" talktome linkWrapper" to="/talktome" onMouseOver={handleHover} onMouseOut={handleLeave}>
          <span className="link">talk</span>
          <span className="link bottomLink">talk</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
