import React from "react";

function Loader({ refs }) {
  return (
    <div ref={refs.loaderRef} className="loader">
      <div ref={refs.progressRef} className="progressBar"></div>
      <h1 ref={refs.progressPercentRef} className="percentageLoaded">
        0%
      </h1>
    </div>
  );
}

export default Loader;
