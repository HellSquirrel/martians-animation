import React, { useRef, useState, useEffect } from "react";
import math from "mathjs";
import Controls from "./Controls";
import Canvas from "./Canvas";
import image from "./panorama/street.jpg";

const THREE = require("three");
let isUserInteracting = false,
  onMouseDownMouseX = 0,
  onMouseDownMouseY = 0,
  lon = 0,
  onMouseDownLon = 0,
  lat = 0,
  onMouseDownLat = 0,
  phi = 0,
  theta = 0;

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  SphereGeometry,
  MeshBasicMaterial,
  TextureLoader,
  Mesh,
  AmbientLight,
  Vector3
} = THREE;

global.THREE = THREE;

require("three/examples/js/loaders/GLTFLoader");

const width = 800;
const height = 400;

let currentModelName = null;

const defaults = {
  position: [0, 0, 0],
  cameraPosition: [0, 1, 100],
  clearColor: "#e0e0e0",
  fov: [45, width / height, 1, 100]
};

const targetACamera = camera => {
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);
  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
  camera.target.y = 500 * Math.cos(phi);
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(camera.target);
};

const init = canvas => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.target = new THREE.Vector3(0, 0, 0);
  scene.add(new THREE.AmbientLight("#fff"));

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl")
  });

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor("#000");
  const geometry = new THREE.SphereBufferGeometry(700, 60, 40);
  geometry.scale(-1, 1, 1);
  camera.position.z = 0;
  const texture = new TextureLoader().load(image);
  const material = new MeshBasicMaterial({
    map: texture
  });

  const mesh = new Mesh(geometry, material);

  scene.add(mesh);
  const animate = () => {
    requestAnimationFrame(animate);
    if (isUserInteracting) {
      lat = Math.max(-85, Math.min(85, lat));
      phi = THREE.Math.degToRad(90 - lat);
      theta = THREE.Math.degToRad(lon);
      camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
      camera.target.y = 500 * Math.cos(phi);
      camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
      camera.lookAt(camera.target);
    }

    renderer.render(scene, camera);
  };

  animate();
};

const pointerStart = event => {
  isUserInteracting = true;
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  onMouseDownMouseX = clientX;
  onMouseDownMouseY = clientY;
  onMouseDownLon = lon;
  onMouseDownLat = lat;
};

const pointerMove = event => {
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  lon = (onMouseDownMouseX - clientX) * 0.1 + onMouseDownLon;
  lat = (clientY - onMouseDownMouseY) * 0.1 + onMouseDownLat;
};

const pointerEnd = () => {
  isUserInteracting = false;
};

document.addEventListener(
  "dragover",
  function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  },
  false
);
document.addEventListener(
  "dragenter",
  function() {
    document.body.style.opacity = 0.5;
  },
  false
);

const Generative = () => {
  const canvas = useRef(null);
  const [currentState, setStep] = useState(0);

  return (
    <React.Fragment>
      <Controls>
        <button onClick={() => init(canvas.current)}>One</button>
      </Controls>
      <div style={{ position: "relative", display: "inline-flex" }}>
        <canvas
          onMouseDown={pointerStart}
          onMouseMove={pointerMove}
          onMouseUp={pointerEnd}
          width={width}
          height={height}
          ref={canvas}
        />
      </div>
    </React.Fragment>
  );
};

export default Generative;
