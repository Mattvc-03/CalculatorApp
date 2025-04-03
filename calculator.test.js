const { addHex, subtractHex, multiplyHex, divideHex } = require('./calculator');

describe('Hex Calculator', () => {
  // Addition
  test('adds 0A and 05 to get 000F', () => {
    expect(addHex('0A', '05')).toBe('000F');
  });

  test('adds FF and 01 to get 0100', () => {
    expect(addHex('FF', '01')).toBe('0100');
  });

  // Subtraction
  test('subtracts 0F and 05 to get 000A', () => {
    expect(subtractHex('0F', '05')).toBe('000A');
  });

  test('throws error when result would be negative', () => {
    expect(() => subtractHex('05', '0F')).toThrow("Invalid operation: result negative");
  });

  // Multiplication
  test('multiplies 0A and 02 to get 0014', () => {
    expect(multiplyHex('0A', '02')).toBe('0014');
  });

  // Division
  test('divides 0F by 04 to get 0003', () => {
    expect(divideHex('0F', '04')).toBe('0003');
  });

  test('throws error on division by zero', () => {
    expect(() => divideHex('C9', '00')).toThrow("Division by zero");
  });

  // Output format
  test('adds 01 and 01 to get padded result 0002', () => {
    expect(addHex('01', '01')).toBe('0002');
  });

  // Overflow handling (optional)
  test('throws error if result is over FFFF', () => {
    expect(() => addHex('FFFF', '01')).toThrow("Invalid result range");
  });
});
