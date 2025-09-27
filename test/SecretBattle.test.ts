import { expect } from "chai";
import { ethers } from "hardhat";

describe("SecretBattle", function() {
  it("creates match and accepts moves", async function() {
    const [a,b] = await ethers.getSigners();
    const Factory = await ethers.getContractFactory("SecretBattle");
    const inst = await Factory.deploy();
    await inst.deployed();

    const tx = await inst.connect(a).createMatch(b.address, { value: ethers.parseEther("0.01") });
    await tx.wait();

    const m = await inst.matches(0);
    expect(m.playerA).to.equal(a.address);
    expect(m.playerB).to.equal(b.address);
  });
});
