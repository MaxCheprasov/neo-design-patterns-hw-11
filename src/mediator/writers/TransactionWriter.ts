import * as fs from "fs/promises";
import * as path from "path";

export class TransactionWriter {
  private rows: string[] = [];

  write(record: any): void {
    this.rows.push(`${record.timestamp},${record.amount},${record.currency}`);
  }

  async finalize(): Promise<void> {
    await fs.mkdir("output", { recursive: true });
    const header = "timestamp,amount,currency";
    const content = [header, ...this.rows].join("\n");
    await fs.writeFile(
      path.join("output", "transactions.csv"),
      content,
      "utf-8",
    );
  }
}
