import * as fs from "fs/promises";
import * as path from "path";

import { buildAccessLogChain } from "./chain/chains/AccessLogChain";
import { buildTransactionChain } from "./chain/chains/TransactionChain";
import { buildSystemErrorChain } from "./chain/chains/SystemErrorChain";
import { ProcessingMediator } from "./mediator/ProcessingMediator";
import { DataRecord } from "./models/DataRecord";

const handlerMap: Record<string, () => any> = {
  access_log: buildAccessLogChain,
  transaction: buildTransactionChain,
  system_error: buildSystemErrorChain,
};

async function main() {
  const filePath = path.join("data", "records.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const records: DataRecord[] = JSON.parse(raw);

  console.log(`[INFO] Завантажено записів: ${records.length}`);

  const mediator = new ProcessingMediator();

  for (const record of records) {
    const buildChain = handlerMap[record.type];

    if (!buildChain) {
      mediator.onRejected(record, `Unknown record type: '${record.type}'`);
      continue;
    }

    try {
      const chain = buildChain();
      const processed = chain.handle(record);
      mediator.onSuccess(processed);
    } catch (err: any) {
      mediator.onRejected(record, err.message ?? "Unknown error");
    }
  }

  await mediator.finalize();
}

main().catch((err) => {
  console.error("[ERROR] Fatal error:", err);
  process.exit(1);
});
