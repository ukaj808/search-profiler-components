import React from "react";
import ReactDOM from "react-dom";
import { ApiSearchBox } from "./ApiSearchBox";

import "./index.css";

const App = () => (
  <ApiSearchBox type={"cocktail"}/>
);
ReactDOM.render(<App />, document.getElementById("app"));
