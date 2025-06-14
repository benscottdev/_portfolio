import React, { forwardRef, useEffect } from "react";

const WhoAmI = forwardRef((__, ref) => {
  return (
    <div className="whoAmIContainer" ref={ref}>
      <div className="whoAmIContainer" ref={ref}>
        <div className="half">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam facilis recusandae amet exercitationem assumenda. Hic, ducimus sapiente! Impedit, beatae. Perferendis ducimus quos nemo laudantium enim aperiam magni odio dignissimos maxime.
            <br />
            <br />
            Quisquam facilis recusandae amet exercitationem assumenda. Hic, ducimus sapiente! Impedit, beatae. Perferendis ducimus quos nemo laudantium enim aperiam magni odio dignissimos maxime.
          </p>
        </div>
      </div>
    </div>
  );
});

export default WhoAmI;
