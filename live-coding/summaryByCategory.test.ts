import { describe, it, expect } from "vitest";
import { summaryByCategory } from "./summaryByCategory";

describe("reportByCategory", () => {
  it("returns empty array when there are no transactions", () => {
    expect(summaryByCategory([])).toEqual([]);
  });

  it("returns summary for a single transaction", () => {
    const result = summaryByCategory([
      { category: "cibo", amount: 25, date: "2026-03-15" }
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("cibo");
    expect(result[0].total).toBe(25);
    expect(result[0].count).toBe(1);
  });

  it("returns summary for a single group of transactions (same category )", () => {
    const transactions = [
      { category: "cibo", amount: 25, date: "2026-03-15" },
      { category: "cibo", amount: 30, date: "2026-03-16" },
      { category: "cibo", amount: 10, date: "2026-03-17" },
    ];
    const result = summaryByCategory(transactions);

    expect(result).toHaveLength(1);
    expect(result[0].category).toBe("cibo");
    expect(result[0].total).toBe(65);
    expect(result[0].count).toBe(3);
  });

  it("returns summary with multiple category", () => {
    const transactions = [
      { category: "cibo", amount: 25, date: "2026-03-15" },
      { category: "trasporti", amount: 50, date: "2026-03-15" },
      { category: "cibo", amount: 10, date: "2026-03-16" },
    ];

    const result = summaryByCategory(transactions);

    expect(result).toHaveLength(2);

    const cibo = result.find(r => r.category === "cibo")!;
    expect(cibo.total).toBe(35);
    expect(cibo.count).toBe(2);

    const trasporti = result.find(r => r.category === "trasporti")!;
    expect(trasporti.total).toBe(50);
    expect(trasporti.count).toBe(1);
  });

  it("returns summary with negative amounts", () => {
    const transactions = [
      { category: "cibo", amount: 100, date: "2026-03-15" },
      { category: "cibo", amount: -30, date: "2026-03-16" },
    ];
    const result = summaryByCategory(transactions);

    expect(result[0].total).toBe(70);
    expect(result[0].count).toBe(2);
  });

  it("managed average amount by category", () => {
    const transactions = [
      { category: "cibo", amount: 10, date: "2026-03-15" },
      { category: "cibo", amount: 20, date: "2026-03-16" },
      { category: "cibo", amount: 30, date: "2026-03-17" },
    ];
    const result = summaryByCategory(transactions);

    expect(result[0].average).toBe(20);
  });

  it("returns the most recent transaction date", () => {
    const transactions = [
      { category: "cibo", amount: 10, date: "2026-03-10" },
      { category: "cibo", amount: 20, date: "2026-03-20" },
      { category: "cibo", amount: 15, date: "2026-03-15" }
    ];

    const result = summaryByCategory(transactions);

    expect(result[0].lastDate).toBe("2026-03-20");
  });
});
