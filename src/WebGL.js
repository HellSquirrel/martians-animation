import React, { useRef } from "react";
import math from "mathjs";

const THREE = require("three");

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight
} = THREE;

global.THREE = THREE;

require("three/examples/js/loaders/ColladaLoader");
require("three/examples/js/controls/OrbitControls");

const width = 400;
const height = 400;

const init = (canvas, shouldUpdate) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 1, 500);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2")
  });

  renderer.setSize(width, height);
  renderer.setClearColor("#e0e0e0");
  const light = new DirectionalLight("fff", 0.5);
  scene.add(new AmbientLight("#fff", 0.5));
  scene.add(light);

  const loader = new THREE.ColladaLoader();
  loader.load("/exploded.dae", function(collada) {
    scene.add(collada.scene);
    let geometry = null;

    collada.scene.traverse(el => {
      if (el.isMesh) {
        geometry = el.geometry;
      }
    });

    camera.position.z = 20;
    collada.scene.rotation.x = (-1 * Math.PI) / 4;
    const animate = () => {
      requestAnimationFrame(animate);

      if (shouldUpdate) {
        const positions = geometry.attributes.position.array;
        const step = 0.0001;
        console.log(geometry.attributes.position.array[0]);
        for (let i = 40000; i < 45000; i++) {
          positions[i] += math.random(-1 * step, step);
          positions[i + 1] += math.random(-1 * step, step);
          positions[i + 2] += math.random(-1 * step, step);
        }
        geometry.attributes.position.needsUpdate = true;
      }

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
      <button onClick={() => init(canvas.current, true)}>
        GO with updates!
      </button>
      <canvas width={width} height={height} ref={canvas} />
    </React.Fragment>
  );
};

export default WebGL;
