import React from "react";

function Loader({ ref }) {
  return (
    <div ref={ref} className="loader">
      <div className="progressBar">
        <h1></h1>
      </div>
    </div>
  );
}

export default Loader;
