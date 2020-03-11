"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Oracle = void 0;

var _SmartContract = _interopRequireDefault(require("./SmartContract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import abi from './abis/Oracle.json'
class Oracle extends _SmartContract.default {
  static async build(web3) {
    const networkId = await web3.eth.net.getId();
    const networks = {
      [networkId]: {
        address: "0x7054e08461e3eCb7718B63540adDB3c3A1746415",
        transactionHash: ''
      }
    };
    const builder = Oracle.configure({
      contractName: 'Oracle',
      abi,
      networks
    });
    const options = await builder(web3);
    return new Oracle(options);
  }

  async getPrice(asset) {
    const price = await this.contract.methods.getPrice(asset).call();
    return price;
  }

}

exports.Oracle = Oracle;
var _default = Oracle;
exports.default = _default;
const abi = [{
  "constant": true,
  "inputs": [],
  "name": "PriceOracle",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{
    "name": "_oracleAddress",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "constant": true,
  "inputs": [{
    "name": "asset",
    "type": "address"
  }],
  "name": "getPrice",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}];
//# sourceMappingURL=Oracle.js.map