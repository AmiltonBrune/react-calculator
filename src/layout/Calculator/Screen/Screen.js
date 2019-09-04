import React from "react";

import ResultScreen from "./ResultScreen/ResultScreen";
import ComputationScreen from "./ComputacionScreen/ComputationScreen";

const screen = props => (
  <section className="screen">
    <ResultScreen>{props.result}</ResultScreen>
    <ComputationScreen>{props.equation}</ComputationScreen>
  </section>
);

export default screen;
