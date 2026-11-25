# Strategy

Early rider with a trailing stop, plus tiny guardrail probes.

## Why this shape

On the dev window every momentum and mean-reversion variant lost money:
buying a coin after it has already risen means buying the top — coins that
2x from their first trade end at a median 0.45x the entry price. But buying
at a coin's first trades and holding is roughly breakeven on average (median
coin ends at 0.94x its first-trade price, mean 1.24x — a fat right tail: 16%
of coins reach 2x, 5% reach 5x, 3% reach 10x). So the edge is not timing
the pump, it is sampling many fresh coins cheaply, cutting the losers, and
letting the rare runner pay for the rest.

## Entry (main positions, max 4 open)

A coin becomes a buy as soon as it shows its first trades with at least
0.2 SOL of real reserves — no momentum filter, no minimum age. Stake is
0.05 SOL per position, one buy only. At most 4 main positions are open at
once so one of the 5 slots stays free for probes.

## Exits

Each held position is re-priced every batch from the curve's current
reserves. It is sold whole on the first of:

- stop-loss: close value falls below cost × 0.50,
- trailing stop: once value reaches cost × 1.30, exit if it falls 40% from its peak,
- no take-profit and effectively no age cap — a runner is left to run.

A curve that completes is closed by the replay itself. After an exit the
coin rests 150 slots before it may be bought again, at most once per run.

## Guardrail probes

If the bot's own fills or distinct coins lag a pace target (25 coins /
60 fills over 6 hours), it opens tiny 0.01 SOL probe round trips on
liquid traded coins and sells them as soon as the buy lands, so the run
stays above the 20-coin minimum even when main positions are held for a
long time. A probe costs roughly 0.0005 SOL in fees, so the insurance is
cheap.

## Costs

Each order pays protocol 95 bps + creator 30 bps on the traded value plus
5,000 + 100,000 lamports of tx fees. Small stakes and few round trips keep
the fee drag low; the trailing exit is set wide so a runner is not sold
for a 3% fee saving.

## Determinism

No clock, no randomness, no network, no environment reads. Every decision
is a pure function of the batches seen so far, so two runs on the same
replay produce byte-identical action logs.
