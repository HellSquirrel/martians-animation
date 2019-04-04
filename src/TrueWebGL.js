import React, { useRef } from "react";
import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";
import math from "mathjs";

const width = 400;
const height = 400;

const createShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

const createProgram = (gl, vertexShader, fragmentShader) => {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};

const nRandom = (n, min = 0, max = 0) =>
  [...Array(n)].map(() => math.random(min, max));

const drawTriangle = (gl, colorLoc) => {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(nRandom(6, -1, 1)),
    gl.STATIC_DRAW
  );
  gl.uniform4f(colorLoc, Math.random(), Math.random(), Math.random(), 1);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

const init = canvas => {
  // init
  const gl = canvas.getContext("webgl2");
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const colorLocation = gl.getUniformLocation(program, "u_color");

  // supply data

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // read data
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);
  gl.enableVertexAttribArray(positionAttributeLocation);
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  // prepare to draw
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.bindVertexArray(vertexArray);

  nRandom(10).forEach(() => drawTriangle(gl, colorLocation));
};

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
