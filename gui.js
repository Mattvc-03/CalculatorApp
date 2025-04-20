function setupDOM() {
  const display = document.getElementById("display");
  const clearBtn = document.getElementById("clear");
  const buttons = document.querySelectorAll("button[data-value]");

  let operand1 = "";
  let operator = "";
  let operand2 = "";

  const updateDisplay = (text) => {
    display.textContent = text;
  };

  const formatHex = (num) => num.toString(16).toUpperCase().padStart(4, "0");

  const calculate = () => {
    const a = parseInt(operand1, 16);
    const b = parseInt(operand2, 16);
    let result;

    if (isNaN(a) || isNaN(b)) return;

    switch (operator) {
      case "+":
        result = a + b;
        if (result > 0xffff) return updateDisplay("Invalid result range");
        break;
      case "-":
        result = a - b;
        if (result < 0) return updateDisplay("Invalid operation");
        break;
      case "*":
        result = a * b;
        if (result > 0xffff) return updateDisplay("Invalid result range");
        break;
      case "/":
        if (b === 0) return updateDisplay("Division by zero");
        result = Math.floor(a / b);
        break;
      default:
        return;
    }

    const hexResult = formatHex(result);
    updateDisplay(hexResult);

    // allow chaining
    operand1 = hexResult;
    operator = "";
    operand2 = "";
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const val = button.getAttribute("data-value");

      if (["+", "-", "*", "/"].includes(val)) {
        // Ignore if operator already set and operand2 not filled
        if (operand1 && !operator) {
          operator = val;
        } else if (operand1 && operator && operand2) {
          // Chain operations: calculate first, then treat new operator
          calculate();
          operator = val;
        }
      } else if (val === "=") {
        if (operand1 && operator && operand2) {
          calculate();
        }
      } else {
        if (!operator) {
          if (operand1.length < 2) {
            operand1 += val;
            updateDisplay(operand1);
          }
        } else {
          if (operand2.length < 2) {
            operand2 += val;
            updateDisplay(operand2);

            if (operand2.length === 2) {
              calculate();
            }
          }
        }
      }
    });
  });

  clearBtn.addEventListener("click", () => {
    operand1 = "";
    operator = "";
    operand2 = "";
    updateDisplay("");
  });
}

if (typeof window !== "undefined") {
  setupDOM();
}

module.exports = { setupDOM };
