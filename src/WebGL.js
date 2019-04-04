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

const cx = classNames.bind(cs);

const width = 400;
const height = 400;

const init = canvas => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 0.1, 500);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2")
  });
  renderer.setSize(width, height);
  renderer.setClearColor("#000");
  const geometry = new BoxGeometry(1, 1, 1);
  var material = new MeshStandardMaterial({ color: "white" });
  var cube = new Mesh(geometry, material);
  const light = new DirectionalLight("white", 1);
  light.position.set(0, 0, 4);
  scene.add(cube);
  scene.add(light);
  scene.add(new AmbientLight("white"));

  const loader = new THREE.ColladaLoader();
  loader.load("/model.dae", function(collada) {
    scene.add(collada.scene);
    camera.position.z = 25;

    const animate = () => {
      collada.scene.rotation.x = collada.scene.rotation.x + Math.PI * 0.002;
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });
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
