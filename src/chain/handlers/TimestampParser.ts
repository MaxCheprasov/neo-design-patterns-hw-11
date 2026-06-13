import { AbstractHandler } from "../AbstractHandler";

export class TimestampParser extends AbstractHandler {
  protected process(record: any): any {
    if (!record.timestamp)
      throw new Error("Missing required field 'timestamp'");
    const date = new Date(record.timestamp);
    if (isNaN(date.getTime())) throw new Error("Invalid timestamp format");
    return { ...record, timestamp: date.toISOString() };
  }
}
