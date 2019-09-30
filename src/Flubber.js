import React, { useEffect, useRef } from "react";
import { interpolateAll } from "flubber";
import { ReactComponent as Ruby } from "./images/unicorns/ruby.svg";
import { ReactComponent as Rust } from "./images/unicorns/rust.svg";

let i = 1;
const draw = (paths, interpolators) => t => {
  paths.forEach((p, i) => p.setAttribute("d", interpolators[i](t)));
  if (t > 1 || t < 0) {
    i = i * -1;
  }
  requestAnimationFrame(() => draw(paths, interpolators)(t + i * 0.015));
};
const SVGCompression = () => {
  const ruby = useRef(null);
  const rust = useRef(null);
  useEffect(() => {
    const rubyEls = [...ruby.current.querySelectorAll("path")];
    const from = [...rubyEls].map(p => p.getAttribute("d"));
    const rustEls = [...rust.current.querySelectorAll("path")];
    const to = [...rustEls].map(p => p.getAttribute("d"));
    const interpolators = interpolateAll(from, to, { maxSegmentLength: 1 });
    draw(rubyEls, interpolators)(0);
  }, []);
  return (
    <div>
      <Ruby ref={ruby} style={{ margin: 40 }} width="400" />
      <Rust ref={rust} style={{ display: "none" }} />
    </div>
  );
};

export default SVGCompression;
