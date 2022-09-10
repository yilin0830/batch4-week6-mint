import { useState } from 'react'
import './App.css';
import MainMint from './MainMint';
import Navbar from './Navbar';

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="App">
      <Navbar accounts={accounts} setAccounts={setAccounts} />
      <MainMint accounts={accounts} setAccounts={setAccounts} />
    </div>
  );
}

export default App;
// 0x5A5E65f915b8bCC6d856FEF6ed81f895062882d1