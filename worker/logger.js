"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pino = _interopRequireDefault(require("pino"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = (0, _pino.default)({
  prettyPrint: {
    ignore: 'accountAddress,networkId,networkType',
    translateTime: true
  }
});
process.on('uncaughtException', _pino.default.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'Uncaught exception');
  process.exit(1);
}));
process.on('unhandledRejection', _pino.default.final(logger, (err, finalLogger) => {
  finalLogger.error(err, 'Unhandled rejection');
  process.exit(1);
}));
var _default = logger;
exports.default = _default;
//# sourceMappingURL=logger.js.map