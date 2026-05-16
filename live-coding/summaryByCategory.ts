type Category = "cibo" | "trasporti" | "pernottamenti";

interface Transaction {
  category: Category;
  amount: number;
  date: string;
}

interface CategorySummary {
  category: string;
  total: number;
  count: number;
  average: number;
  lastDate: string;
}

export function summaryByCategory(transactions: Transaction[]): CategorySummary[] {
  const summaries: CategorySummary[] = [];

  for (const transaction of transactions) {
    const summary = summaries.find(s => s.category === transaction.category);

    if (summary) {
      summary.total += transaction.amount;
      summary.count++;
      if (transaction.date > summary.lastDate) summary.lastDate = transaction.date;
    } else {
      summaries.push({
        category: transaction.category,
        total: transaction.amount,
        count: 1,
        average: 0,
        lastDate: transaction.date,
      });
    }
  }

  summaries.forEach(s => s.average = s.total / s.count);

  return summaries;
}
