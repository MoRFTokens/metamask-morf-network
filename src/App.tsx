import React, { useState } from 'react'
import './App.scss'

declare const window: any

function App () {
  const [chainId, setChainId] = useState<number | null>(null)
  const [log, setLog] = useState<string[]>([])

  const networkName = chainId === 30 ? 'Binance Smart Chain Network' : 'Matic Network'

  const addNetwork = (params: any) =>
    window.ethereum.request({ method: 'wallet_addEthereumChain', params })
      .then(() => {
        setLog([...log, `Switched to ${params[0].chainName} (${parseInt(params[0].chainId)})`])
        setChainId(parseInt(params[0].chainId))
      })
      .catch((error: Error) => setLog([...log, `Error: ${error.message}`]))

  const addMATIC = () =>
    addNetwork([
      {
        chainId: '0x89',
        chainName: 'Matic Network',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        },
        rpcUrls: ['https://rpc-mainnet.maticvigil.com'],
        blockExplorerUrls: ['https://polygonscan.com/']
      }
    ])

  const addBSC = () =>
    addNetwork([
      {
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed1.ninicoin.io'],
        blockExplorerUrls: ['https://bscscan.com/']
      }
    ])

  const addToken = (params: any) =>
    window.ethereum.request({ method: 'wallet_watchAsset', params })
      .then(() => setLog([...log, 'Success, Token added!']))
      .catch((error: Error) => setLog([...log, `Error: ${error.message}`]))

  const addMoRFBSC = () =>
    addToken({
      type: 'ERC20',
      options: {
        address: '0x1571c2AB125318B966FbF829159cD239da9f9042',
        symbol: 'MoRF',
        decimals: 9,
        image: 'https://morphine.finance/morf.png'
      }
    })
  const addMoRFMatic = () =>
    addToken({
      type: 'ERC20',
      options: {
        address: '0x33082eafF5d66bcB023C80d9E8037C44d5b5c9A0',
        symbol: 'MoRF',
        decimals: 9,
        image: 'https://morphine.finance/morf.png'
      }
    })

  return (
    <div className="App">

      <section>
        <h2>step 1</h2>
        Download Metamask.
      </section>

      {chainId && (
        <section>
          <h2>Current Network</h2>
          <p><strong>ChainId</strong> {chainId}</p>
          <p><strong>Name</strong> {networkName}</p>
        </section>
      )}

      <section>
        <h2>Step 2:</h2>
        <p>Click the buttons here to add the BSC or MATIC, or change to that network if you already have them configured!</p>

        <button onClick={addBSC}>Add BSC Mainnet</button><br></br>
        <button onClick={addMATIC}>Add Matic Mainnet</button>
      </section>

      {chainId && (
        <section>
          <h2>Step 3:</h2>
          <p>Add the MoRF token!</p>
          <p>Click below to add the <strong>{networkName}</strong> MoRF token.</p>
          <button onClick={chainId === 30 ? addMoRFBSC : addMoRFMatic}>Add MoRF Token</button>
        </section>
      )}

      <section>
        <h2>log</h2>
        <ul>
          {log.map((item: string, i: number) => <li key={i}>{item}</li>)}
        </ul>
      </section>

      <hr />
    </div>
  )
}

export default App
