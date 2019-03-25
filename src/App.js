import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Images from "./Images";
import BasicAnimations from "./BasicAnimations";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Link to="/images" className="link">
              images
            </Link>
            <Link to="/basicAnimations" className="link">
              basic animations
            </Link>
          </div>
          <div>
            <Route path="/images" exact component={Images} />
            <Route path="/basicAnimations" exact component={BasicAnimations} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
