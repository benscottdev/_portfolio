import React from "react";

function Loader({ ref }) {
  return (
    <div ref={ref} className="loader">
      <div className="progressBar"></div>
      <h1 className="percentageLoaded">0%</h1>
    </div>
  );
}

export default Loader;
