import { DataRecord } from "../models/DataRecord";
import { AccessLogWriter } from "./writers/AccessLogWriter";
import { TransactionWriter } from "./writers/TransactionWriter";
import { ErrorLogWriter } from "./writers/ErrorLogWriter";
import { RejectedWriter } from "./writers/RejectedWriter";

export class ProcessingMediator {
  private accessLogWriter = new AccessLogWriter();
  private transactionWriter = new TransactionWriter();
  private errorLogWriter = new ErrorLogWriter();
  private rejectedWriter = new RejectedWriter();

  private successCount = 0;
  private rejectedCount = 0;

  onSuccess(record: DataRecord): void {
    this.successCount++;
    switch (record.type) {
      case "access_log":
        this.accessLogWriter.write(record);
        break;
      case "transaction":
        this.transactionWriter.write(record);
        break;
      case "system_error":
        this.errorLogWriter.write(record);
        break;
    }
  }

  onRejected(original: any, error: string): void {
    this.rejectedCount++;
    this.rejectedWriter.write(original, error);
  }

  async finalize(): Promise<void> {
    await Promise.all([
      this.accessLogWriter.finalize(),
      this.transactionWriter.finalize(),
      this.errorLogWriter.finalize(),
      this.rejectedWriter.finalize(),
    ]);

    console.log(`[INFO] Успішно оброблено: ${this.successCount}`);
    console.log(`[WARN] Відхилено з помилками: ${this.rejectedCount}`);
    console.log(`[INFO] Звіт збережено у директорії output/`);
  }

  getSuccessCount(): number {
    return this.successCount;
  }

  getRejectedCount(): number {
    return this.rejectedCount;
  }
}
