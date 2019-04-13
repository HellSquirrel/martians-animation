import React, { useRef } from "react";
import vertexShaderSource from "./shaders/vert.glsl";
import fragmentShaderSource from "./shaders/frag.glsl";
import { nRandom } from "./utils/random";
import { drawRandomRect, createShader, createProgram } from "./utils/draw";
import martians from "./images/cat.jpg";

const width = 400;
const height = 400;

const setUpTextures = (gl, program, img) => {
  const texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
  const texCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0.0,
      0.0,
      1.0,
      0.0,
      0.0,
      1.0,
      0.0,
      1.0,
      1.0,
      0.0,
      1.0,
      1.0
    ]),
    gl.STATIC_DRAW
  );

  gl.enableVertexAttribArray(texCoordAttributeLocation);
  gl.vertexAttribPointer(texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.activeTexture(gl.TEXTURE0 + 0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
};

const loadImage = async () =>
  new Promise(resolve => {
    const img = new Image();
    img.src = martians;
    img.onload = () => resolve(img);
  });

const init = async canvas => {
  // init
  const img = await loadImage();
  const gl = canvas.getContext("webgl2");
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(gl, vertexShader, fragmentShader);

  // attributes
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // uniforms
  const imageLocation = gl.getUniformLocation(program, "u_image");

  // positions
  const vertexArray = gl.createVertexArray();
  gl.bindVertexArray(vertexArray);

  const positionBuffer = gl.createBuffer();
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // textures
  setUpTextures(gl, program, img);
  // prepare to draw
  gl.viewport(0, 0, width, height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);
  gl.bindVertexArray(vertexArray);
  gl.uniform1i(imageLocation, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  nRandom(10).forEach(() => drawRandomRect(gl, imageLocation));
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
