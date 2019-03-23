import React from "react";
import { ReactComponent as Martians } from "./images/martians.svg";
import MartiansJPG from "./images/martians.jpg";
import MartiansPNG from "./images/martians.png";
import MartiansProgressiveJPG from "./images/martians.progressive.jpg";
import MartiansWEBP from "./images/martians.webp";
import MartiansVIDEO from "./images/martians.av1.mp4";
import CatJPG from "./images/cat.jpg";
import CatWEBP from "./images/cat.webp";
import CatVIDEO from "./images/cat.av1.mp4";

import "./Images.css";
const Images = () => (
  <div className="grid">
    <div className="plate">
      PNG
      <img src={MartiansPNG} />
    </div>
    <div className="plate">
      JPG
      <img src={MartiansJPG} />
    </div>
    <div className="plate">
      Progressive JPG
      <img src={MartiansProgressiveJPG} />
    </div>
    <div className="plate">
      <div className="svg">
        SVG
        <Martians />
        <div />
      </div>
    </div>
    <div className="plate">
      WEBP
      <img src={MartiansWEBP} />
    </div>
    <div className="plate">
      AV1
      <video muted autoPlay playsInline src={MartiansVIDEO} />
    </div>
    <div className="plate">
      Cat JPG
      <img src={CatJPG} />
    </div>
    <div className="plate">
      Cat webp
      <img src={CatWEBP} />
    </div>
    <div className="plate">
      Cat video
      <video muted autoPlay playsinline src={CatVIDEO} />
    </div>
  </div>
);

export default Images;
