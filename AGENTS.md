# AGENTS.md

EFS production web client. Vite + Lit. This is the public-facing client (cf. `packages/nextjs/` in `efs-project/contracts`, which is a Scaffold-ETH-based debug UI — not this).

> **Outdated.** This repo lags `efs-project/contracts` and the planning vault. Don't assume documentation here reflects current EFS state until you've verified against `contracts/specs/` and the planning vault's `Designs/`. A modernization pass is on the cross-repo Backlog.

## Read on init

- [`CLAUDE.md`](./CLAUDE.md) — repo-local architecture and command guide (Claude Code auto-loads this; other agents should read it).
- [`README.md`](./README.md)
- [`design.md`](./design.md) — historical, may be stale; cross-check before relying on it.

## Cross-repo coordination — the planning vault

EFS uses a separate **planning vault** as the cross-repo coordination point across this repo, the contracts repo, and the future SDK. Repo: [efs-project/planning](https://github.com/efs-project/planning); target layout `/efs/{contracts,client,sdk,planning}/`.

The vault holds:

- Cross-repo designs with a name-first → numbered-at-promotion lifecycle.
- Cross-repo Kanban board, milestones (notably **OnionDAO hackathon 2026-06-01**), and decisions log.
- Glossary of cross-cutting EFS terms.
- Onboarding for AI agents (start-here, conventions, escalation).

Read the vault's [`AGENTS.md`](https://github.com/efs-project/planning/blob/main/AGENTS.md) for cross-repo tasks. Client-only tasks: this repo's docs are sufficient.

## Sibling repos

- [`efs-project/contracts`](https://github.com/efs-project/contracts) — Solidity contracts, ADRs, system specs. Authoritative for on-chain behavior.
- [`efs-project/planning`](https://github.com/efs-project/planning) — cross-repo coordination vault.
- `efs-project/sdk` (future) — on-chain + off-chain SDK packages, will replace ad-hoc EAS interactions in this client when it lands.
