import React from 'react'

const Navbar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  // TODO: 連接錢包
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      setAccounts(accounts)
    }
  }

  return (
    <div>
      {/* Left ide - Social Media Icons */}
      <div>Facebook</div>
      <div>Twitter</div>
      <div>Email</div>

      {/* Right Side - Section and Connect */}
      <div>About</div>
      <div>Mint</div>
      <div>Team</div>

      {/* Connect */}
      {isConnected ? (
        <p>Connected</p>
      ) : (
        <button onClick={connectAccount}>連接錢包</button>
      )}
    </div>
  )
}

export default Navbar