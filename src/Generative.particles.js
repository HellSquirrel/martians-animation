import React, { useRef, useState, useEffect } from "react";
import math from "mathjs";
import classNames from "classnames/bind";
import svg from "./images/group.svg";

import styles from "./Generative.particles.module.css";
require("three/examples/js/controls/OrbitControls");

const cx = classNames.bind(styles);

const THREE = require("three");

const {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  MeshBasicMaterial,
  TextureLoader,
  Mesh,
  Vector3,
  Points
} = THREE;

global.THREE = THREE;

const width = window.innerWidth;
const height = window.innerHeight;
const totalParticles = 100;
const r = 7;

let camera = null;

const createDots = positions => {
  const pMaterial = new THREE.MeshBasicMaterial({
    map: new TextureLoader().load(svg),
    side: THREE.DoubleSide
  });

  // const pMaterial = new THREE.PointsMaterial({
  //   color: 0xffffff,
  //   size: 0.05,
  //   opacity: 0.5,
  //   blending: THREE.AdditiveBlending,
  //   transparent: true
  //   //sizeAttenuation: false
  // });
};

const init = canvas => {
  const scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // var geometry = new THREE.BoxGeometry(1, 1, 1);
  // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // var cube = new THREE.Mesh(geometry, material);

  scene.add(new THREE.AmbientLight("#fff"));
  //scene.add(cube);

  const renderer = new WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl")
  });

  scene.add(curve());

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  camera.position.z = 10;

  //scene.add(lMesh);
  new THREE.OrbitControls(camera, canvas);

  const animate = () => {
    requestAnimationFrame(animate);
    scene.rotation.y += 0.001;

    renderer.render(scene, camera);
  };

  animate();
};

const curve = (count = 100, radius = 10) => {
  var geometry = new THREE.BufferGeometry();
  const textureLoader = new THREE.TextureLoader();
  const sprite = textureLoader.load(svg);
  console.log(sprite);

  const material = new THREE.PointsMaterial({
    size: 1,
    map: sprite,
    depthTest: false
  });
  // const material = new THREE.PointsMaterial({
  //   color: 0x888888
  // });

  const positions = [];
  const colors = [];
  const sizes = [];
  const color = new THREE.Color();

  for (let i = 0; i < count; i++) {
    positions.push((Math.random() * 2 - 1) * radius);
    positions.push((Math.random() * 2 - 1) * radius);
    positions.push((Math.random() * 2 - 1) * radius);
    color.setHSL(i / count, 1.0, 0.5);
    colors.push(color.r, color.g, color.b);
    sizes.push(20);
  }

  geometry.addAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.addAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.addAttribute(
    "size",
    new THREE.Float32BufferAttribute(sizes, 1).setDynamic(true)
  );

  const particles = new THREE.Points(geometry, material);

  return particles;
};

const Generative = () => {
  const canvas = useRef(null);
  const [currentState, setStep] = useState(0);
  useEffect(() => init(canvas.current), []);

  return (
    <React.Fragment>
      <div className={cx("content")}>
        <div className={cx("text")}>
          <header className={cx("header")}>Generative art</header>
          <div className={cx("clarification")}>
            Generative art refers to art that in whole or in part has been
            created with the use of an autonomous system. An autonomous system
            in this context is generally one that is non-human and can
            independently determine features of an artwork that would otherwise
            require decisions made directly by the artist. In some cases the
            human creator may claim that the generative system represents their
            own artistic idea, and in others that the system takes on the role
            of the creator.
          </div>
        </div>
        <canvas
          width={width}
          height={height}
          ref={canvas}
          className={cx("canvas")}
        />
      </div>
    </React.Fragment>
  );
};

export default Generative;
