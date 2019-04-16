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
import TrueWebGL from "./TrueWebGL";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <nav className="navigation">
            <Link to="/images" className="link">
              images
            </Link>
            <Link to="/progressive" className="link">
              progressive
            </Link>
            <Link to="/basicAnimations" className="link">
              basic animations
            </Link>
            <Link to="/filtersAnimations" className="link">
              filters animations
            </Link>

            <Link to="/maskingAndClipping" className="link">
              masking and clipping
            </Link>
            <Link to="/3dAnimations" className="link">
              animations 3d
            </Link>
            <Link to="/canvasAnimation" className="link">
              canvas animation
            </Link>
            <Link to="/canvas" className="link">
              canvas
            </Link>
            <Link to="/webgl" className="link">
              webGL
            </Link>
            <Link to="trueWebgl" className="link">
              true webGL
            </Link>
          </nav>
          <div className="content">
            <Route path="/images" exact component={Images} />
            <Route path="/progressive" exact component={Progressive} />
            <Route path="/basicAnimations" exact component={BasicAnimations} />
            <Route
              path="/filtersAnimations"
              exact
              component={FiltersAnimations}
            />
            <Route
              path="/maskingAndClipping"
              exact
              component={ClipAndMaskAnimations}
            />
            <Route path="/3dAnimations" exact component={ThreeDAnimations} />
            <Route path="/canvasAnimation" exact component={CanvasAnimation} />
            <Route path="/canvas" exact component={Canvas} />
            <Route path="/webgl" component={WebGL} />
            <Route path="/trueWebgl" component={TrueWebGL} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
