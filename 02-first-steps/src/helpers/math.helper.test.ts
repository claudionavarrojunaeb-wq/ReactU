import { describe, expect, test } from "vitest";
import { add, subtract, multiply } from "./math.helper";

describe("add", () => {
  test("Should add two positive numbers", () => {
    //! Arrange
    const a = 1;
    const b = 2;

    //! Act
    const result = add(a, b);

    //! Assert
    expect(result).toBe(a + b);
  });
});

describe("subtract", () => {
  test("Should subtract two positive numbers", () => {
    const a = 4;
    const b = 2;

    const result = subtract(a, b);

    expect(result).toBe(a - b);
  });
});

describe("multiply", () => {
  test("Should multiply two positive numbers", () => {
    const a = 4;
    const b = 2;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });
  test("Should multiply two negative numbers", () => {
    const a = -4;
    const b = -2;

    const result = multiply(a, b);

    expect(result).toBe(a * b);
  });
});
