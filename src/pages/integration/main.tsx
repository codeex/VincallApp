import React from "react";
import { render } from "react-dom";
import { CProviders } from "../../components/CProviders";
import "../../CSS/main.css";
import { Authentication } from "./Authentication";

const App = () => {
  return (
    <CProviders>
      <Authentication />
    </CProviders>
  );
};

render(<App />, document.getElementById("main"));
