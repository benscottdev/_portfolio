import React from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Header() {
  const handleHover = (e) => {
    const links = e.currentTarget.querySelectorAll(".link");
    gsap.to(links, {
      y: "-23px",
      duration: 0.2,
    });
  };

  const handleLeave = (e) => {
    const links = e.currentTarget.querySelectorAll(".link");
    gsap.to(links, {
      y: "0",
      duration: 0.2,
    });
  };

  return (
    <div className="main-navigation">
      <div className="wrapper">
        <div className="homeLink">
          <Link className=" home linkWrapper" to="/" onMouseOver={handleHover} onMouseOut={handleLeave}>
            <span className="link">home</span>
            <span className="link bottomLink">home</span>
          </Link>
        </div>

        <div className="whoLink">
          <Link className=" whoiam linkWrapper" to="/whoiam" onMouseOver={handleHover} onMouseOut={handleLeave}>
            <span className="link">who</span>
            <span className="link bottomLink">am I </span>
          </Link>
        </div>

        <div className="whatLink">
          <a className=" whatido linkWrapper" to="/whatido" onMouseOver={handleHover} onMouseOut={handleLeave}>
            <span className="link">what</span>
            <span className="link bottomLink">i do</span>
          </a>
        </div>

        <div className="talkLink">
          <Link className=" talktome linkWrapper" to="/talktome" onMouseOver={handleHover} onMouseOut={handleLeave}>
            <span className="link">chat</span>
            <span className="link bottomLink">with me</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
