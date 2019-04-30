import React, { useRef, useState, useEffect } from "react";
import math from "mathjs";
import classNames from "classnames/bind";

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
  const pMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    transparent: true
    //sizeAttenuation: false
  });

  const pGeometry = new THREE.BufferGeometry();
  pGeometry.setDrawRange(0, totalParticles);
  pGeometry.addAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3).setDynamic(true)
  );

  pGeometry.computeBoundingSphere();

  return new THREE.Points(pGeometry, pMaterial);
};

const createLines = positions => {
  const lMaterial = new THREE.LineBasicMaterial({
    //vertexColors: THREE.VertexColors,
    blending: THREE.AdditiveBlending,
    transparent: true,
    color: 0xffffff
  });

  const lGeometry = new THREE.BufferGeometry();
  lGeometry.addAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3).setDynamic(true)
  );

  return new THREE.LineSegments(lGeometry, lMaterial);
};

const getPositions = totalParticles => {
  const pos = new Float32Array(totalParticles * 3);
  for (let i = 0; i < totalParticles * 3; i++) {
    pos[i] = math.random(-r, r);
    pos[i + 1] = math.random(-r, r);
    pos[i + 2] = math.random(-r, r);
  }

  return pos;
};

const getVelocities = totalParticles => {
  return [...Array(totalParticles)].map(e => ({
    velocity: new THREE.Vector3(
      -1 * math.random() * 0.01,
      -1 * math.random() * 0.01,
      -1 * math.random() * 0.01
    ),
    numConnections: 0
  }));
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
  camera.position.z = 10;

  const particlesPositions = getPositions(totalParticles);
  const pMesh = createDots(particlesPositions);
  //let positions = new Float32Array(totalParticles * totalParticles);
  //const lMesh = createLines(positions);
  const data = getVelocities(totalParticles);

  scene.add(pMesh);

  // scene.add(lMesh);
  new THREE.OrbitControls(camera, canvas);
  console.log(pMesh.geometry.attributes.position);

  const animate = () => {
    requestAnimationFrame(animate);
    let vertexpos = 0;
    let colorpos = 0;
    let numConnected = 0;
    for (let i = 0; i < totalParticles; i++) {
      data[i].numConnections = 0;
    }
    for (let i = 0; i < totalParticles; i++) {
      let particleData = data[i];
      particlesPositions[i * 3] += particleData.velocity.x;
      particlesPositions[i * 3 + 1] += particleData.velocity.y;
      particlesPositions[i * 3 + 2] += particleData.velocity.z;
      if (
        particlesPositions[i * 3 + 1] < -1 * r ||
        particlesPositions[i * 3 + 1] > r
      )
        particleData.velocity.y = -particleData.velocity.y;
      if (particlesPositions[i * 3] < -1 * r || particlesPositions[i * 3] > r)
        particleData.velocity.x = -particleData.velocity.x;
      if (
        particlesPositions[i * 3 + 2] < -1 * r ||
        particlesPositions[i * 3 + 2] > r
      )
        particleData.velocity.z = -particleData.velocity.z;
      // Check collision
      // for (let j = i + 1; j < totalParticles; j++) {
      //   let particleDataB = data[j];
      //   let dx = particlesPositions[i * 3] - particlesPositions[j * 3];
      //   let dy = particlesPositions[i * 3 + 1] - particlesPositions[j * 3 + 1];
      //   let dz = particlesPositions[i * 3 + 2] - particlesPositions[j * 3 + 2];
      //   let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      //   if (numConnected < 100) {
      //     particleData.numConnections++;
      //     particleDataB.numConnections++;
      //     let alpha = 1.0;
      //     positions[vertexpos++] = particlesPositions[i * 3];
      //     positions[vertexpos++] = particlesPositions[i * 3 + 1];
      //     positions[vertexpos++] = particlesPositions[i * 3 + 2];
      //     positions[vertexpos++] = particlesPositions[j * 3];
      //     positions[vertexpos++] = particlesPositions[j * 3 + 1];
      //     positions[vertexpos++] = particlesPositions[j * 3 + 2];
      //     numConnected++;
      //   }
      // }
    }
    //lMesh.geometry.setDrawRange(0, numConnected * 2);
    //lMesh.geometry.attributes.position.needsUpdate = true;
    //lMesh.geometry.attributes.color.needsUpdate = true;
    pMesh.geometry.attributes.position.needsUpdate = true;
    console.log(pMesh.geometry.attributes.position);

    renderer.render(scene, camera);
  };

  animate();
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
