/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let display;
let press;
let setupDOM;

beforeEach(async () => {
  document.documentElement.innerHTML = html.toString();
  const { setupDOM } = require("./gui.js");
  setupDOM();

  display = document.getElementById("display");
  press = (val) => document.querySelector(`[data-value="${val}"]`).click();
});

// ---------- RENDERING ----------
test("renders all hex and operation buttons", () => {
  const buttons = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "+",
    "-",
    "*",
    "/",
    "=",
  ];
  buttons.forEach((val) => {
    expect(document.querySelector(`[data-value="${val}"]`)).toBeTruthy();
  });
  expect(document.getElementById("clear")).toBeTruthy();
  expect(display).toBeTruthy();
});

// ---------- INPUT ----------
test('builds input "0A"', () => {
  press("0");
  press("A");
  expect(display.textContent).toBe("0A");
});

// ---------- AUTO-CALCULATED OPERATIONS ----------
test("auto-calculates 0A + 05 = 000F", () => {
  press("0");
  press("A");
  press("+");
  press("0");
  press("5");
  expect(display.textContent).toBe("000F");
});

test("auto-calculates FF + 01 = 0100", () => {
  press("F");
  press("F");
  press("+");
  press("0");
  press("1");
  expect(display.textContent).toBe("0100");
});

test("auto-calculates 0A * 02 = 0014", () => {
  press("0");
  press("A");
  press("*");
  press("0");
  press("2");
  expect(display.textContent).toBe("0014");
});

test("auto-calculates 0F / 04 = 0003", () => {
  press("0");
  press("F");
  press("/");
  press("0");
  press("4");
  expect(display.textContent).toBe("0003");
});

// ---------- ERROR CASES ----------
test("shows error for negative result in subtraction", () => {
  press("0");
  press("5");
  press("-");
  press("0");
  press("F");
  expect(display.textContent.toLowerCase()).toMatch(/invalid operation/);
});

// ---------- CLEAR ----------
test("clear resets everything", () => {
  press("A");
  document.getElementById("clear").click();
  expect(display.textContent).toBe("");
});
