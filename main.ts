// Pump.fun Bot Sprint entry: a momentum paper-trading bot on the
// agent-fun/replay/v2 protocol. Run by the grader as `node /bot/main.ts`.
// The strategy lives in strategy.ts; the protocol shim is vendored in
// vendor/makefun-bot.ts (a byte-identical copy of the kit's sdk/ts file).
//
// Each batch of orders the harness sends arrives with a 2-slot latency
// before it can fill, so entries are sized small and exits are mechanical:
// the bot never chases a move it has already missed.

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

const strategy = createStrategy(DEFAULT_PARAMS);

await runBot({
  onBatch: (state, batch) => strategy.onBatch(state, batch),
});
