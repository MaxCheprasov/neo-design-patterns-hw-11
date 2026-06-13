import * as fs from "fs/promises";
import * as path from "path";

export class RejectedWriter {
  private lines: string[] = [];

  write(record: any, error: string): void {
    this.lines.push(JSON.stringify({ record, error }));
  }

  async finalize(): Promise<void> {
    await fs.mkdir("output", { recursive: true });
    await fs.writeFile(
      path.join("output", "rejected.jsonl"),
      this.lines.join("\n"),
      "utf-8",
    );
  }
}
