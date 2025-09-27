# Secret Battle FHE — Starter Repo (Zama competition)

This repository is a starter full-stack dApp demonstrating how to build a two-player secret-battle game using FHE concepts and Zama's Relayer SDK.

**Important:** This repo contains placeholder encryption logic for educational/demo purposes. To make it FHE-capable for the competition, follow the README sections below to install and integrate Zama's official SDKs and replace placeholder functions.

## What is included
- Solidity contract (`contracts/SecretBattle.sol`) showing game flow and where encrypted fields belong.
- Hardhat scripts for compiling, testing and deploying locally.
- React + Vite frontend with basic UI (Lobby + Battle components).
- Placeholder client-side encryption that must be replaced with Zama's SDK.
- Example unit test with Hardhat.

## Steps to finish integration (C: Full Zama integration)
1. Read Zama docs: https://docs.zama.ai
2. Install the Relayer SDK in `frontend`: `npm install @zama-ai/relayer-sdk` and follow docs to import the real `encrypt` and `decrypt` functions.
3. Replace `encryptMove` in `frontend/src/components/Battle.tsx` with the SDK's encryption method and ensure you provide a key handle or follow Zama key gen flow.
4. Replace `bytes` fields in `contracts/SecretBattle.sol` with the proper encrypted types (e.g. `euint8`) and import the FHE solidity library as shown in Zama docs.
5. Implement a relayer service (Node.js) that listens for matches in `Ready` status, calls Zama's FHE computation (determine winner on encrypted values), and submits `recordResult` to the contract.

## How to run locally (quick)
1. Install dependencies at repo root: `npm install`
2. Install frontend deps: `cd frontend && npm install`
3. Compile contracts: `npx hardhat compile`
4. Run tests: `npx hardhat test`
5. Run local frontend: `cd frontend && npm run dev`

## How to publish to GitHub (short)
1. Create a new GitHub repo (do not init with README) on github.com
2. Locally:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Secret Battle FHE starter"
   git branch -M main
   git remote add origin https://github.com/<your-username>/secret-battle-fhe.git
   git push -u origin main
   ```

## Notes / Security
- Do NOT commit private keys to GitHub. Use `.env` and GitHub Actions secrets for CI.
- The demo uses `onlyOwner` for relayer operations — replace with a proper access control (multisig or relayer ACL).

## Credits & Resources
- Zama docs: https://docs.zama.ai
- Zama relayer-sdk: https://github.com/zama-ai/relayer-sdk
- Zama fhEVM templates: https://github.com/zama-ai/fhevm-hardhat-template


## Using the Relayer
1. Copy `.env.example` to `.env` and fill in RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS.
2. Run relayer: `node relayer.js`
3. It polls the contract and records encrypted results for matches in Ready state.
4. Frontend shows match status; winner results are encrypted and can be decrypted by players with keys.
