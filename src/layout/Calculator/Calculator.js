import React, { Component } from "react";
import Modal from "react-responsive-modal";

import Screen from "./Screen/Screen";
import Keypad from "./Keypad/Keypad";

class Calculator extends Component {
  state = {
    equation: "",
    result: 0,
    open: false
  };

  onButtonPress = event => {
    let equation = this.state.equation;
    const pressedButton = event.target.innerHTML;

    if (pressedButton === "C") return this.clear();
    else if (
      (pressedButton >= "0" && pressedButton <= "9") ||
      pressedButton === "."
    )
      equation += pressedButton;
    else if (["+", "-", "*", "/", "%"].indexOf(pressedButton) !== -1)
      equation += " " + pressedButton + " ";
    else if (pressedButton === "=") {
      try {
        /*eslint-disable no-eval */
        const evalResult = eval(equation);
        const result = Number.isInteger(evalResult)
          ? evalResult
          : evalResult.toFixed(2);
        this.setState({ result });
      } catch (error) {
        this.setState({ open: true });
      }
    } else {
      equation = equation.trim();
      equation = equation.substr(0, equation.length - 1);
    }

    this.setState({ equation: equation });
  };

  clear() {
    this.setState({ equation: "", result: 0 });
  }

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <main className="calculator">
        <Screen equation={this.state.equation} result={this.state.result} />
        <Keypad onButtonPress={this.onButtonPress} />
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <div>
            <h2 className="alert-text">Invalid Mathematical Equation</h2>
          </div>
        </Modal>
      </main>
    );
  }
}

export default Calculator;
