import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Images from "./Images";
import BasicAnimations from "./BasicAnimations";
import FiltersAnimations from "./FiltersAnimations";
import ClipAndMaskAnimations from "./ClipAndMaskAnimations";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div class="navigation">
            <Link to="/images" className="link">
              images
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
          </div>
          <div>
            <Route path="/images" exact component={Images} />
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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
