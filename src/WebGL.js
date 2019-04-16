import React, { useRef, useState } from "react";
import math from "mathjs";

const THREE = require("three");

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  Clock,
  Vector3
} = THREE;

global.THREE = THREE;

require("three/examples/js/loaders/ColladaLoader");
require("three/examples/js/loaders/GLTFLoader");
require("three/examples/js/controls/OrbitControls");

const width = 800;
const height = 800;

const defaults = {
  position: [0, 0, 0]
};

const imported = [
  {
    name: "Elf",
    url: "elf/scene.gltf",
    position: [0, 0, 0]
  },

  {
    name: "Cloud",
    url: "cloud/scene.gltf"
  },
  {
    name: "Crypt",
    url: "crypt/scene.gltf"
  }
];

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

const addGLTFModel = (canvas, model) => {
  let mixer = null;
  const clock = new Clock();
  const scene = new Scene();
  const camera = new PerspectiveCamera(45, width / height, 0, 1000);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2")
  });

  renderer.gammaOutput = true;
  renderer.physicallyCorrectLights = true;
  renderer.setSize(width, height);
  renderer.setClearColor("#e0e0e0");

  scene.add(new THREE.AmbientLight(0x222222));
  camera.position.set(100, 100, 100);

  const spot = new THREE.SpotLight(0xffffff, 1);
  spot.position.set(5, 10, 5);
  spot.angle = 0.5;
  spot.penumbra = 0.75;
  spot.intensity = 100;
  spot.decay = 2;

  scene.add(spot);

  new THREE.OrbitControls(camera, canvas);

  new THREE.GLTFLoader().load(model.url, obj => {
    scene.add(obj.scene);
    const animations = obj.animations;
    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer(obj.scene);
      for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        const action = mixer.clipAction(animation);
        action.play();
        console.log(action);
      }
    }
  });

  const animate = () => {
    requestAnimationFrame(animate);
    if (mixer) mixer.update(clock.getDelta());
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

      {imported.map(model => (
        <button
          id={model.name}
          onClick={() => {
            addGLTFModel(canvas.current, { ...defaults, ...model });
            setModel("lanscape");
          }}
        >
          {model.name}
        </button>
      ))}
      <canvas width={width} height={height} ref={canvas} />
    </React.Fragment>
  );
};

export default WebGL;
