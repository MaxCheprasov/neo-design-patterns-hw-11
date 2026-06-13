import { AbstractHandler } from "../AbstractHandler";

export class IpValidator extends AbstractHandler {
  protected process(record: any): any {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!record.ip || !ipv4Regex.test(record.ip)) {
      throw new Error("Invalid IP address");
    }
    const parts = record.ip.split(".").map(Number);
    if (parts.some((p: number) => p < 0 || p > 255)) {
      throw new Error("Invalid IP address range");
    }
    return record;
  }
}
