# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # tsc + vite build (output to dist/)
npm run preview   # Serve the production build locally
```

No test suite or lint script is configured. TypeScript strict mode acts as the linter.

## Architecture

EFS (Ethereum File System) is a decentralized app that uses EAS (Ethereum Attestation Service) to build a hierarchical topic tree on-chain. It runs on Sepolia testnet. The UI is entirely Lit web components — no React.

**Three-layer load order** (kernel → libefs → shell):

### kernel/
Wallet/provider abstraction. `kernel.ts` initializes the app, creates the `EFS` instance, and handles routing. `wallet.ts` manages MetaMask connection and exposes `account` and `signer` as Lit signals. The `Kernel` singleton is the entry point for all blockchain access from the UI.

### libefs/
Core business logic and data layer.
- `efs.ts` — Main facade; owns the `EASx` instance, Registry contract reference, and `TopicStore`.
- `eas.ts` — `EASx` extends the EAS SDK to add Indexer contract integration for efficient lookup of attestation relationships.
- `topic.ts` — `TopicStore` manages the topic hierarchy with an in-memory `Map` cache. Topics have `{ uid, name, parent }`.
- `contractConstants.ts` — All hardcoded contract addresses, ABIs, and schema UIDs for Sepolia.

### shell/ and apps/
Shell (`shell.ts`) is the top-level UI component (sidebar + main content). It holds the `currentTopic` signal, which drives the whole UI reactively. `topic-tree.ts` and `topic-breadcrumb.ts` are navigation components. Apps (`apps/browser/`) are self-contained Lit components that consume `currentTopic` to display attestations for the selected topic.

**Data flow:** User navigates → `currentTopic` signal updates → components re-render → call `Kernel.EFS` (TopicStore/EASx) → viem reads from chain → cache in TopicStore → return to component.

## Key Technologies

- **Lit 3** + **@lit-labs/signals** — Web components + fine-grained reactivity (no React/Vue)
- **viem** — Ethereum reads; **ethers.js v6** — signing and schema encoding; **EAS SDK** — attestation creation/fetching
- **@awesome.me/webawesome** — UI component library (formerly Shoelace); use `<wa-*>` elements
- **Vite** — build tool; `vite.config.ts` sets `base: "./"` for IPFS compatibility

## Important Notes

- All blockchain addresses and ABIs live in `src/libefs/contractConstants.ts` — edit here when deploying new contracts.
- The app targets Sepolia testnet only; there is no mainnet configuration.
- `src/router.ts` and `src/my-element.ts` are stubs/placeholders not yet wired into the app.
- The build must remain IPFS-compatible (relative asset paths), so do not change `base` in `vite.config.ts` without understanding the deployment implications.
- **Ecosystem Context**: Smart contracts, EIP specifications, and the internal Next.js Schema Debug UI live in the completely separate external EFS Contracts repository.
- **Contract Synchronization**: If you deploy updated testnet or local fork contracts, you must sync the ABIs down to this client. Run `npm run sync-abis` (which resolves `../contracts` by default, or you can provide `EFS_CONTRACTS_PATH=...`). This creates a gitignored `generated` folder. Local environments (e.g. `VITE_CHAIN_ID=31337`) will automatically route to these synced addresses, whilst production will fall back to Sepolia `contractConstants.ts` values.
