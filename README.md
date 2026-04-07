# Ethereum File System Client

This project is in early development and takes some technical skill to set up and use.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup External Contracts
This client relies on the separated `contracts` repository for ABIs and testnet logic.
1. Clone the external EFS Contracts repository.
2. In the contracts repo, run `yarn fork` and then in a new terminal `yarn deploy`.
3. Back in this client repo, sync the freshly-deployed local contract ABIs:
```bash
npm run sync-abis
```
*(By default, this looks for an adjacent `../contracts/` folder. If your contracts are elsewhere, use `EFS_CONTRACTS_PATH=/path npm run sync-abis`).*

### 3. Run Development Server
```bash
npm run dev
```

This project uses an alpha version of [Web Awesome](https://backers.webawesome.com/docs/) (formerly Shoelace) and can break easily.
