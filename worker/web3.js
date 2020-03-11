"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.account = exports.web3 = exports.providerUrl = void 0;

var _assert = require("assert");

var _web = _interopRequireDefault(require("web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  PRIVATE_KEY,
  WEB3_PROVIDER_URL
} = process.env;
(0, _assert.strict)(PRIVATE_KEY != null, 'Private key should be provided');
(0, _assert.strict)(WEB3_PROVIDER_URL != null, 'WEb3 Provider URL should be provided');
const providerUrl = WEB3_PROVIDER_URL;
exports.providerUrl = providerUrl;
const web3 = new _web.default(providerUrl);
exports.web3 = web3;
const privateKey = PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : '0x' + process.env.PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey); // Unlock account with private key

exports.account = account;
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
var _default = web3;
exports.default = _default;
//# sourceMappingURL=web3.js.map