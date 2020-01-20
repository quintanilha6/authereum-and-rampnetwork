import Web3 from 'web3'
import Torus from '@toruslabs/torus-embed'

const web3Obj = {
  web3: new Web3(),
  torus: {},
  setweb3: function (provider) {
    const web3Inst = new Web3(provider)
    web3Obj.web3 = web3Inst
    sessionStorage.setItem('pageUsingTorus', true)
  },
  initialize: async function () {
    const torus = new Torus()
    await torus.init({
      buildEnv: "production", // default: production
      enableLogging: true, // default: false
      network: {
        host: "kovan", // default: mainnet
        chainId: 42, // default: 1
        networkName: "Kovan Test Network" // default: Main Ethereum Network
      },
      showTorusButton: false // default: true
    });

    await torus.login()
    web3Obj.setweb3(torus.provider)
    web3Obj.torus = torus
  }
}
export default web3Obj
