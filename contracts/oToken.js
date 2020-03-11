"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.oToken = void 0;

var _SmartContract = _interopRequireDefault(require("./SmartContract"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import abi from './abis/oToken.json'
class oToken extends _SmartContract.default {
  static async build(web3, address) {
    const networkId = await web3.eth.net.getId();
    const networks = {
      [networkId]: {
        address,
        transactionHash: ''
      }
    };
    const builder = oToken.configure({
      contractName: 'oToken',
      abi,
      networks
    });
    const options = await builder(web3);
    return new oToken(options);
  }

  async getBalance(account) {
    const balance = await this.contract.methods.balanceOf(account).call();
    return balance;
  }

  async isUnsafe(vaultOwner) {
    const unsafe = await this.contract.methods.isUnsafe(vaultOwner).call();
    return unsafe;
  }

  async maxOTokensLiquidatable(vaultOwner) {
    const max = await this.contract.methods.maxOTokensLiquidatable(vaultOwner).call();
    return max;
  }

}

exports.oToken = oToken;
var _default = oToken;
exports.default = _default;
const abi = [{
  "constant": false,
  "inputs": [{
    "name": "vaultOwner",
    "type": "address"
  }, {
    "name": "amt",
    "type": "uint256"
  }],
  "name": "addERC20Collateral",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "getVaultOwners",
  "outputs": [{
    "name": "",
    "type": "address[]"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "name",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "name": "approve",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "owner",
    "type": "address"
  }],
  "name": "hasVault",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isExerciseWindow",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "getVault",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "uint256"
  }, {
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "totalSupply",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "oTokensToIssue",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "issueOTokens",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "sender",
    "type": "address"
  }, {
    "name": "recipient",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "name": "transferFrom",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "decimals",
  "outputs": [{
    "name": "",
    "type": "uint8"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToRemove",
    "type": "uint256"
  }],
  "name": "removeCollateral",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "liquidationFactor",
  "outputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "exponent",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "addedValue",
    "type": "uint256"
  }],
  "name": "increaseAllowance",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "optionsExchange",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "oTokensToExercise",
    "type": "uint256"
  }, {
    "name": "vaultsToExerciseFrom",
    "type": "address[]"
  }],
  "name": "exercise",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "collateralAmt",
    "type": "uint256"
  }],
  "name": "maxOTokensIssuable",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "underlying",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "oTokensToExercise",
    "type": "uint256"
  }],
  "name": "underlyingRequiredToExercise",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "account",
    "type": "address"
  }],
  "name": "balanceOf",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "openVault",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "COMPOUND_ORACLE",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "liquidationIncentive",
  "outputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "exponent",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "owner",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isOwner",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "hasExpired",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "symbol",
  "outputs": [{
    "name": "",
    "type": "string"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "addETHCollateral",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "transactionFee",
  "outputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "exponent",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "spender",
    "type": "address"
  }, {
    "name": "subtractedValue",
    "type": "uint256"
  }],
  "name": "decreaseAllowance",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "recipient",
    "type": "address"
  }, {
    "name": "amount",
    "type": "uint256"
  }],
  "name": "transfer",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "strike",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "underlyingExp",
  "outputs": [{
    "name": "",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "collateralExp",
  "outputs": [{
    "name": "",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "oTokenExchangeRate",
  "outputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "exponent",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "redeemVaultBalance",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_name",
    "type": "string"
  }, {
    "name": "_symbol",
    "type": "string"
  }],
  "name": "setDetails",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "minCollateralizationRatio",
  "outputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "exponent",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "vaultOwner",
    "type": "address"
  }, {
    "name": "oTokensToLiquidate",
    "type": "uint256"
  }],
  "name": "liquidate",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "strikePrice",
  "outputs": [{
    "name": "value",
    "type": "uint256"
  }, {
    "name": "exponent",
    "type": "int32"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "isUnsafe",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "collateral",
  "outputs": [{
    "name": "",
    "type": "address"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "owner",
    "type": "address"
  }, {
    "name": "spender",
    "type": "address"
  }],
  "name": "allowance",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "maxOTokensLiquidatable",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "expiry",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_address",
    "type": "address"
  }],
  "name": "transferFee",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToBurn",
    "type": "uint256"
  }],
  "name": "burnOTokens",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_liquidationIncentive",
    "type": "uint256"
  }, {
    "name": "_liquidationFactor",
    "type": "uint256"
  }, {
    "name": "_transactionFee",
    "type": "uint256"
  }, {
    "name": "_minCollateralizationRatio",
    "type": "uint256"
  }],
  "name": "updateParameters",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "newOwner",
    "type": "address"
  }],
  "name": "transferOwnership",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "_ierc20",
    "type": "address"
  }],
  "name": "isETH",
  "outputs": [{
    "name": "",
    "type": "bool"
  }],
  "payable": false,
  "stateMutability": "pure",
  "type": "function"
}, {
  "constant": false,
  "inputs": [],
  "name": "removeUnderlying",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{
    "name": "_collateral",
    "type": "address"
  }, {
    "name": "_collExp",
    "type": "int32"
  }, {
    "name": "_underlying",
    "type": "address"
  }, {
    "name": "_underlyingExp",
    "type": "int32"
  }, {
    "name": "_oTokenExchangeExp",
    "type": "int32"
  }, {
    "name": "_strikePrice",
    "type": "uint256"
  }, {
    "name": "_strikeExp",
    "type": "int32"
  }, {
    "name": "_strike",
    "type": "address"
  }, {
    "name": "_expiry",
    "type": "uint256"
  }, {
    "name": "_optionsExchange",
    "type": "address"
  }, {
    "name": "_oracleAddress",
    "type": "address"
  }, {
    "name": "_windowSize",
    "type": "uint256"
  }],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "VaultOpened",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }, {
    "indexed": false,
    "name": "amount",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "payer",
    "type": "address"
  }],
  "name": "ETHCollateralAdded",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }, {
    "indexed": false,
    "name": "amount",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "payer",
    "type": "address"
  }],
  "name": "ERC20CollateralAdded",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "issuedTo",
    "type": "address"
  }, {
    "indexed": false,
    "name": "oTokensIssued",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "IssuedOTokens",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "amtCollateralToPay",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }, {
    "indexed": false,
    "name": "liquidator",
    "type": "address"
  }],
  "name": "Liquidate",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "amtUnderlyingToPay",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "amtCollateralToPay",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "exerciser",
    "type": "address"
  }, {
    "indexed": false,
    "name": "vaultExercisedFrom",
    "type": "address"
  }],
  "name": "Exercise",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "amtCollateralRedeemed",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "amtUnderlyingRedeemed",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "RedeemVaultBalance",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }, {
    "indexed": false,
    "name": "oTokensBurned",
    "type": "uint256"
  }],
  "name": "BurnOTokens",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "amtRemoved",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "RemoveCollateral",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "liquidationIncentive",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "liquidationFactor",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "transactionFee",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "minCollateralizationRatio",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "owner",
    "type": "address"
  }],
  "name": "UpdateParameters",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "fees",
    "type": "uint256"
  }],
  "name": "TransferFee",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": false,
    "name": "amountUnderlying",
    "type": "uint256"
  }, {
    "indexed": false,
    "name": "vaultOwner",
    "type": "address"
  }],
  "name": "RemoveUnderlying",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "from",
    "type": "address"
  }, {
    "indexed": true,
    "name": "to",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Transfer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "owner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "spender",
    "type": "address"
  }, {
    "indexed": false,
    "name": "value",
    "type": "uint256"
  }],
  "name": "Approval",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{
    "indexed": true,
    "name": "previousOwner",
    "type": "address"
  }, {
    "indexed": true,
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "createETHCollateralOption",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "addETHCollateralOption",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "createAndSellETHCollateralOption",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "addAndSellETHCollateralOption",
  "outputs": [],
  "payable": true,
  "stateMutability": "payable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "amtCollateral",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "createERC20CollateralOption",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "amtCollateral",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "addERC20CollateralOption",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "amtCollateral",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "createAndSellERC20CollateralOption",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "amtToCreate",
    "type": "uint256"
  }, {
    "name": "amtCollateral",
    "type": "uint256"
  }, {
    "name": "receiver",
    "type": "address"
  }],
  "name": "addAndSellERC20CollateralOption",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
}];
//# sourceMappingURL=oToken.js.map