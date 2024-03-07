# recruiting-test

## prerequisites

You need bun to use this repo.
Install with:

```
curl -fsSL https://bun.sh/install | bash
```

from: https://bun.sh/

## getting started

To install dependencies:

```bash
bun i
```

To start the tests:

```bash
bun test
```

## The task

Create a calculator that can handle sum and subtraction operations. This calculator will receive a string and returns the result. For example:

"1 + 1" = 2

"1 - 1" = 0

"4 + 2 + 1 + 3" = 11

"4 - 2 + 1" = 3

### additional features

In addition to sum and subtraction, the calculator should also support multiplication and division operations. For example:

"2 \* 3" = 6
"10 / 2" = 5

The calculator should follow the order of operations (PEMDAS/BODMAS) when evaluating expressions. Parentheses should be supported as well. For example:

"(2 + 3) \* 4" = 20
"10 / (2 + 3)" = 2
