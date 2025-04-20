function addHex(a, b) {
  const result = parseInt(a, 16) + parseInt(b, 16);
  if (result > 0xffff) throw new Error("Invalid result range");
  return result.toString(16).toUpperCase().padStart(4, "0");
}

function subtractHex(a, b) {
  const result = parseInt(a, 16) - parseInt(b, 16);
  if (result < 0) throw new Error("Invalid operation");
  return result.toString(16).toUpperCase().padStart(4, "0");
}

function multiplyHex(a, b) {
  const result = parseInt(a, 16) * parseInt(b, 16);
  if (result > 0xffff) throw new Error("Invalid result range");
  return result.toString(16).toUpperCase().padStart(4, "0");
}

function divideHex(a, b) {
  if (parseInt(b, 16) === 0) throw new Error("Division by zero");
  const result = Math.floor(parseInt(a, 16) / parseInt(b, 16));
  return result.toString(16).toUpperCase().padStart(4, "0");
}

module.exports = {
  addHex,
  subtractHex,
  multiplyHex,
  divideHex,
};
