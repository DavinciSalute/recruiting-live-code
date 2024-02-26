import { Calculator } from "./index"
import { test, expect, describe, beforeEach } from "bun:test"

describe("Calculator", () => {
  let calculator: Calculator

  beforeEach(() => {
    calculator = new Calculator()
  })

  test("should add two numbers correctly", () => {
    const result = calculator.add(2, 3)
    expect(result).toBe(5)
  })
})
