import React, { forwardRef, useEffect } from "react";

const WhoAmI = forwardRef((__, ref) => {
  useEffect(() => {
    const portrait = document.querySelector(".portrait");

    portrait.addEventListener("click", () => {
      portrait.style.border = "20px solid black";
    });
  }, []);

  return (
    <div className="whoAmIContainer" ref={ref}>
      <div className="third">
        <img className="portrait" src="./src/static/Ben_Ghibli.png" alt="" />
      </div>
      <div className="third">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <br />
          <br />
          Ipsum qui quaerat nemo labore dolorem aut nobis, adipisci et eius excepturi aliquam, sequi illum veniam debitis ad molestiae cupiditate ex commodi. Ipsum qui quaerat nemo labore dolorem aut nobis, adipisci et eius excepturi aliquam.
          <br />
          <br />
          Sequi illum veniam debitis ad molestiae cupiditate ex commodi.
        </p>
      </div>
      <div className="third no-border">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </div>
  );
});

export default WhoAmI;
