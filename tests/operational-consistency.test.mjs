import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { readFileSync } from "node:fs";
import { retryDelayMs } from "../app/api/leads/lead-store.ts";

const root = path.resolve(import.meta.dirname, "..");

test("retry backoff is exponential and capped at 60 seconds", () => {
  assert.equal(retryDelayMs(0), 1_000);
  assert.equal(retryDelayMs(1), 1_000);
  assert.equal(retryDelayMs(2), 2_000);
  assert.equal(retryDelayMs(3), 4_000);
  assert.equal(retryDelayMs(6), 32_000);
  assert.equal(retryDelayMs(7), 60_000);
  assert.equal(retryDelayMs(20), 60_000);
});

test("README retry batch documentation matches the route limit", () => {
  const route = readFileSync(path.join(root, "app/api/leads/retry/route.ts"), "utf8");
  const readme = readFileSync(path.join(root, "README.md"), "utf8");
  assert.match(route, /const RETRY_BATCH_SIZE = 3;/);
  assert.match(readme, /procesa como máximo \*\*3 solicitudes\*\*/);
});
