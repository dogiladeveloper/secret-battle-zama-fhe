import { ethers } from "hardhat";

async function main() {
  const Factory = await ethers.getContractFactory("SecretBattle");
  const inst = await Factory.deploy();
  await inst.deployed();
  console.log("SecretBattle deployed to:", inst.address);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
