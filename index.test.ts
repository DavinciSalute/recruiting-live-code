import { Calculator } from "./index"
import { test, expect, describe, beforeEach } from "bun:test"

describe("Calculator", () => {
  let calculator: Calculator

  beforeEach(() => {
    calculator = new Calculator()
  })

  test("should add two numbers", () => {
    // given
    const given = "2 + 2"

    // when
    const actual = calculator.calculate(given)

    // then
    expect(actual).toBe(4)
  })

  test("should add more than two numbers", () => {
    const given = "2 + 2 + 1"

    const actual = calculator.calculate(given)

    expect(actual).toBe(5)
  })

  test("should subtract two numbers", () => {
    const given = "2 - 2"

    const actual = calculator.calculate(given)

    expect(actual).toBe(0)
  })

  test("should subtract more than two numbers", () => {
    const given = "2 - 2 - 5"

    const actual = calculator.calculate(given)

    expect(actual).toBe(-5)
  })

  test("should perform multiple combined operations (adding and subtracting)", () => {
    const given = "2 - 2 + 5"

    const actual = calculator.calculate(given)

    expect(actual).toBe(5)
  })

  test("should perform multiple combined operations (adding and subtracting) when it starts with a negative number", () => {
    const given = "-2 - 2 + 5"

    const actual = calculator.calculate(given)

    expect(actual).toBe(1)
  })
})
