import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="main-navigation">
      <Link className="link home" to="/">
        home
      </Link>
      <Link className="link whoiam" to="/whoiam">
        who i am
      </Link>
      <Link className="link whatido" to="/whatido">
        what i do
      </Link>
      <Link className="link talktome" to="/talktome">
        talk to me
      </Link>
    </div>
  );
}

export default Header;
