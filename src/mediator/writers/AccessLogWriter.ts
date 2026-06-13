import * as fs from "fs/promises";
import * as path from "path";

export class AccessLogWriter {
  private records: any[] = [];

  write(record: any): void {
    const { type, ...rest } = record;
    this.records.push(rest);
  }

  async finalize(): Promise<void> {
    await fs.mkdir("output", { recursive: true });
    await fs.writeFile(
      path.join("output", "access_logs.json"),
      JSON.stringify(this.records, null, 2),
      "utf-8",
    );
  }
}
