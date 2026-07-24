# AGENTS.md

EFS legacy v1 web client. Vite + Lit.

> **Repository status (2026-07-23): reference implementation, not the Client v2
> target.** This code predates the from-scratch EFS v2 redesign and lags the
> deployed v1 contracts. Do not start new product architecture or assume this
> repository will be evolved in place until the Client v2 design chooses an
> implementation target.

The active Client v2 design set is:
https://github.com/efs-project/planning/tree/main/Designs/clientv2

The active protocol redesign is:
https://github.com/efs-project/planning/tree/main/Designs/efsv2

## Read on init

- [`CLAUDE.md`](./CLAUDE.md) — how the legacy v1 client is structured and run.
- [`README.md`](./README.md) — legacy setup.
- [`design.md`](./design.md) — historical architecture sketch.

Read those files to understand this code, not to infer the v2 product model.

## Repository boundaries

- `client/` is the old Vite/Lit browser client.
- `contracts/packages/nextjs/` is the newer v1 explorer and debug UI.
- `planning/Designs/clientv2/` is the current product and OS architecture work.
- `sdk/` contains an unmerged pre-v2 SDK implementation. It is legacy input,
  not the API contract for Client v2.

For deployed v1 on-chain behavior, `contracts/specs/` and
`contracts/docs/adr/` are authoritative. For v2 architecture and prioritization,
the planning vault is authoritative.

## Working here

- Preserve IPFS-compatible relative assets.
- Treat hardcoded Sepolia addresses, EAS assumptions, topic-tree semantics, and
  direct SDK usage as v1-specific.
- Do not retrofit v2 decisions into this repository piecemeal. Wait for an
  explicit implementation plan or a narrowly scoped maintenance request.
- If a task spans repos, read the planning vault's `AGENTS.md` first.
