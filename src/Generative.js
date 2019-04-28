import React, { useRef, useState, useEffect } from "react";
import math from "mathjs";
import classNames from "classnames/bind";
import image from "./panorama/street.jpg";
import martiansSvg from "./images/martians.svg";

import styles from "./Generative.module.css";
const cx = classNames.bind(styles);

const THREE = require("three");
let isUserInteracting = false,
  onMouseDownMouseX = 0,
  onMouseDownMouseY = 0,
  lon = 0,
  onMouseDownLon = 0,
  lat = 20,
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
  useEffect(() => init(canvas.current), []);

  return (
    <React.Fragment>
      <div className={cx("content")}>
        <header className={cx("header")}>Wikipedia text about Paris</header>
        <article className={cx("paris")}>
          <canvas
            onMouseDown={pointerStart}
            onMouseMove={pointerMove}
            onMouseUp={pointerEnd}
            width={width}
            height={height}
            ref={canvas}
          />
          <div className={cx("text")}>
            Paris (French pronunciation: ​[paʁi] (About this soundlisten)) is
            the capital and most populous city of France, with an area of 105
            square kilometres (41 square miles) and an official estimated
            population of 2,140,526 residents as of 1 January 2019. Since the
            17th century, Paris has been one of Europe's major centres of
            finance, diplomacy, commerce, fashion, science, and the arts. The
            City of Paris is the centre and seat of government of the
            Île-de-France, or Paris Region, which has an estimated official 2019
            population of 12,213,364, or about 18 percent of the population of
            France.
          </div>
        </article>
      </div>
    </React.Fragment>
  );
};

export default Generative;
