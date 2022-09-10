import React from 'react'
import { useState } from 'react'
import { ethers, BigNumber } from 'ethers'
import kryptoCampNFTAbi from './KryptoCampNft.json'

const KryptoCampNFTAddress = "0x5A5E65f915b8bCC6d856FEF6ed81f895062882d1";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1)
  const isConnected = Boolean(accounts[0])

  // TODO: 呼叫 Contract mint fn
  const handleMint = async () => {
    if (window.ethereum) {
      // TODO: 設定 Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(
        KryptoCampNFTAddress,
        kryptoCampNFTAbi,
        signer
      )

      try {
        const response = await contract.mint(mintAmount)
        console.log(response, 'response')
      } catch (error) {
        console.error('[Error]', error)
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return

    setMintAmount(mintAmount - 1)
  }

  const handleIncrement = () => {
    if (mintAmount >= 3) return
    setMintAmount(mintAmount + 1)
  }

  return (
    <div>
      <h1>KryptoCamp</h1>
      <p>It's 2043.
        Can the KryptoCamp save humans from destructive rampant NFT speculation? Mint KryptoCamp to find out!
      </p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mint Now</button>
        </div>
      ) : (
        <p>
          You must be connected to Mint
        </p>
      )}
    </div>
  )
}

export default MainMint