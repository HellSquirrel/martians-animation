import React, { useRef, useState, useEffect } from "react";
import math from "mathjs";
import Controls from "./Controls";
import Canvas from "./Canvas";
import image from "./panorama/street.jpg";
import martiansSvg from "./images/martians.svg";

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
const height = 450;

let camera = null;

const targetACamera = camera => {
  lat = Math.max(-85, Math.min(85, lat));
  phi = THREE.Math.degToRad(90 - lat);
  theta = THREE.Math.degToRad(lon);
  const vec = new Vector3(
    500 * Math.sin(phi) * Math.cos(theta),
    500 * Math.cos(phi),
    500 * Math.sin(phi) * Math.sin(theta)
  );

  console.log(vec);
  camera.lookAt(vec);
};

const init = canvas => {
  const scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
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
  targetACamera(camera);
  camera.position.z = 0;
  const texture = new TextureLoader().load(image);
  const material = new MeshBasicMaterial({
    map: texture
  });

  const mesh = new Mesh(geometry, material);
  const plain = new Mesh(
    new THREE.PlaneBufferGeometry(5, 5, 32),
    new THREE.MeshBasicMaterial({
      map: new TextureLoader().load(martiansSvg),
      side: THREE.DoubleSide
    })
  );

  scene.add(mesh);
  scene.add(plain);
  plain.rotation.x = (-1 * Math.PI) / 2;
  plain.rotation.z = plain.position.y = -20;
  const animate = () => {
    //plain.rotation.x += 0.1;

    requestAnimationFrame(animate);
    if (isUserInteracting) {
      targetACamera(camera);
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
  if (isUserInteracting) {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    lon = (onMouseDownMouseX - clientX) * 0.2 + onMouseDownLon;
    lat = (clientY - onMouseDownMouseY) * 0.2 + onMouseDownLat;
  }
};

const pointerEnd = () => {
  isUserInteracting = false;
};

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
