#!/usr/bin/env node

import 'dotenv/config'

import program from 'commander'

const { bin, description, version } = require('../package.json')
const name = Object.keys(bin)[0]

program
  .name(name)
  .version(version)
  .option(
    '-i --check-interval <checkInterval>',
    'set interval at which worker will check for new protections to liquidate',
    '1 minute'
  )
  .option(
    '-k --private-key <privateKey>',
    'set account private key used to sign liquidation transactions'
  )
  .option(
    '-p --web3-provider-url <web3ProviderUrl>',
    'set Web3 provider URL',
    ' https://kovan.infura.io/v3/<INFURA_PROJECT_ID>'
  )
  .option(
    '-t --collateralization-ratio-threshold <collateralizationRatioThreshold>',
    'set minimum collateralization ratio to liquidate a particular protection'
  )
  .parse(process.argv)

start()

function start() {
  try {
    checkParameters()
  } catch (err) {
    console.log(`Parameter error: ${err.message}\n`)
    program.outputHelp()
    process.exit(1)
  }

  try {
    const { LiquidationKeeper } = require('../lib')

    const bot = new LiquidationKeeper({
      name: description,
      version,
      interval: process.env.CHECK_INTERVAL
    })

    bot.run()
  } catch (err) {
    console.error(`Worker failed: ${err.message}`)
    process.exit(1)
  }
}

function checkParameters() {
  // Check Web3 provider
  const web3ProviderUrl = process.env.WEB3_PROVIDER_URL || program.web3ProviderUrl

  if (!web3ProviderUrl) {
    throw new Error('Web3 provider URL not defined')
  } else {
    process.env.WEB3_PROVIDER_URL = web3ProviderUrl
  }

  // Check private key
  const privateKey = program.privateKey || process.env.PRIVATE_KEY

  if (!privateKey) {
    throw new Error('Private key not provided')
  } else {
    process.env.PRIVATE_KEY = privateKey
  }

  // Check interval
  const checkInterval = process.env.CHECK_INTERVAL || program.checkInterval

  if (!checkInterval) {
    throw new Error('Check interval not provided')
  } else {
    process.env.CHECK_INTERVAL = checkInterval
  }

  // Check minimum collateralization ratio
  const collateralizationRatioThreshold =
    program.collateralizationRatioThreshold || process.env.COLLATERALIZATION_RATIO_THRESHOLD

  if (!collateralizationRatioThreshold) {
    throw new Error('Collateralization ratio threshold not defined')
  } else {
    process.env.COLLATERALIZATION_RATIO_THRESHOLD = collateralizationRatioThreshold
  }
}
