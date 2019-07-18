import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Images from "./Images";
import Progressive from "./Progressive";
import BasicAnimations from "./BasicAnimations";
import FiltersAnimations from "./FiltersAnimations";
import ClipAndMaskAnimations from "./ClipAndMaskAnimations";
import ThreeDAnimations from "./ThreeDAnimations";
import Canvas from "./Canvas";
import CanvasAnimation from "./CanvasAnimation";
import WebGL from "./WebGL";
import Generative from "./Generative";
import GenerativeParticles from "./Generative.particles";
import TrueWebGL from "./TrueWebGL";
import Matrix from "./Matrix";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GenerativeParticles />
      </div>
    );
  }
}

export default App;
