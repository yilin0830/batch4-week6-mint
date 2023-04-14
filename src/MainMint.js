import React from 'react'
import { Flex, Box, Text, Button, Input, useToast, Spacer } from '@chakra-ui/react'
import { useState } from 'react'
import { ethers } from 'ethers'
import kryptoCampNFTAbi from './KryptoCampNft.json'
import { useEffect } from 'react'

const KryptoCampNFTAddress = "0x5A5E65f915b8bCC6d856FEF6ed81f895062882d1";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1)
  const [totalSupply, setTotalSupply] = useState(0)
  const [currentChainId, setCurrentChainID] = useState(0)
  const isConnected = Boolean(accounts[0])
  const toast = useToast()

  // TODO: 呼叫合約 totalSupply 方法，並寫入到變數 totalSupply
  const getNFTTotalSupply = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const KryptoCampContract = new ethers.Contract(
      KryptoCampNFTAddress,
      kryptoCampNFTAbi,
      provider
    );
    const currentSupply = await KryptoCampContract.totalSupply();
    const amount = ethers.utils.formatUnits(currentSupply, 0);
    setTotalSupply(amount);
  }

  // TODO: 呼叫 Contract mint fn
  const handleMint = async () => {
    if (window.ethereum) {
      // TODO: 1) 設定 Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // TODO: 2) 設定 signer
      const signer = provider.getSigner();
      // TODO: 3) new Contract 實體
      const KryptoCampContract = new ethers.Contract(
        KryptoCampNFTAddress,
        kryptoCampNFTAbi,
        signer
      );
      try {
        // TODO: 4) 呼叫合約 mint 方法
        console.log(mintAmount);
        const mintPrice = 0.01;
        const response = await KryptoCampContract.mint(mintAmount, {value: ethers.utils.parseEther((0.01 * mintAmount).toString(), 'ether')});
        
        console.log('response', response);
      } catch ({ error }) {
        showToast(error.message)
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

  // 顯示錯誤訊息
  const showToast = (error) => {
    toast({
      title: `發生錯誤：${error}`,
      status: 'error',
      position: 'top',
      isClosable: true,
    })
  }

  // 如果不是在 Goerli chainID 5，請使用者切換網路到對應網路
  const switchNetwork = async () => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{
        chainId: '0x5'
      }]
    })
  }
  
  // 檢查使用者的 Network 網路否在測試鏈上
  const getNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { chainID } = await provider.getNetwork();
    setCurrentChainID(chainID); //currentChainID
    console.log('chainID', chainID)

    // Goerli Testnet ChainID is 5
    if (chainID !== 5) {
      // 如果不是在 Goerli chainID 5，請使用者切換網路到對應網路
      switchNetwork()
      showToast('請切換至 Goerli Network')
    }
  }
  
  useEffect(() => {
    // 有安裝 Metamask
    if (window.ethereum) {
      getNetwork();
      getNFTTotalSupply();

      // Listening to changes
      window.ethereum.on('networkChanged', (networkId) => {
        if (networkId !== 5) { 
          window.location.reload(); 
        }
      })
    }
    else {
      showToast('Please get your Web3 wallet first')
    }
  }, [])

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div className="mint-container">
          <Text fontSize="48px" textShadow="0 5px #000">KryptoCamp</Text>
          <Text
            fontSize="30px"
            letterSpacing="0.5%"
            fontFamily="VT323"
            textShadow="0 2px 2px #000"
            lineHeight={"26px"}
          >
            It's 2043.
            Can the KryptoCamp save humans from destructive rampant NFT speculation? Mint KryptoCamp to find out!
          </Text>
          <Spacer />


        </div>

        {isConnected ? (
          <div>
            <Flex align="center" justify="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >
                -
              </Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0px 2px 2px 1px #0f0f0f"
                color="white"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}
              >
                +
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0px 2px 2px 1px #0f0f0f"
              color="white"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}
            >
              Mint Now
            </Button>

            {/* 目前已賣出 */}
            <Text
              fontSize="30px"
              letterSpacing="0.5%"
              fontFamily="VT323"
              textShadow="0 2px 2px #000"
              lineHeight={"26px"}
              marginTop="20px"
            >
              NFT TotalSupply {totalSupply}
            </Text>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000"
            color="#D6517D"
          >
            You must be connected to Mint
          </Text>
        )}
      </Box>
    </Flex>
  )
}

export default MainMint