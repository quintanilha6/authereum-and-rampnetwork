import React from 'react';
import './App.css';
import Authereum from 'authereum'
import Web3 from 'web3'
import { AuthereumSigner } from 'authereum'
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import web3Obj from './helper'
import { logDOM } from '@testing-library/react'



let ERC20_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
]

let DAI_address = '0x7d669A64deb8a4A51eEa755bb0E19FD39CE25Ae9' //'0xc4375b7de8af5a38a93548eb8453a498222c4ff2'
let provider;
let web3;
let signer
let acc

function App() {

  const authereum = new Authereum('kovan')

  signer = new AuthereumSigner('kovan')

  provider = authereum.getProvider()

  web3 = new Web3(provider)

  console.log(web3Obj)

  displayAccount().then(result => { acc = result })

  return (
    <div className="App">
      <header className="App-header">

        <button onClick={enableAccount}>Enable account</button>

        <button onClick={desableAccount}>Disable account</button>

        <button onClick={displayAccount}>Display account</button>

        <button onClick={signMessage}>Sign message</button>

        <button onClick={sendingTx}>Send TX</button>

        <button onClick={sendDai}>Send DAI</button>

        <button onClick={test}>Test</button>
      </header>
    </div>
  );
}

function test() {
  new RampInstantSDK({
    hostAppName: 'My app name',
    hostLogoUrl: 'https://cdn-images-1.medium.com/max/2600/1*nqtMwugX7TtpcS-5c3lRjw.png',
    swapAmount: '1000000000000000000',
    swapAsset: 'TDAI',
    userAddress: acc,
    url: 'https://ri-widget-staging-kovan.firebaseapp.com/',
    // url KOVAN : https://ri-widget-staging-kovan.firebaseapp.com/
    // url RINKEBY : https://ri-widget-staging.firebaseapp.com/
    // only specify the url if you want to use testnet widget versions,
    // use variant: 'auto' for automatic mobile / desktop handling,
    // 'mobile' to force mobile version
    // 'desktop' to force desktop version (default)
    variant: 'auto',
  })
    .on('*', console.log)
    .on('*', (event) => { console.log(event) })
    .show();
}

async function enableAccount() {
  provider.enable().then(result => { acc = result; console.log(result) })
}

async function desableAccount() {
  provider.disable().then(console.log)
}

async function displayAccount() {
  let account = (await provider.getAccounts())[0]
  console.log(account)
  return account
  //web3.eth.getAccounts().then(console.log)
}

async function signMessage() {
  let account = (await provider.getAccounts())[0]
  let message = 'Hello waaaorld'

  //console.log(provider)
  //web3.eth.getBlockNumber().then(console.log)
  let hash = await web3.eth.sign(message, account)

  console.log("HEX(MESSAGE)", web3.utils.sha3(message))
  console.log("SIGNED MESSAGE: ", hash)
  console.log("SHA3(SIGNED MESSAGE): ", web3.utils.sha3(hash))
}

async function sendingTx() {
  console.log(signer)
  const tx = {
    to: '0x357573E1b99293Bc09b7392B560b3C336c22690C',
    value: web3.utils.numberToHex('10000000000000000')
  }
  const result = await signer.sendTransaction(tx)
  console.log(result.hash)
}

async function sendDai() {
  let account = (await provider.getAccounts())[0]
  console.log(provider)
  var myContract = new web3.eth.Contract(ERC20_ABI, DAI_address);
  let signedTX = await myContract.methods
    .transfer('0x357573E1b99293Bc09b7392B560b3C336c22690C', web3.utils.toWei('0.01', 'ether'))
    .encodeABI()


  const tx = {
    from: account,
    to: DAI_address,
    data: signedTX
  }

  const result = await signer.sendTransaction(tx)
  console.log(result.hash)

}

export default App;
