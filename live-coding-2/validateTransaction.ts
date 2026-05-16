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

interface ValidationResult {
  valid: boolean;
  code?: string;
  warnings?: string[];
}

const ALARM_THRESHOLD = 0.9;

export function validateTransaction(transaction: Transaction, user: User): ValidationResult {

  if (user.status === "blocked") {
    return { valid: false, code: "ACCOUNT_BLOCKED" };
  }

  if (transaction.amount > user.balance) {
    return { valid: false, code: "INSUFFICIENT_FUNDS" };
  }

  const todayTotal = user.todayTransactions.reduce((sum, a) => sum + a, 0);
  if (todayTotal + transaction.amount > user.dailyLimit) {
    return { valid: false, code: "DAILY_LIMIT_EXCEEDED" };
  }

  if (!user.allowedCurrencies.includes(transaction.currency)) {
    return { valid: false, code: "UNSUPPORTED_CURRENCY" };
  }

  const warnings: string[] = [];

  if (transaction.type === "WIRE_TRANSFER" && transaction.amount > user.balance * ALARM_THRESHOLD) {
    warnings.push("SUSPICIOUS_TRANSACTION"); 
  }

  return { valid: true, warnings };
}
