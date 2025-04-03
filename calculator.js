function parseHex(hex) {
    return parseInt(hex, 16);
  }
  
  function formatHex(value) {
    if (value < 0 || value > 0xFFFF) {
      throw new Error("Invalid result range");
    }
    return value.toString(16).toUpperCase().padStart(4, '0');
  }
  
  function addHex(a, b) {
    return formatHex(parseHex(a) + parseHex(b));
  }
  
  function subtractHex(a, b) {
    const result = parseHex(a) - parseHex(b);
    if (result < 0) throw new Error("Invalid operation: result negative");
    return formatHex(result);
  }
  
  function multiplyHex(a, b) {
    return formatHex(parseHex(a) * parseHex(b));
  }
  
  function divideHex(a, b) {
    if (parseHex(b) === 0) throw new Error("Division by zero");
    return formatHex(Math.floor(parseHex(a) / parseHex(b)));
  }
  
  module.exports = {
    addHex,
    subtractHex,
    multiplyHex,
    divideHex
  };
  