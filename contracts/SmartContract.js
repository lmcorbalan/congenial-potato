"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SmartContract = void 0;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SmartContract {
  static configure({
    contractName,
    abi,
    networks: artifacts
  }) {
    return async web3 => {
      // Obtain current network ID
      const [networkId, networkType] = await Promise.all([web3.eth.net.getId(), web3.eth.net.getNetworkType()]);

      if (!artifacts || !artifacts[`${networkId}`]) {
        throw Error(`${contractName} contract not available in ${networkType} (id:=${networkId})`);
      }

      const {
        address,
        transactionHash
      } = artifacts[`${networkId}`]; // Obtain block in which the contract was deployed

      let initialBlock = 0;

      if (transactionHash) {
        const tx = await web3.eth.getTransaction(transactionHash);
        initialBlock = tx.blockNumber;
      }

      return {
        address,
        initialBlock,
        jsonInterface: abi,
        networkType,
        web3
      };
    };
  } // Contract address


  constructor(_ref) {
    let {
      web3,
      jsonInterface
    } = _ref,
        options = _objectWithoutProperties(_ref, ["web3", "jsonInterface"]);

    _defineProperty(this, "address", void 0);

    _defineProperty(this, "networkType", void 0);

    _defineProperty(this, "initialBlock", 0);

    _defineProperty(this, "contract", void 0);

    _defineProperty(this, "web3", void 0);

    Object.assign(this, options);
    this.contract = new web3.eth.Contract(jsonInterface, options.address);
    this.web3 = web3;
  }

}

exports.SmartContract = SmartContract;
var _default = SmartContract;
exports.default = _default;
//# sourceMappingURL=SmartContract.js.map