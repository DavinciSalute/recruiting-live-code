import { describe, it, expect, beforeEach } from "vitest";
import { validateTransaction } from "./validateTransaction";

interface Transaction {
  amount: number;
  currency: string;
  type: string;
}

interface User {
  balance: number;
  dailyLimit: number;
  allowedCurrencies: string[];
  status: string;
  todayTransactions: number[];
}

describe("validateTransaction", () => {
  let transaction: Transaction;
  let user: User;

  beforeEach(() => {
    user = {
      balance: 5000,
      dailyLimit: 10000,
      allowedCurrencies: ["EUR", "USD"],
      status: "active",
      todayTransactions: []
    };
    transaction = {
      amount: 100,
      currency: "EUR",
      type: "PAYMENT"
    };
  });

  it("blocked account always fails", () => {
    user.status = "blocked";
    const result = validateTransaction(transaction, user);
    expect(result.valid).toBe(false);
    expect(result.code).toBe("ACCOUNT_BLOCKED");
  });

  it("returns error if withdraw is more than balance", () => {
    user.balance = 50;
    transaction.amount = 500;
    const result = validateTransaction(transaction, user);
    expect(result.valid).toBe(false);
    expect(result.code).toBe("INSUFFICIENT_FUNDS");
  });

  it("return error if daily limit is reached", () => {
    user.dailyLimit = 1000;
    user.todayTransactions = [400, 500];
    transaction.amount = 300;
    const result = validateTransaction(transaction, user);
    expect(result.valid).toBe(false);
    expect(result.code).toBe("DAILY_LIMIT_EXCEEDED");
  });

  it("flags transaction as suspicious", () => {
    transaction.amount = 4800;
    transaction.type = "WIRE_TRANSFER";
    const result = validateTransaction(transaction, user);
    expect(result.valid).toBe(true);
    expect(result.warnings).toContain("SUSPICIOUS_TRANSACTION");
  });

  it("returns error if currency are not supported", () => {
    transaction.currency = "GBP";
    const result = validateTransaction(transaction, user);
    expect(result.valid).toBe(false);
    expect(result.code).toBe("UNSUPPORTED_CURRENCY");
  });

  it("returns transaction if everything is fine", () => {
    const result = validateTransaction(transaction, user);
    expect(result.valid).toBe(true);
    expect(result.code).toBeUndefined();
  });
});
