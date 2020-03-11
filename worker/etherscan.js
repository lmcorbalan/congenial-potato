"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransactionLink = getTransactionLink;
exports.getAddressLink = getAddressLink;

var _web = _interopRequireDefault(require("./web3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getTransactionLink(transactionHash) {
  const baseUrl = await getEtherScanUrl();

  if (baseUrl && transactionHash) {
    return `${baseUrl}/tx/${transactionHash}`;
  }

  return '';
}

async function getAddressLink(address) {
  const baseUrl = await getEtherScanUrl();

  if (baseUrl && address) {
    return `${baseUrl}/address/${address}`;
  }

  return '';
}

async function getEtherScanUrl() {
  const network = await _web.default.eth.net.getNetworkType();

  if (network !== 'private') {
    const subdomain = network !== 'main' ? `${network}.` : '';
    return `http://${subdomain}etherscan.io`;
  }

  return '';
}
//# sourceMappingURL=etherscan.js.map