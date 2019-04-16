import React, { useRef, useState } from "react";
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
require("three/examples/js/loaders/OBJLoader");
require("three/examples/js/loaders/MTLLoader");
require("three/examples/js/controls/OrbitControls");

const width = 800;
const height = 800;

const addMartiansModel = (canvas, shouldUpdate, modelUrl) => {
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
  loader.load(modelUrl, function(collada) {
    scene.add(collada.scene);
    let geometry = null;

    collada.scene.traverse(el => {
      if (el.isMesh) {
        console.log(el.material);
        geometry = el.geometry;
      }
    });

    camera.position.z = 20;
    collada.scene.rotation.x = (-1 * Math.PI) / 4;
    const animate = () => {
      requestAnimationFrame(animate);

      if (shouldUpdate) {
        const positions = geometry.attributes.position.array;
        const step = 0.001;
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

const addObjModel = (canvas, _, url) => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 1, 10000);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2")
  });

  renderer.setSize(width, height);
  renderer.setClearColor("#e0e0e0");
  camera.position.set(300, 600, 500);
  scene.add(new AmbientLight("#fff", 1));
  scene.add(new THREE.PointLight( 0xffffff, 0.8 ));
  console.log("done");
  new THREE.OrbitControls(camera, canvas);

  new THREE.MTLLoader().load(`${url}.mtl`, function(materials) {
    materials.preload();
    console.log(materials);
    new THREE.OBJLoader()
      .setMaterials(materials)
      .load(`${url}.obj`, function(object) {
        scene.add(object);
      });
  });
  const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
};

const WebGL = () => {
  const canvas = useRef(null);
  const [currentModel, setModel] = useState("martians");

  return (
    <React.Fragment>
      <button
        onClick={() => {
          addMartiansModel(canvas.current, false, "/exploded.dae");
          setModel("martians");
        }}
      >
        Add Martians
      </button>
      {currentModel === "martians" && (
        <button
          onClick={() => {
            addMartiansModel(canvas.current, true, "/exploded.dae");
            setModel("martians");
          }}
        >
          Add noise to martians
        </button>
      )}
      <button
        onClick={() => {
          addObjModel(canvas.current, false, "nier");
          setModel("lanscape");
        }}
      >
        Obj 1
      </button>
      <button
          onClick={() => {
            addObjModel(canvas.current, false, "2b");
            setModel("lanscape");
          }}
      >
        Obj 2
      </button>

      <canvas width={width} height={height} ref={canvas} />
    </React.Fragment>
  );
};

export default WebGL;
