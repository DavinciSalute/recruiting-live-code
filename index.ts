export class Calculator {
  private expressionString: string = ""

  constructor() {}

  public calculate(expression: string): number {
    this.expressionString = expression.trim()
    const tokens = this.expressionString.split(/\s+/)
    const numbers: number[] = []
    const operators: string[] = []

    for (let token of tokens) {
      if (!isNaN(parseFloat(token))) {
        numbers.push(parseFloat(token))
      } else if (token === "+" || token === "-") {
        operators.push(token)
      } else {
        console.error(`Invalid expression: ${this.expressionString}`)
      }
    }

    if (numbers.length !== operators.length + 1) {
      console.log(`Invalid expression: ${this.expressionString}`)
    }

    let result = numbers[0]
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i]
      const nextNumber = numbers[i + 1]
      switch (operator) {
        case "+":
          result += nextNumber
          break
        case "-":
          result -= nextNumber
          break
        default:
          console.log(`Unsupported operator: ${operator}`)
      }
    }

    return result
  }
}
