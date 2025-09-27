import React from 'react';

export default function Lobby({ contractAddr }: { contractAddr: string }) {
  return (
    <div>
      <h2>Lobby (demo)</h2>
      <p>Create a match by calling the contract. This demo uses on-chain match management but encrypted moves are handled client-side via Zama Relayer SDK.</p>
      <p>Enter contract address above and use the Battle panel to submit moves.</p>
    </div>
  );
}
