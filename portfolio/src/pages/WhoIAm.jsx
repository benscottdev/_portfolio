import React, { forwardRef } from "react";

const WhoAmI = forwardRef((props, ref) => {
  return (
    <div className="whoAmIContainer" ref={ref}>
      <div className="half">
        <img src="./src/static/Ben_Ghibli.jpg" alt="" />
      </div>
      <div className="half">
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
      <div className="half">
        <p>Who am I? I'm a developer, designer, and dreamer.</p>
      </div>
    </div>
  );
});

export default WhoAmI;
