import React, { useState } from 'react';
import Lobby from './components/Lobby';
import Battle from './components/Battle';

export default function App() {
  const [contractAddr, setContractAddr] = useState('');

  return (
    <div style={{ padding: 24 }}>
      <h1>Secret Battle — FHE Demo</h1>
      <div style={{ marginBottom: 12 }}>
        <label>Contract Address: </label>
        <input value={contractAddr} onChange={(e) => setContractAddr(e.target.value)} style={{ width: 400 }} />
      </div>
      <Lobby contractAddr={contractAddr} />
      <hr />
      <Battle contractAddr={contractAddr} />
    </div>
  );
}
