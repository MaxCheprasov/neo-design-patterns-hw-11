import { AbstractHandler } from "../AbstractHandler";

export class CurrencyNormalizer extends AbstractHandler {
  protected process(record: any): any {
    if (!record.currency || typeof record.currency !== "string") {
      throw new Error("Missing or invalid 'currency' field");
    }
    return { ...record, currency: record.currency.toUpperCase() };
  }
}
