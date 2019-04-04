import React, { useRef } from "react";
import classNames from "classnames/bind";
import cs from "./WebGL.module.css";

const THREE = require("three");

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  DirectionalLight,
  MeshStandardMaterial,
  AmbientLight
} = THREE;

global.THREE = THREE;

require("three/examples/js/loaders/ColladaLoader");
require("three/examples/js/controls/OrbitControls");

const cx = classNames.bind(cs);

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
  //const light = new DirectionalLight("white", 1);
  //light.position.set(0, 0, 4);
  //scene.add(light);
  scene.add(new AmbientLight('#fff'));

  const loader = new THREE.ColladaLoader();
  loader.load("/martians.dae", function(collada) {
    scene.add(collada.scene);
    camera.position.z = 25;

    const animate = () => {
      //collada.scene.rotation.y = collada.scene.rotation.y + Math.PI * 0.002;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });

  const controls = new THREE.OrbitControls(camera, canvas);
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
