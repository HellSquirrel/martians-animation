import React from "react";
import { ReactComponent as Cookie } from "./images/unicorns/simple-cookie-min-wo-script.svg";
import CookieWithFriends from "./images/unicorns/cookie-with-friends.svg";
const SVGCompression = () => {
  return (
    <div>
      <Cookie />
      <img src={CookieWithFriends}/>
      <div style={{ position: "relative" }}>
        <svg viewBox="0 0 10 10" fill="red">
          <rect x="0" y="5" width="5" height="5" fill="blue" fillOpacity="0.5" style={{ position: "absolute", top: "0", left: "0" }}/>
        </svg>
          <svg viewBox="0 0 10 10" style={{ position: "absolute", top: "0", left: "0" }}>
              <rect  x="0.01" y="5" width="5" height="5" />
          </svg>
      </div>
    </div>
  );
};

export default SVGCompression;
