"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UniswapFactory = void 0;

var _SmartContract = _interopRequireDefault(require("./SmartContract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import abi from './abis/oToken.json'
class UniswapFactory extends _SmartContract.default {
  static async build(web3) {
    const networkId = await web3.eth.net.getId();
    const networks = {
      [networkId]: {
        address: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
        transactionHash: ''
      }
    };
    const builder = UniswapFactory.configure({
      contractName: 'UniswapFactory',
      abi,
      networks
    });
    const options = await builder(web3);
    return new UniswapFactory(options);
  }

  async getExchange(address) {
    const exchange = await this.contract.methods.getExchange(address).call();
    return exchange;
  }

}

exports.UniswapFactory = UniswapFactory;
var _default = UniswapFactory;
exports.default = _default;
const abi = [{
  "name": "NewExchange",
  "inputs": [{
    "type": "address",
    "name": "token",
    "indexed": true
  }, {
    "type": "address",
    "name": "exchange",
    "indexed": true
  }],
  "anonymous": false,
  "type": "event"
}, {
  "name": "initializeFactory",
  "outputs": [],
  "inputs": [{
    "type": "address",
    "name": "template"
  }],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 35725
}, {
  "name": "createExchange",
  "outputs": [{
    "type": "address",
    "name": "out"
  }],
  "inputs": [{
    "type": "address",
    "name": "token"
  }],
  "constant": false,
  "payable": false,
  "type": "function",
  "gas": 187911
}, {
  "name": "getExchange",
  "outputs": [{
    "type": "address",
    "name": "out"
  }],
  "inputs": [{
    "type": "address",
    "name": "token"
  }],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 715
}, {
  "name": "getToken",
  "outputs": [{
    "type": "address",
    "name": "out"
  }],
  "inputs": [{
    "type": "address",
    "name": "exchange"
  }],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 745
}, {
  "name": "getTokenWithId",
  "outputs": [{
    "type": "address",
    "name": "out"
  }],
  "inputs": [{
    "type": "uint256",
    "name": "token_id"
  }],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 736
}, {
  "name": "exchangeTemplate",
  "outputs": [{
    "type": "address",
    "name": "out"
  }],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 633
}, {
  "name": "tokenCount",
  "outputs": [{
    "type": "uint256",
    "name": "out"
  }],
  "inputs": [],
  "constant": true,
  "payable": false,
  "type": "function",
  "gas": 663
}];
//# sourceMappingURL=UniswapFactory.js.map