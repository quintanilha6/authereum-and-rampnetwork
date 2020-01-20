
# React app to test Authereum and RampNetwork

React app for testing front end libs and tools
- Authereum
- Fiat on ramp

```sh
$ npm install
$ npm start
```

Open http://localhost:3000/ - There are 7 buttons:
All tests are performed over Kovan testnet using some Testnet Contracts to represent DAI and other ERC20. At this stage, some addresses are hard coded for test porposes. DAI contract addres may vary depending on both services usage (Authereum and Onramp). Functionality results are reflected on the browsers console.
Kovan DAI Address used: `0x7d669A64deb8a4A51eEa755bb0E19FD39CE25Ae9`

| Button | Funcionality |
| ------ | ------ |
| Enable account | Pops up Authereum authentication plugin and requires Autherum credentials |
| Disable account | Logs out the Authereum service |
| Display account | Returns account[0] from the Authereum credentials used after login |
| Signed message | Uses Authereum.signer to sign a message. For this case, the message is hardcoded as "hello world" |
| SendTX | Send 0.01 Eth to 0x357573E1b99293Bc09b7392B560b3C336c22690C from Authereum account p+previously logged in |
| SendDAI | Send 1 DAI to 0x357573E1b99293Bc09b7392B560b3C336c22690C from Authereum address (may not work if addresses of DAI do not match)  |
| Test | Uses Ramp Network to simulate a wire transfer to buy 1 DAI. After requesting a wire transfer, an object is returned with a key named payload (On browser console). To release funds: `curl -X POST "https://api-instant-staging-kovan.supozu.com/api/widget/testing/purchase<PAYLOAD.PURCHASE.ID>/release?secret=<PAYLOAD.PURCHASEVIEWTOKEN>"` |
