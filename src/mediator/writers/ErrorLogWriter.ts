import * as fs from "fs/promises";
import * as path from "path";

export class ErrorLogWriter {
  private lines: string[] = [];

  write(record: any): void {
    const { type, ...rest } = record;
    this.lines.push(JSON.stringify(rest));
  }

  async finalize(): Promise<void> {
    await fs.mkdir("output", { recursive: true });
    await fs.writeFile(
      path.join("output", "errors.jsonl"),
      this.lines.join("\n"),
      "utf-8",
    );
  }
}
