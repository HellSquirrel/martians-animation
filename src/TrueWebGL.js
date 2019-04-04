import React, { useRef } from "react";
import classNames from "classnames/bind";
import cs from "./TrueWebGL.module.css";
import * as vertexShader from "./shaders/main.vert";
import * as fragmentShader from "./shaders/main.frag";

console.log(vertexShader, fragmentShader);

const cx = classNames.bind(cs);

const width = 400;
const height = 400;

const init = canvas => {};

const TrueWebGL = () => {
  const canvas = useRef(null);

  return (
    <React.Fragment>
      <button onClick={() => init(canvas.current)}>GO!</button>
      <canvas width={width} height={height} ref={canvas} />
    </React.Fragment>
  );
};

export default TrueWebGL;
