import React, { useRef } from "react";

const THREE = require("three");

const { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight } = THREE;

global.THREE = THREE;

require("three/examples/js/loaders/ColladaLoader");
require("three/examples/js/controls/OrbitControls");

const width = 400;
const height = 400;

const init = canvas => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 1, 500);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2")
  });

  renderer.setSize(width, height);
  renderer.setClearColor("#e0e0e0");
  scene.add(new AmbientLight("#fff"));

  const loader = new THREE.ColladaLoader();
  loader.load("/martians.dae", function(collada) {
    scene.add(collada.scene);
    camera.position.z = 25;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });

  new THREE.OrbitControls(camera, canvas);
};

const WebGL = () => {
  const canvas = useRef(null);

  return (
    <React.Fragment>
      <button onClick={() => init(canvas.current)}>GO!</button>
      <canvas width={width} height={height} ref={canvas} />
    </React.Fragment>
  );
};

export default WebGL;
