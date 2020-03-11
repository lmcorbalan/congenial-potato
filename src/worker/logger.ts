import pino from 'pino'

const logger = pino({
  prettyPrint: {
    ignore: 'accountAddress,networkId,networkType',
    translateTime: true
  }
})

process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'Uncaught exception')
    process.exit(1)
  })
)

process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'Unhandled rejection')
    process.exit(1)
  })
)

export default logger
