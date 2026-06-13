import { AbstractHandler } from "../AbstractHandler";

const VALID_LEVELS = ["info", "warning", "critical"];

export class LevelValidator extends AbstractHandler {
  protected process(record: any): any {
    if (!record.level || !VALID_LEVELS.includes(record.level)) {
      throw new Error(
        `Invalid level '${record.level}'. Must be one of: ${VALID_LEVELS.join(", ")}`,
      );
    }
    return record;
  }
}
