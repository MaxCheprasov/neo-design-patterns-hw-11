import { AbstractHandler } from "../AbstractHandler";
import { TimestampParser } from "../handlers/TimestampParser";
import { LevelValidator } from "../handlers/LevelValidator";
import { MessageTrimmer } from "../handlers/MessageTrimmer";

export function buildSystemErrorChain(): AbstractHandler {
  const ts = new TimestampParser();
  const level = new LevelValidator();
  const msg = new MessageTrimmer();
  ts.setNext(level).setNext(msg);
  return ts;
}
