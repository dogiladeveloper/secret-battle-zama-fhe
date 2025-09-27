import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";

const config: HardhatUserConfig = {
  solidity: { compilers: [{ version: "0.8.20" }] },
  networks: {
    hardhat: {}
    // add testnet configs using .env (RPC_URL, PRIVATE_KEY) when ready
  }
};

export default config;
