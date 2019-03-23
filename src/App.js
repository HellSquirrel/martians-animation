import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Images from "./Images";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Route path="/images" exact component={Images} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
