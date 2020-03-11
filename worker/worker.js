"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Worker = void 0;

var _ms = _interopRequireDefault(require("ms"));

var _etherscan = require("./etherscan");

var _logger = _interopRequireDefault(require("./logger"));

var _web = require("./web3");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Worker {
  get initialized() {
    return this.networkId && this.logger;
  }

  constructor(options) {
    this.options = options;

    _defineProperty(this, "networkId", void 0);

    _defineProperty(this, "logger", void 0);
  }

  async run() {
    await this.initialize(); // Show worker interval

    _logger.default.info(`Worker will be executed every ${this.options.interval}`);

    return checkUpdates(this.doWork.bind(this), this.options.interval);
  }

  async initialize() {
    if (!this.initialized) {
      const {
        name,
        version
      } = this.options;

      _logger.default.info(`${name} - Version ${version}`); // Show Web3 provider info


      _logger.default.info(`Web3 provider URL: ${_web.providerUrl}`); // Show current network info


      const [networkId, networkType] = await Promise.all([_web.web3.eth.net.getId(), _web.web3.eth.net.getNetworkType()]);

      _logger.default.info(`Current network: ${networkType} (id=${networkId})`);

      this.networkId = networkId; // Show account info

      _logger.default.info(`Current account: ${await (0, _etherscan.getAddressLink)(_web.account.address)}`);

      this.logger = _logger.default.child({
        networkId,
        accountAddress: _web.account.address
      });
      await this.setup();
    }
  }

  async sendTransaction(tx) {
    const signedTransaction = await _web.account.signTransaction(tx);
    return new Promise((resolve, reject) => {
      _web.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).once('confirmation', (_, receipt) => resolve(receipt)).once('error', error => reject(error));
    });
  }

}

exports.Worker = Worker;

async function checkUpdates(checker, interval, runImmediately = true) {
  const checkInterval = (0, _ms.default)(interval + '');

  if (runImmediately) {
    await checkForUpdates();
  } else {
    setTimeout(checkForUpdates, checkInterval);
  }

  async function checkForUpdates() {
    try {
      await checker();
    } catch (e) {
      _logger.default.error(e.message);
    }

    setTimeout(checkForUpdates, checkInterval);
  }
}
//# sourceMappingURL=worker.js.map