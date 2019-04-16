import React, { useRef, useState } from "react";
import math from "mathjs";

const THREE = require("three");

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  Clock
} = THREE;

global.THREE = THREE;

require("three/examples/js/loaders/ColladaLoader");
require("three/examples/js/loaders/GLTFLoader");
require("three/examples/js/controls/OrbitControls");

const width = 800;
const height = 800;

let currentModelName = null;

const defaults = {
  position: [0, 0, 0],
  cameraPosition: [0, 1, 100],
  clearColor: "#e0e0e0",
  fov: [45, width / height, 1, 100]
};

const imported = [
  {
    name: "Crypt",
    url: "crypt/scene.gltf",
    cameraPosition: [0, 0, 100],
    position: [0, -10, 0],
    fov: [45, width / height, 1, 500],
    clearColor: "#000",
    cp: {
      name: "bocharova",
      url: "https://sketchfab.com/apsnu"
    }
  },
  {
    name: "Cloud",
    url: "cloud/scene.gltf",
    position: [0, -1, 0],
    cameraPosition: [0, 1, 4],
    clearColor: "#000",
    pointLight: {
      color: 0xffffff,
      position: [1, 1, 1]
    },
    cp: {
      name: "aneeshaynee",
      url: "https://sketchfab.com/aneeshaynee"
    }
  },

  {
    name: "Elf",
    url: "elf/scene.gltf",
    fov: [45, width / height, 1, 500],
    position: [0, -16, 0],
    clearColor: "#2a2a2a",
    pointLight: {
      color: 0xffffff,
      position: [10, 10, 10]
    },
    cp: {
      name: "linart",
      url: "https://sketchfab.com/linart"
    }
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
        geometry = el.geometry;
      }
    });

    camera.position.z = 20;
    collada.scene.rotation.x = (-1 * Math.PI) / 4;
    const animate = () => {
      if (
        currentModelName === "martians" ||
        currentModelName === "martiansExplode"
      ) {
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
      }
    };
    animate();
  });

  new THREE.OrbitControls(camera, canvas);
};

const addGLTFModel = (canvas, model) => {
  let mixer = null;
  const clock = new Clock();
  const scene = new Scene();
  const camera = new PerspectiveCamera(...model.fov);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2")
  });

  renderer.gammaOutput = true;
  renderer.physicallyCorrectLights = true;
  renderer.setSize(width, height);
  renderer.setClearColor(model.clearColor);

  camera.position.set(...model.cameraPosition);
  scene.add(new THREE.AmbientLight("#fff"));

  if (model.pointLight) {
    const { color, position } = model.pointLight;
    const pointLight = new THREE.PointLight(color);
    pointLight.position.set(...position);
    scene.add(pointLight);
  }

  new THREE.OrbitControls(camera, canvas);

  new THREE.GLTFLoader().load(model.url, obj => {
    scene.add(obj.scene);
    obj.scene.position.set(...model.position);

    const animations = obj.animations;

    if (animations && animations.length) {
      mixer = new THREE.AnimationMixer(obj.scene);
      for (let i = 0; i < animations.length; i++) {
        const animation = animations[i];
        const action = mixer.clipAction(animation);
        action.play();
      }
    }
  });

  const animate = () => {
    if (model.name === currentModelName) {
      requestAnimationFrame(animate);
      if (mixer) mixer.update(clock.getDelta());
      renderer.render(scene, camera);
    }
  };
  animate();
};

const WebGL = () => {
  const canvas = useRef(null);
  const [currentModel, setModel] = useState("martians");
  const modelData = imported.find(d => d.name === currentModel);

  return (
    <React.Fragment>
      <div>
        <button
          onClick={() => {
            currentModelName = "martians";
            addMartiansModel(canvas.current, false, "/exploded.dae");
            setModel("martians");
          }}
        >
          Add Martians
        </button>
        {currentModel === ("martians" || "martiansExplode") && (
          <button
            onClick={() => {
              currentModelName = "martiansExplode";
              addMartiansModel(canvas.current, true, "/exploded.dae");
              setModel("martiansExplode");
            }}
          >
            Add noise to martians
          </button>
        )}

        {imported.map(model => (
          <button
            key={model.name}
            onClick={() => {
              currentModelName = model.name;
              addGLTFModel(canvas.current, { ...defaults, ...model });
              setModel(model.name);
            }}
          >
            {model.name}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", display: "inline-flex" }}>
        <canvas width={width} height={height} ref={canvas} />
        {modelData && (
          <div
            style={{
              position: "absolute",
              bottom: 5,
              right: 5,
              color: "#fff",
              fontSize: 12
            }}
          >
            {modelData.name} by{" "}
            <a
              href={modelData.cp.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {modelData.cp.name}
            </a>{" "}
            is licensed under{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC Attribution
            </a>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default WebGL;
