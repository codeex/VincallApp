import React from "react";
import { render } from "react-dom";
import { CProviders } from "../../components/CProviders";
import "../../CSS/main.css";
import { Login } from "./Login";

const App = () => {
  return (
    <CProviders>
      <Login />
    </CProviders>
  );
};

render(<App />, document.getElementById("main"));
