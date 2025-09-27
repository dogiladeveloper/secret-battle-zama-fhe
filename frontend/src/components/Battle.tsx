import React, { useState } from 'react';
import { ethers } from 'ethers';
// Placeholder import - ensure @zama-ai/relayer-sdk is installed and follow docs for exact API
// import { RelayerClient, encrypt, decrypt } from '@zama-ai/relayer-sdk';

async function encryptMove(move: number) : Promise<Uint8Array> {
  // Replace this with the SDK's encrypt method.
  return new Uint8Array([move]);
}

async function submitMove(contractAddr: string, matchId: number, encrypted: Uint8Array) {
  const abi = ["function submitMove(uint256,bytes)" , "function createMatch(address) payable"];
  if (!(window as any).ethereum) throw new Error('No wallet');
  await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider((window as any).ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddr, abi, signer as any);
  const tx = await contract.submitMove(matchId, encrypted);
  return tx.wait();
}

export default function Battle({ contractAddr }: { contractAddr: string }) {
  const [move, setMove] = useState(0);
  const [status, setStatus] = useState('idle');

  async function onSubmit() {
    try {
      setStatus('encrypting...');
      const encrypted = await encryptMove(move);
      setStatus('submitting...');
      await submitMove(contractAddr, 0, encrypted);
      setStatus('submitted');
    } catch (e) {
      setStatus('error: ' + (e as any).message);
    }
  }

  return (
    <div>
      <h2>Battle</h2>
      <div>
        <label>Move (0=Rock,1=Paper,2=Scissors): </label>
        <input type="number" value={move} onChange={(e) => setMove(parseInt(e.target.value||'0'))} min={0} max={2} />
      </div>
      <button onClick={onSubmit}>Encrypt & Submit Move</button>
      <div>Status: {status}</div>
      <p><i>Note: This demo uses a placeholder encrypt. Replace encryptMove with Zama Relayer SDK encryption before competition.</i></p>
    </div>
  );
}
