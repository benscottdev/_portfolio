import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import LiveClock from "./LiveClock";

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

  const togglePage = () => {
    const whatIDoPage = document.querySelector(".whatIDoPage");
    const openTl = gsap.timeline();

    if (!whatIDoPage.classList.contains("active")) {
      whatIDoPage.classList.add("active");
      openTl.to(whatIDoPage, {
        display: "block",
      });

      openTl.to(
        whatIDoPage,
        {
          opacity: 1,
          duration: 0.8,
        },
        "-=0.6"
      );
    }
  };

  const toggleClose = (e) => {
    const whatIDoPage = document.querySelector(".whatIDoPage");
    e.preventDefault();
    if (whatIDoPage.classList.contains("active")) {
      const closeTl = gsap.timeline();
      whatIDoPage.classList.remove("active");
      closeTl.to(whatIDoPage, {
        opacity: 0,
        duration: 0.3,
      });
      closeTl.to(whatIDoPage, {
        display: "none",
      });
    }
  };

  const toggleMenu = () => {
    const headerWrapper = document.querySelector(".wrapper");
    const headerLinks = document.querySelectorAll(".headerItem");
    const hamOne = document.getElementById("ham1");
    const hamTwo = document.getElementById("ham2");

    if (headerWrapper.classList.contains("active")) {
      const closeTl = gsap.timeline();
      headerWrapper.classList.remove("active");
      headerLinks.forEach((item) => {
        closeTl.to(item, {
          opacity: 0,
          y: -10,
          duration: 0.1,
          ease: "power2.in",
        });
      });
      gsap.to(hamOne, {
        marginBottom: 10,
        rotate: 0,
      });
      gsap.to(hamTwo, {
        rotate: 0,
      });

      closeTl.to(headerWrapper, {
        autoAlpha: 0,
        duration: 0.4,
        height: "0px",
      });
    } else if (!headerWrapper.classList.contains("active")) {
      const openTl = gsap.timeline();
      headerWrapper.classList.add("active");

      gsap.to(hamOne, {
        marginBottom: 20,
        rotate: 45,
      });
      gsap.to(hamTwo, {
        rotate: -45,
      });
      openTl.fromTo(
        headerWrapper,
        { height: "0px" },
        {
          autoAlpha: 1,
          opacity: 1,
          height: "400px",
          duration: 0.7,
        }
      );

      headerLinks.forEach((item) => {
        openTl.fromTo(
          item,
          { y: 5, opacity: 0 },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          }
        );
      });
    }
  };

  return (
    <div className="main-navigation">
      <div className="hamburger" onClick={toggleMenu}>
        <span id="ham1"></span>
        <span id="ham2"></span>
      </div>

      <div className="wrapper">
        <div className="homeLink">
          <Link className=" home linkWrapper headerItem" to="/" onMouseOver={handleHover} onMouseOut={handleLeave} onClick={toggleClose}>
            <span className="link">home</span>
            <span className="link bottomLink">home</span>
          </Link>
        </div>

        <div className="whoLink">
          <Link className=" whoiam linkWrapper headerItem" to="/whoiam" onMouseOver={handleHover} onMouseOut={handleLeave} onClick={toggleClose}>
            <span className="link">who am i</span>
            <span className="link bottomLink">who am i</span>
          </Link>
        </div>

        <div className="whatLink">
          <Link className=" whatido linkWrapper headerItem" to="/whatido" onMouseOver={handleHover} onMouseOut={handleLeave} onClick={togglePage}>
            <span className="link">what i do</span>
            <span className="link bottomLink">what i do</span>
          </Link>
        </div>

        <div className="talkLink">
          <Link className=" talktome linkWrapper headerItem" to="/talktome" onMouseOver={handleHover} onMouseOut={handleLeave} onClick={toggleClose}>
            <span className="link">talk</span>
            <span className="link bottomLink">talk</span>
          </Link>
        </div>

        <div className="info">
          <div className="clock headerItem">
            <p>AUSTRALIA/SYD:</p>
            <LiveClock />
          </div>

          <div className="freelance headerItem">
            <span className="availableIcon"></span>
            <p>Available for Freelance</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
