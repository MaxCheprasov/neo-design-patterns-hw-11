import { AbstractHandler } from "../AbstractHandler";

const MAX_LENGTH = 255;

export class MessageTrimmer extends AbstractHandler {
  protected process(record: any): any {
    if (typeof record.message !== "string") {
      throw new Error("Missing or invalid 'message' field");
    }
    return {
      ...record,
      message: record.message.trim().substring(0, MAX_LENGTH),
    };
  }
}
